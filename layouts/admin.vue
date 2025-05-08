<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Фиксированный сайдбар -->
    <div
      v-if="!isMobile || isSidebarOpen"
      class="fixed top-0 left-0 h-screen z-30 transition-all duration-300"
      :class="{
        'w-16': isSidebarCollapsed && !isMobile,
        'w-64': !isSidebarCollapsed || isMobile,
      }"
    >
      <AdminSidebar
        :is-collapsed="isSidebarCollapsed"
        :is-mobile="isMobile"
        :is-open="isSidebarOpen"
        @close="closeSidebar"
      />
    </div>

    <!-- Фиксированный хедер -->
    <div
      class="fixed top-0 right-0 z-20 transition-all duration-300"
      :class="{
        'left-16': isSidebarCollapsed && !isMobile,
        'left-64': !isSidebarCollapsed && !isMobile,
        'left-0': isMobile,
      }"
    >
      <Header
        :is-sidebar-collapsed="isSidebarCollapsed"
        :is-mobile="isMobile"
        @toggle-sidebar="toggleSidebar"
      />
    </div>

    <!-- Основной контент -->
    <main
      class="transition-all duration-300 min-h-screen"
      :class="{
        'ml-16': isSidebarCollapsed && !isMobile,
        'ml-64': !isSidebarCollapsed && !isMobile,
        'ml-0': isMobile,
        'pt-16': true,
      }"
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
import { ref, onMounted, onUnmounted } from 'vue';
import AdminSidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

const isSidebarCollapsed = ref(false);
const isMobile = ref(false);
const isSidebarOpen = ref(false);

// Функция для проверки мобильного устройства
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) {
    isSidebarCollapsed.value = true;
    isSidebarOpen.value = false;
  } else {
    isSidebarOpen.value = true;
  }
};

// Функция для переключения сайдбара (бургер)
const toggleSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = !isSidebarOpen.value;
  } else {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.value);
  }
};

// Функция для закрытия сайдбара
const closeSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
};

// Загрузка состояния сайдбара и проверка мобильного устройства
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);

  const savedSidebarState = localStorage.getItem('sidebarCollapsed');
  if (savedSidebarState !== null) {
    isSidebarCollapsed.value = savedSidebarState === 'true';
  }
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
