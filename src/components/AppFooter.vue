<script setup>
import { site } from '@/data/site';

const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p>
        {{ site.name }} 复刻演示 © {{ year }} · 非官方站点，仅用于学习与界面研究 ·
        <a
          class="footer-link"
          :href="site.originalUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          访问原站
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: auto;
  background: var(--color-surface);
  padding: 16px 0;
  color: var(--color-text-regular);
  font-size: 16px;
  text-align: center;
}

.footer-inner p {
  margin: 0;
  line-height: 1.5;
}

.footer-link {
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary);
}

@media (max-width: 640px) {
  .site-footer {
    font-size: 13px;
    padding: 14px 0;
  }
}
</style>
