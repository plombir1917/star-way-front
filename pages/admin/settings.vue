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
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2
            class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
          >
            Настройки системы
          </h2>

          <!-- Form Fields -->
          <div class="mt-4 space-y-4">
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Название системы
              </label>
              <input
                type="text"
                placeholder="Введите название системы"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Описание
              </label>
              <textarea
                placeholder="Введите описание системы"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              ></textarea>
            </div>
          </div>

          <!-- Save Button -->
          <div class="mt-6">
            <button
              class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Сохранить
            </button>
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
