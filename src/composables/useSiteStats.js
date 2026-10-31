import { computed, onMounted, ref } from 'vue';
import { loadSiteStats } from '@/services/stats';

const integerFormatter = new Intl.NumberFormat('zh-CN');
const decimalFormatter = new Intl.NumberFormat('zh-CN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function useSiteStats() {
  const stats = ref(null);
  const loading = ref(true);
  const isDemo = ref(false);

  onMounted(async () => {
    const result = await loadSiteStats();
    stats.value = result;
    isDemo.value = result.source === 'demo';
    loading.value = false;
  });

  const display = computed(() => {
    if (!stats.value) {
      return { date: '', request: '—', bandwidth: '—', flux: '—' };
    }

    return {
      date: stats.value.date,
      request: integerFormatter.format(Math.round(stats.value.request)),
      bandwidth: decimalFormatter.format(stats.value.bandwidth / 1e6),
      flux: decimalFormatter.format(stats.value.flux / 1e6),
    };
  });

  return { stats, loading, isDemo, display };
}
