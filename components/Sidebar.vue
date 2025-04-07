<template>
  <aside
    :class="[
      'text-gray-800 h-screen flex-shrink-0 transition-all duration-300 dark:bg-gray-900 dark:text-gray-200 fixed left-0 top-0 z-30 shadow-lg',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
  >
    <!-- Header -->
    <div
      class="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700"
    >
      <div v-if="!isCollapsed" class="flex items-center space-x-2">
        <img
          src="/logo.svg"
          alt="Logo"
          class="w-8 h-8 rounded-full object-cover bg-purple-500 p-1"
        />
        <h2 class="text-xl font-bold text-purple-600 dark:text-purple-400">
          Star Way
        </h2>
      </div>
      <button
        @click="toggleCollapse"
        :class="[
          'p-2 rounded-lg transition duration-200',
          isDarkMode
            ? 'hover:bg-purple-700 dark:hover:bg-purple-600'
            : 'hover:bg-purple-100',
        ]"
        aria-label="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-600 dark:text-gray-300"
          :class="{ 'rotate-180': isCollapsed }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="mt-4 overflow-y-auto h-[calc(100vh-4rem)]">
      <ul class="space-y-1 px-2">
        <li v-for="(item, index) in menuItems" :key="index">
          <NuxtLink
            :to="item.path"
            :class="[
              'flex items-center p-2 rounded-lg transition duration-200 group',
              isActive(item.path)
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-700 dark:text-purple-200'
                : 'text-gray-600 hover:bg-purple-100 dark:text-gray-300 dark:hover:bg-purple-700',
            ]"
          >
            <div class="flex items-center justify-center w-8 h-8">
              <component
                :is="item.icon"
                class="h-5 w-5 text-purple-600 dark:text-purple-400"
                :class="{ 'mr-3': !isCollapsed }"
              />
            </div>
            <span
              v-if="!isCollapsed"
              class="ml-3 transition-opacity duration-200"
            >
              {{ item.name }}
            </span>
            <div
              v-if="isCollapsed"
              class="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              {{ item.name }}
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const isCollapsed = ref(false);
const route = useRoute();
const isDarkMode = ref(false);

// Меню навигации
const menuItems = [
  {
    name: 'Главная',
    path: '/admin',
    icon: 'HomeIcon',
  },
  {
    name: 'Пользователи',
    path: '/admin/users',
    icon: 'UsersIcon',
  },
  {
    name: 'Мероприятия',
    path: '/admin/events',
    icon: 'CalendarIcon',
  },
  {
    name: 'Коллективы',
    path: '/admin/groups',
    icon: 'UserGroupIcon',
  },
  {
    name: 'Профиль',
    path: '/admin/profile',
    icon: 'UserIcon',
  },
  {
    name: 'Настройки',
    path: '/admin/settings',
    icon: 'CogIcon',
  },
];

// Функция для проверки активного маршрута
function isActive(path) {
  return route.path === path;
}

// Функция для переключения состояния сайдбара
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem('sidebarCollapsed', isCollapsed.value);
}

// Загрузка темы при монтировании компонента
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  isDarkMode.value = savedTheme === 'dark';

  // Загрузка состояния сайдбара
  const savedSidebarState = localStorage.getItem('sidebarCollapsed');
  if (savedSidebarState !== null) {
    isCollapsed.value = savedSidebarState === 'true';
  }
});

// Сохранение состояния сайдбара при изменении
watch(isCollapsed, (newValue) => {
  localStorage.setItem('sidebarCollapsed', newValue);
});
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
</style>
