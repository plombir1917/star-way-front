<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <AdminHeader />

      <!-- Main Section -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Управление пользователями
            </h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Добавьте, удалите или измените пользователей системы.
            </p>
          </div>

          <!-- Card 2 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Настройки системы
            </h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Настройте параметры системы под ваши нужды.
            </p>
          </div>

          <!-- Card 3 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]"
          >
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Аналитика
            </h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Просматривайте статистику и аналитические данные.
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminHeader from '~/components/admin/Header.vue';
import AdminSidebar from '~/components/admin/Sidebar.vue';
</script>
