<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="fixed inset-y-0 left-0 z-30">
      <AdminSidebar />
    </div>
    <div class="fixed top-0 right-0 left-0 z-20">
      <Header />
    </div>
    <main
      class="transition-all duration-300"
      :class="{
        'ml-64': !isSidebarCollapsed,
        'ml-16': isSidebarCollapsed,
      }"
    >
      <div class="p-2 pt-12">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import AdminSidebar from '~/components/Sidebar.vue';
import Header from '~/components/Header.vue';

const isSidebarCollapsed = ref(false);

onMounted(() => {
  const savedSidebarState = localStorage.getItem('sidebarCollapsed');
  if (savedSidebarState !== null) {
    isSidebarCollapsed.value = savedSidebarState === 'true';
  }
});

watch(
  () => localStorage.getItem('sidebarCollapsed'),
  (newValue) => {
    isSidebarCollapsed.value = newValue === 'true';
  }
);
</script>

<style scoped>
/* Добавляем стили для корректного отображения */
main {
  margin-top: 2.5rem; /* Минимальный отступ для хедера */
  min-height: calc(100vh - 2.5rem);
}

/* Отступы для сайдбара будут управляться через JavaScript в компонентах */
</style>
