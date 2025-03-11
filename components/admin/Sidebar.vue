<template>
  <aside
    :class="[
      'text-gray-800 h-screen flex-shrink-0 transition-all duration-300 dark:bg-gray-900 dark:text-gray-200',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
  >
    <!-- Header -->
    <div class="p-4 flex items-center justify-between">
      <div v-if="!isCollapsed" class="flex items-center space-x-2">
        <img
          alt="Logo"
          class="w-8 h-8 rounded-full object-cover bg-purple-500 p-1"
        />
        <h2 class="text-xl font-bold text-purple-600 dark:text-purple-400">
          Меню
        </h2>
      </div>
      <button
        @click="isCollapsed = !isCollapsed"
        :class="[
          'p-2 rounded-lg transition duration-200',
          isDarkMode
            ? 'hover:bg-purple-700 dark:hover:bg-purple-600'
            : 'hover:bg-purple-100',
        ]"
      >
        <span v-if="isCollapsed">→</span>
        <span v-else>←</span>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="mt-4">
      <ul class="space-y-2 px-2">
        <li>
          <NuxtLink
            to="/admin"
            :class="[
              'flex items-center p-2 rounded-lg transition duration-200',
              isActive('/admin')
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-700 dark:text-purple-200'
                : 'text-gray-600 hover:bg-purple-100 dark:text-gray-300 dark:hover:bg-purple-700',
            ]"
          >
            <svg
              v-if="!isCollapsed"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-3 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0L9 20M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span v-if="!isCollapsed" class="ml-3">Главная</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/admin/users"
            :class="[
              'flex items-center p-2 rounded-lg transition duration-200',
              isActive('/admin/users')
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-700 dark:text-purple-200'
                : 'text-gray-600 hover:bg-purple-100 dark:text-gray-300 dark:hover:bg-purple-700',
            ]"
          >
            <svg
              v-if="!isCollapsed"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-3 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span v-if="!isCollapsed" class="ml-3">Пользователи</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/admin/settings"
            :class="[
              'flex items-center p-2 rounded-lg transition duration-200',
              isActive('/admin/settings')
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-700 dark:text-purple-200'
                : 'text-gray-600 hover:bg-purple-100 dark:text-gray-300 dark:hover:bg-purple-700',
            ]"
          >
            <svg
              v-if="!isCollapsed"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-3 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span v-if="!isCollapsed" class="ml-3">Настройки</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const isCollapsed = ref(false);
const route = useRoute();

// Функция для проверки активного маршрута
function isActive(path) {
  return route.path === path;
}
</script>
