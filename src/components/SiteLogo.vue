<script setup>
defineProps({
  title: {
    type: String,
    default: 'Scrape Center',
  },
});
</script>

<template>
  <span class="brand">
    <svg
      class="brand__mark"
      viewBox="0 0 700 700"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="700" height="700" rx="90" fill="#e9415a" />
      <g fill="#fff">
        <rect x="100" y="100" width="500" height="100" />
        <rect x="100" y="100" width="100" height="500" />
        <rect x="300" y="300" width="300" height="100" />
        <rect x="500" y="300" width="100" height="300" />
        <rect x="100" y="500" width="500" height="100" />
      </g>
    </svg>
    <span class="brand__title">{{ title }}</span>
  </span>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  min-width: 250px;
}

.brand__mark {
  width: 40px;
  height: 40px;
  flex: none;
}

.brand__title {
  font-size: 23px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-title);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .brand {
    min-width: 0;
    gap: 10px;
  }

  .brand__mark {
    width: 34px;
    height: 34px;
  }

  .brand__title {
    font-size: 19px;
  }
}
</style>
