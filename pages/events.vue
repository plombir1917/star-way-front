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
            Творческие мероприятия
          </h2>

          <!-- Search and Actions -->
          <div class="flex justify-between items-center mb-6">
            <div class="relative w-64">
              <input
                type="text"
                placeholder="Поиск мероприятий..."
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
              Добавить мероприятие
            </button>
          </div>

          <!-- Events Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(event, index) in events"
              :key="index"
              class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md space-y-2"
            >
              <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200">
                {{ event.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ event.description }}
              </p>
              <div class="flex justify-between items-center mt-2">
                <span
                  class="text-xs font-medium text-purple-600 dark:text-purple-400"
                >
                  {{ event.date }}
                </span>
                <div class="space-x-2">
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
                </div>
              </div>
              <div class="flex justify-between items-center mt-2">
                <NuxtLink
                  to="/event-details"
                  class="text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Подробнее
                </NuxtLink>
                <button
                  class="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Записаться
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex justify-between items-center">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Показано 1-6 из 18 мероприятий
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
import AdminHeader from '~/components/Header.vue';
import AdminSidebar from '~/components/Sidebar.vue';

// Пример данных творческих мероприятий
const events = [
  {
    title: 'Мастер-класс по актерскому мастерству',
    description: 'Развивайте навыки сценического искусства.',
    date: '15 октября 2023',
  },
  {
    title: 'Воркшоп по созданию комиксов',
    description: 'Научитесь создавать свои собственные комиксы.',
    date: '20 октября 2023',
  },
  {
    title: 'Фотография для начинающих',
    description: 'Основы композиции и работы с камерой.',
    date: '25 октября 2023',
  },
  {
    title: 'Танцевальный флешмоб',
    description: 'Присоединяйтесь к массовому танцу в центре города.',
    date: '30 октября 2023',
  },
  {
    title: 'Мастер-класс по рисованию акварелью',
    description: 'Узнайте секреты работы с акварелью.',
    date: '5 ноября 2023',
  },
  {
    title: 'Литературный вечер',
    description: 'Чтение и обсуждение современной прозы.',
    date: '10 ноября 2023',
  },
];
</script>
