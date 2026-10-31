/**
 * Statistics data source.
 *
 * The reference portal calls `GET /api/v1/query` and reads a Tencent ECDN
 * `DescribeEcdnStatistics` payload. That endpoint is currently unavailable,
 * so this rebuild ships with a deterministic demo snapshot and an opt-in
 * real endpoint.
 *
 * Configure a real endpoint with:
 *   VITE_STATS_ENDPOINT=https://example.com/api/v1/query
 *
 * Supported payloads:
 *   1. Normalized:   { date, request, bandwidth, flux }
 *   2. Tencent ECDN: { Data: [{ EcdnData: { Metrics, DetailData: [{ Time, Value }] } }] }
 */
const ENDPOINT = (import.meta.env.VITE_STATS_ENDPOINT ?? '').trim();
const REQUEST_TIMEOUT = 4000;

const DEMO_SNAPSHOT = Object.freeze({
  flux: 4_612_000_000, // bytes
  bandwidth: 52_400_000, // bps
  request: 214_873,
});

function today() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function demoStats() {
  return { date: today(), ...DEMO_SNAPSHOT };
}

function isNumber(value) {
  return value !== null && value !== '' && Number.isFinite(Number(value));
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`统计接口返回 HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Normalizes both supported payload shapes into
 * { date, flux, bandwidth, request }.
 * Returns null when the payload cannot be understood.
 */
function normalizeStats(payload) {
  if (!payload || typeof payload !== 'object') return null;

  // Normalized payload.
  if (
    typeof payload.date === 'string' &&
    isNumber(payload.flux) &&
    isNumber(payload.bandwidth) &&
    isNumber(payload.request)
  ) {
    return {
      date: payload.date.slice(0, 10),
      flux: Number(payload.flux),
      bandwidth: Number(payload.bandwidth),
      request: Number(payload.request),
    };
  }

  // Tencent ECDN DescribeEcdnStatistics payload.
  const resource = Array.isArray(payload.Data) ? payload.Data[0] : null;
  const detail = resource?.EcdnData?.DetailData?.[0];
  if (!detail || !Array.isArray(detail.Value) || detail.Value.length < 3) {
    return null;
  }

  const metrics = resource.EcdnData.Metrics;
  const pick = (name, fallbackIndex) => {
    const index = Array.isArray(metrics)
      ? metrics.findIndex((metric) => String(metric).toLowerCase() === name)
      : -1;
    const value = detail.Value[index >= 0 ? index : fallbackIndex];
    return isNumber(value) ? Number(value) : Number.NaN;
  };

  const flux = pick('flux', 0);
  const bandwidth = pick('bandwidth', 1);
  const request = pick('request', 2);

  if (![flux, bandwidth, request].every(Number.isFinite)) {
    return null;
  }

  return {
    date: String(detail.Time ?? '').slice(0, 10) || today(),
    flux,
    bandwidth,
    request,
  };
}

export async function loadSiteStats() {
  if (!ENDPOINT) {
    return { ...demoStats(), source: 'demo' };
  }

  try {
    const payload = await fetchJson(ENDPOINT);
    const stats = normalizeStats(payload);

    if (!stats) {
      throw new Error('无法识别的统计数据格式');
    }

    return { ...stats, source: 'api' };
  } catch (error) {
    console.warn('[scrape-center] 实时统计不可用，已回退到演示数据。', error);
    return { ...demoStats(), source: 'demo', error };
  }
}
