<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <a
    class="case-card"
    :href="item.url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`${item.name} — ${item.category}，在新窗口打开`"
  >
    <span class="case-card__ribbon" aria-hidden="true">{{ item.category }}</span>

    <div class="case-card__scroll">
      <div class="case-card__body">
        <h3 class="case-card__title">{{ item.name }}</h3>
        <p class="case-card__desc">{{ item.description }}</p>
      </div>
    </div>
  </a>
</template>

<style scoped>
.case-card {
  position: relative;
  display: block;
  height: 202px;
  overflow: hidden;
  border: 1px solid #ebeef5;
  border-radius: var(--radius-card);
  background: var(--color-surface);
  cursor: pointer;
  transition: box-shadow var(--transition-base);
}

.case-card:hover {
  box-shadow: var(--shadow-card-hover);
}

.case-card__ribbon {
  position: absolute;
  top: 26px;
  right: -60px;
  z-index: 1;
  width: 200px;
  height: 30px;
  transform: rotate(45deg);
  background: var(--color-primary);
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  text-align: center;
  pointer-events: none;
}

.case-card__scroll {
  display: block;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
}

.case-card__scroll::-webkit-scrollbar {
  display: none;
}

.case-card__body {
  display: block;
  padding: 20px;
}

.case-card__title {
  display: block;
  margin: 20px 0;
  color: var(--color-text);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
}

.case-card__desc {
  display: block;
  margin: 0;
  color: var(--color-text);
  font-size: 16px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

@media (max-width: 640px) {
  .case-card {
    height: auto;
    min-height: 168px;
  }

  .case-card__scroll {
    height: auto;
    overflow: visible;
  }

  .case-card__body {
    padding: 18px;
  }

  .case-card__title {
    margin: 8px 0 10px;
    padding-right: 40px;
    font-size: 21px;
  }

  .case-card__desc {
    font-size: 15px;
    line-height: 1.6;
  }

  .case-card__ribbon {
    top: 24px;
    right: -64px;
    width: 190px;
    height: 26px;
    font-size: 13px;
    line-height: 26px;
  }
}
</style>
