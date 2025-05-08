<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Фиксированный сайдбар -->
    <div
      v-if="!isMobile || isSidebarOpen"
      class="fixed top-0 left-0 h-screen z-30 transition-all duration-300"
      :style="{ width: sidebarWidth }"
    >
      <AdminSidebar
        :is-mobile="isMobile"
        :is-open="isSidebarOpen"
        @close="closeSidebar"
      />
    </div>

    <!-- Фиксированный хедер -->
    <div
      class="fixed top-0 right-0 z-20 transition-all duration-300"
      :style="{ left: headerLeft }"
    >
      <Header :is-mobile="isMobile" @toggle-sidebar="toggleSidebar" />
    </div>

    <!-- Основной контент -->
    <main
      class="transition-all duration-300 min-h-screen"
      :style="{ marginLeft: mainMarginLeft, paddingTop: '4rem' }"
    >
      <slot />
    </main>

    <!-- Мобильный оверлей -->
    <div
      v-if="isMobile && isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-20"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import AdminSidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

const isMobile = ref(false);
const isSidebarOpen = ref(false);

const SIDEBAR_WIDTH = 256; // 64 (w-64)

const sidebarWidth = computed(() => {
  if (isMobile.value) return isSidebarOpen.value ? `${SIDEBAR_WIDTH}px` : '0px';
  return `${SIDEBAR_WIDTH}px`;
});

const headerLeft = computed(() => {
  if (isMobile.value) return '0px';
  return `${SIDEBAR_WIDTH}px`;
});

const mainMarginLeft = computed(() => {
  if (isMobile.value) return '0px';
  return `${SIDEBAR_WIDTH}px`;
});

// Функция для проверки мобильного устройства
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) {
    isSidebarOpen.value = false;
  } else {
    isSidebarOpen.value = true;
  }
};

// Функция для переключения сайдбара (бургер)
const toggleSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
};

// Функция для закрытия сайдбара
const closeSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
/* Анимации для сайдбара и хедера */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Стили для мобильной версии */
@media (max-width: 767px) {
  .sidebar {
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
  }

  .sidebar.hidden {
    transform: translateX(-100%);
  }
}
</style>
