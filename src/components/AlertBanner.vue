<script setup>
import { site } from '@/data/site';
</script>

<template>
  <div class="alert-banner" role="note">
    <svg
      class="alert-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <rect x="11" y="10.5" width="2" height="7" rx="1" fill="#fff" />
      <circle cx="12" cy="7.4" r="1.3" fill="#fff" />
    </svg>

    <p class="alert-text">
      {{ site.alert.prefix }}<a
        class="alert-link"
        :href="site.bookUrl"
        target="_blank"
        rel="noopener noreferrer"
        >{{ site.alert.bookLabel }}</a
      >{{ site.alert.suffix }}
    </p>
  </div>
</template>

<style scoped>
.alert-banner {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  padding: 8px 16px;
  border-radius: 4px;
  background: var(--color-surface);
  color: var(--color-text);
}

.alert-icon {
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 2px;
  color: var(--color-text-regular);
}

.alert-text {
  margin: 0;
  font-size: 13px;
  line-height: 18px;
}

.alert-link {
  transition: color var(--transition-fast);
}

.alert-link:hover {
  color: var(--color-primary);
}

@media (max-width: 640px) {
  .alert-banner {
    padding: 10px 14px;
  }

  .alert-text {
    font-size: 12px;
    line-height: 1.6;
  }
}
</style>
