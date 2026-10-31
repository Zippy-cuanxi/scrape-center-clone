<script setup>
import AlertBanner from '@/components/AlertBanner.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/components/AppHeader.vue';
import CaseCard from '@/components/CaseCard.vue';
import StatsPanel from '@/components/StatsPanel.vue';
import { cases } from '@/data/cases';
import { site } from '@/data/site';
</script>

<template>
  <div class="app-shell">
    <AppHeader />

    <main class="site-main">
      <div class="container">
        <h1 class="sr-only">{{ site.tagline }}</h1>

        <AlertBanner />
        <StatsPanel />

        <section class="case-section" aria-labelledby="cases-heading">
          <h2 id="cases-heading" class="sr-only">案例列表</h2>

          <div class="case-grid">
            <CaseCard
              v-for="item in cases"
              :key="item.name"
              :item="item"
            />
          </div>
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.case-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--grid-gap);
  margin-top: 20px;
}

@media (max-width: 991px) {
  .case-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 639px) {
  .case-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
