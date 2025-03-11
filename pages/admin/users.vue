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
        <div class="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
          <h2
            class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
          >
            Управление пользователями
          </h2>

          <!-- Search and Actions -->
          <div class="flex justify-between items-center mb-6">
            <div class="relative w-64">
              <input
                type="text"
                placeholder="Поиск пользователей..."
                class="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Добавить пользователя
            </button>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table
              class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            >
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    Имя
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    Роль
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                  >
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
              >
                <tr v-for="(user, index) in users" :key="index">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                  >
                    {{ user.name }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                  >
                    {{ user.role }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"
                  >
                    <button
                      class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Редактировать
                    </button>
                    <button
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex justify-between items-center">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Показано 1-10 из 50 пользователей
            </span>
            <div class="space-x-2">
              <button
                class="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              >
                Предыдущая
              </button>
              <button
                class="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
              >
                Следующая
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminHeader from '~/components/admin/Header.vue';
import AdminSidebar from '~/components/admin/Sidebar.vue';

// Пример данных пользователей
const users = [
  { name: 'Иван Иванов', role: 'Администратор' },
  { name: 'Петр Петров', role: 'Пользователь' },
  { name: 'Мария Сидорова', role: 'Редактор' },
];
</script>
