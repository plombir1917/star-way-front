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
            Управление коллективами
          </h2>

          <!-- Search and Actions -->
          <div class="flex justify-between items-center mb-6">
            <div class="relative w-64">
              <input
                type="text"
                placeholder="Поиск коллективов..."
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
              Добавить коллектив
            </button>
          </div>

          <!-- Teams Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(team, index) in teams"
              :key="index"
              class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md space-y-2"
            >
              <!-- Avatar -->
              <img
                :src="team.avatar"
                alt="Team Avatar"
                class="w-20 h-20 rounded-full object-cover mx-auto"
              />
              <!-- Name -->
              <h3
                class="text-lg font-medium text-center text-gray-800 dark:text-gray-200"
              >
                {{ team.name }}
              </h3>
              <!-- Description -->
              <p class="text-sm text-center text-gray-600 dark:text-gray-400">
                {{ team.description }}
              </p>
              <!-- Actions -->
              <div class="flex justify-center space-x-2 mt-2">
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
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex justify-between items-center">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Показано 1-6 из 18 коллективов
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

// Пример данных коллективов
const teams = [
  {
    avatar: '/assets/images/team1.jpg', // Замените на путь к вашим изображениям
    name: 'Танцевальный коллектив "Звезды"',
    description: 'Классический танец, современные постановки.',
  },
  {
    avatar: '/assets/images/team2.jpg',
    name: 'Школа танца "Ритм"',
    description: 'Уличные танцы, хип-хоп, брейк-данс.',
  },
  {
    avatar: '/assets/images/team3.jpg',
    name: 'Академия танца "Грация"',
    description: 'Балет, классическая хореография.',
  },
  {
    avatar: '/assets/images/team4.jpg',
    name: 'Творческая группа "Флеш"',
    description: 'Современный танец, экспериментальные постановки.',
  },
  {
    avatar: '/assets/images/team5.jpg',
    name: 'Танцевальная студия "Пульс"',
    description: 'Латиноамериканские танцы, сальса, бачата.',
  },
  {
    avatar: '/assets/images/team6.jpg',
    name: 'Коллектив "Вдохновение"',
    description: 'Народные танцы, этнические стили.',
  },
];
</script>
