<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import SiteLogo from './SiteLogo.vue';
import { navItems, site } from '@/data/site';

const menuOpen = ref(false);
let desktopQuery;

function closeMenu() {
  menuOpen.value = false;
}

function handleKeydown(event) {
  if (event.key === 'Escape') closeMenu();
}

function handleViewportChange(event) {
  if (event.matches) closeMenu();
}

onMounted(() => {
  desktopQuery = window.matchMedia('(min-width: 761px)');
  desktopQuery.addEventListener('change', handleViewportChange);
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  desktopQuery?.removeEventListener('change', handleViewportChange);
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <header id="top" class="site-header">
    <div class="container header-inner">
      <a class="header-brand" href="#top" aria-label="Scrape Center 首页">
        <SiteLogo :title="site.name" />
      </a>

      <nav class="desktop-nav" aria-label="主导航">
        <a
          v-for="item in navItems"
          :key="item.label"
          class="nav-link"
          :class="{ 'is-active': item.active }"
          :href="item.href"
          :aria-current="item.active ? 'page' : undefined"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        type="button"
        class="menu-toggle"
        :class="{ 'is-open': menuOpen }"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        :aria-label="menuOpen ? '关闭导航菜单' : '打开导航菜单'"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <Transition name="menu">
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        class="mobile-nav"
        aria-label="移动端导航"
      >
        <a
          v-for="item in navItems"
          :key="item.label"
          class="mobile-nav__link"
          :class="{ 'is-active': item.active }"
          :href="item.href"
          :aria-current="item.active ? 'page' : undefined"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: relative;
  z-index: 20;
  background: var(--color-surface);
}

.header-inner {
  display: flex;
  align-items: center;
  height: var(--header-height);
}

.header-brand {
  flex: none;
}

.desktop-nav {
  display: flex;
  align-self: stretch;
  margin-left: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  border-bottom: 2px solid transparent;
  color: var(--color-text);
  font-size: 14px;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link.is-active {
  border-bottom-color: var(--color-primary);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  margin-left: auto;
  padding: 0 9px;
  border: 0;
  border-radius: var(--radius-control);
  background: transparent;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 2px;
  background: var(--color-text);
  transition:
    transform var(--transition-fast),
    opacity var(--transition-fast);
}

.menu-toggle.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle.is-open span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-nav {
  position: absolute;
  top: var(--header-height);
  right: 0;
  left: 0;
  border-top: 1px solid var(--color-border-soft);
  background: var(--color-surface);
  box-shadow: var(--shadow-menu);
}

.mobile-nav__link {
  display: block;
  padding: 14px 20px;
  border-left: 3px solid transparent;
  color: var(--color-text);
  font-size: 15px;
}

.mobile-nav__link + .mobile-nav__link {
  border-top: 1px solid var(--color-border-soft);
}

.mobile-nav__link.is-active {
  border-left-color: var(--color-primary);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 760px) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
