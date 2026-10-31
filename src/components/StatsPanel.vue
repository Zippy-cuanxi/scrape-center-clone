<script setup>
import { useSiteStats } from '@/composables/useSiteStats';

const { stats, loading, isDemo, display } = useSiteStats();
</script>

<template>
  <section
    class="stats-panel"
    aria-labelledby="stats-title"
    :aria-busy="loading"
    aria-live="polite"
  >
    <h2 id="stats-title" class="stats-title">
      <template v-if="loading">今日爬取实时数据</template>
      <template v-else-if="stats">
        今日爬取实时数据
        <time class="stats-date" :datetime="display.date">{{ display.date }}</time>
      </template>
      <span v-if="isDemo && !loading" class="stats-tag">演示数据</span>
    </h2>

    <div v-if="loading" class="stats-skeleton" aria-hidden="true">
      <div v-for="item in 3" :key="item" class="skeleton-item">
        <span class="skeleton-line skeleton-line--label"></span>
        <span class="skeleton-line skeleton-line--value"></span>
      </div>
    </div>

    <div v-else-if="stats" class="stats-grid">
      <div class="stat">
        <h3>总请求次数</h3>
        <p>{{ display.request }}</p>
      </div>
      <div class="stat">
        <h3>峰值带宽</h3>
        <p>{{ display.bandwidth }} Mbps</p>
      </div>
      <div class="stat">
        <h3>总流量</h3>
        <p>{{ display.flux }} MB</p>
      </div>
    </div>

    <p v-else class="stats-note">统计数据暂不可用，请稍后再试。</p>

    <p v-if="isDemo && !loading" class="stats-note">
      实时统计接口不可用，当前展示演示数据；可通过
      <code>VITE_STATS_ENDPOINT</code> 接入自有接口。
    </p>
  </section>
</template>

<style scoped>
.stats-panel {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: var(--radius-card);
  background: var(--color-surface);
  transition: box-shadow var(--transition-base);
}

.stats-panel:hover {
  box-shadow: var(--shadow-card-hover);
}

.stats-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
  text-align: center;
  color: var(--color-text);
}

.stats-date {
  font-variant-numeric: tabular-nums;
}

.stats-tag {
  display: inline-block;
  margin-left: 8px;
  padding: 0 8px;
  border: 1px solid var(--color-primary-border);
  border-radius: 10px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 400;
  line-height: 19px;
  vertical-align: 3px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 8px;
}

.stat {
  padding: 4px 8px;
  text-align: center;
}

.stat h3 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
}

.stat p {
  margin: 0;
  color: var(--color-text-regular);
  font-size: 16px;
  font-variant-numeric: tabular-nums;
}

.stats-note {
  margin-top: 10px;
  color: var(--color-text-muted);
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
}

.stats-note code {
  padding: 1px 5px;
  border-radius: 4px;
  background: #f5f7fa;
  color: var(--color-text-regular);
  font-size: 11px;
}

.stats-skeleton {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 8px;
}

.skeleton-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 8px;
}

.skeleton-line {
  display: block;
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e9e9e9 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton 1.4s ease infinite;
}

.skeleton-line--label {
  width: 90px;
}

.skeleton-line--value {
  width: 130px;
  height: 16px;
}

@keyframes skeleton {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

@media (max-width: 640px) {
  .stats-panel {
    padding: 18px 16px;
  }

  .stats-title {
    font-size: 19px;
    line-height: 1.5;
  }

  .stats-tag {
    margin-left: 6px;
    vertical-align: 1px;
  }

  .stats-grid,
  .stats-skeleton {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .stat {
    padding: 12px 0;
    border-top: 1px solid var(--color-border-soft);
  }

  .stat:first-child {
    border-top: 0;
    margin-top: 6px;
  }

  .stat h3 {
    margin-bottom: 2px;
    color: var(--color-text-muted);
    font-size: 14px;
    font-weight: 400;
  }

  .stat p {
    font-size: 18px;
  }

  .skeleton-item {
    padding: 10px 0;
  }

  .stats-note {
    text-align: left;
  }
}
</style>
