<template>
  <aside
    :class="[
      'h-screen flex-shrink-0 transition-all duration-300 dark:bg-gray-900 dark:text-gray-200 shadow-lg',
      isMobile ? 'fixed top-0 left-0 w-64 z-40' : 'relative',
      isCollapsed && !isMobile ? 'w-16' : 'w-64',
      isMobile && !isOpen ? '-translate-x-full' : '',
    ]"
  >
    <!-- Header -->
    <div
      class="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <div v-if="!isCollapsed || isMobile" class="flex items-center space-x-2">
        <img
          src="/logo.svg"
          alt="Logo"
          class="w-8 h-8 rounded-full object-cover bg-purple-500 p-1"
        />
        <h2 class="text-xl font-bold text-purple-600 dark:text-purple-400">
          Star Way
        </h2>
      </div>
      <div class="flex items-center space-x-2">
        <button
          v-if="isMobile"
          @click="closeSidebar"
          class="p-2 rounded-lg transition duration-200 hover:bg-purple-100 dark:hover:bg-purple-700"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <nav
      class="mt-4 overflow-y-auto h-[calc(100vh-4rem)] bg-white dark:bg-gray-800"
    >
      <ul class="space-y-1 px-2">
        <li v-for="(item, index) in menuItems" :key="index">
          <NuxtLink
            :to="item.path"
            :class="[
              'flex items-center p-2 rounded-lg transition duration-200 group relative',
              isActive(item.path)
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-700 dark:text-purple-200'
                : 'text-gray-600 hover:bg-purple-100 dark:text-gray-300 dark:hover:bg-purple-700',
            ]"
            @click="isMobile && $emit('close')"
          >
            <span class="flex items-center justify-center w-8 h-8 mr-3">
              <component
                :is="item.icon"
                class="h-5 w-5 text-purple-600 dark:text-purple-400"
              />
            </span>
            <span class="transition-opacity duration-200">
              {{ item.name }}
            </span>
            <div
              v-if="isCollapsed && !isMobile"
              class="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
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
import { ref, onMounted, watch, h } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['close']);

const isCollapsed = ref(false);
const route = useRoute();
const isDarkMode = ref(false);

// Компоненты иконок
const HomeIcon = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        }),
      ]
    );
  },
};

const UsersIcon = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        }),
      ]
    );
  },
};

const LocationIcon = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        }),
      ]
    );
  },
};

const CalendarIcon = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        }),
      ]
    );
  },
};

const UserGroupIcon = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        }),
      ]
    );
  },
};

const UserIcon = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        }),
      ]
    );
  },
};

const CogIcon = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
        }),
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        }),
      ]
    );
  },
};

const DocumentTextIcon = {
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        }),
      ]
    );
  },
};

// Меню навигации
const menuItems = [
  { name: 'Главная', path: '/admin', icon: HomeIcon },
  { name: 'Пользователи', path: '/admin/users', icon: UsersIcon },
  { name: 'Площадки', path: '/admin/locations', icon: LocationIcon },
  { name: 'Мероприятия', path: '/admin/events', icon: CalendarIcon },
  { name: 'Коллективы', path: '/admin/groups', icon: UserGroupIcon },
  { name: 'Заявки', path: '/admin/requests', icon: DocumentTextIcon },
  { name: 'Профиль', path: '/admin/profile', icon: UserIcon },
  { name: 'Настройки', path: '/admin/settings', icon: CogIcon },
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

// Функция для закрытия сайдбара
const closeSidebar = () => {
  if (props.isMobile) {
    emit('close');
  }
};

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

/* Анимации для мобильной версии */
@media (max-width: 767px) {
  aside {
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
  }

  aside.hidden {
    transform: translateX(-100%);
  }
}
</style>
