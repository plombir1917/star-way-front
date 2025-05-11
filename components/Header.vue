<template>
  <header
    class="bg-white shadow-sm dark:bg-gray-800 fixed top-0 right-0 left-0 z-20 transition-all duration-300"
    :class="{
      'ml-16': isSidebarCollapsed && !isMobile,
      'ml-64': !isSidebarCollapsed && !isMobile,
    }"
  >
    <!-- Toaster -->
    <Toaster ref="toaster" />

    <div
      class="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <!-- Левая часть: Бургер и заголовок -->
      <div class="flex items-center space-x-4">
        <!-- Бургер-меню для мобильных -->
        <button
          v-if="isMobile"
          @click="$emit('toggleSidebar')"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1
          class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200"
        >
          {{ pageTitle }}
        </h1>
      </div>
      <!-- Правая часть: Поиск, уведомления, тема и профиль -->
      <div class="flex items-center space-x-2 sm:space-x-4">
        <!-- Поиск (скрыт на мобильных) -->
        <div class="relative hidden md:block flex-1 max-w-md">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Поиск..."
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              @keyup.enter="handleSearch"
            />
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
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
          </div>
        </div>
        <!-- Уведомления -->
        <div class="relative">
          <button
            @click="toggleNotifications"
            class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
            aria-label="Уведомления"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3.159a2.032 2.032 0 01-1.405 1.855L9 17h6z"
              />
            </svg>
            <span
              v-if="unreadNotifications > 0"
              class="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full"
            >
              {{ unreadNotifications }}
            </span>
          </button>
          <!-- Выпадающее меню уведомлений -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="showNotifications"
              class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 notifications-menu"
            >
              <div class="p-4">
                <h3
                  class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"
                >
                  Уведомления
                </h3>
                <div class="space-y-4 max-h-96 overflow-y-auto">
                  <div
                    v-if="notifications.length === 0"
                    class="text-center text-gray-500 dark:text-gray-400 py-4"
                  >
                    Нет новых уведомлений
                  </div>
                  <div
                    v-for="(notification, index) in notifications"
                    :key="index"
                    class="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                  >
                    <div class="flex-shrink-0">
                      <div
                        class="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center"
                      >
                        <component
                          :is="notification.icon"
                          class="h-4 w-4 text-purple-600 dark:text-purple-400"
                        />
                      </div>
                    </div>
                    <div class="ml-3 flex-1">
                      <p
                        class="text-sm font-medium text-gray-800 dark:text-gray-200"
                      >
                        {{ notification.title }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ notification.message }}
                      </p>
                      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {{ notification.time }}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <button
                    @click="markAllAsRead"
                    class="w-full text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                  >
                    Отметить все как прочитанные
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!-- Переключатель темы -->
        <ThemeToggle />
        <!-- Профиль пользователя -->
        <div class="relative">
          <button
            @click="isProfileMenuOpen = !isProfileMenuOpen"
            class="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
            aria-label="Меню профиля"
          >
            <img
              :src="avatarUrl"
              alt="User Avatar"
              class="w-8 h-8 rounded-full object-cover border-2 border-purple-500"
            />
            <span
              class="hidden md:block text-gray-800 dark:text-gray-200 truncate max-w-xs"
            >
              {{ fullName }}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <!-- Меню профиля -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 profile-menu"
            >
              <div class="py-1">
                <div
                  class="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
                >
                  <p
                    class="text-sm font-medium text-gray-800 dark:text-gray-200"
                  >
                    {{ fullName }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ userEmail }}
                  </p>
                </div>
                <NuxtLink
                  to="/admin/profile"
                  class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Профиль
                </NuxtLink>
                <NuxtLink
                  to="/admin/settings"
                  class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Настройки
                </NuxtLink>
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Выйти
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';
import Toaster from '~/components/Toaster.vue';

defineEmits(['toggleSidebar']);
const toaster = ref(null);
const route = useRoute();
const router = useRouter();

// Данные профиля
const profileData = ref({
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  avatar: '',
});
const loadingProfile = ref(true);

// Получение полного имени
const fullName = computed(() => {
  const parts = [profileData.value.surname, profileData.value.name];
  if (profileData.value.patronymic) {
    parts.push(profileData.value.patronymic);
  }
  return parts.filter(Boolean).join(' ');
});

// URL аватара
const avatarUrl = computed(() => {
  if (profileData.value.avatar) {
    return profileData.value.avatar;
  }
  return `https://ui-avatars.com/api/?name= ${encodeURIComponent(
    fullName.value
  )}&background=6366f1&color=fff`;
});

// Данные пользователя
const isProfileMenuOpen = ref(false);
const showNotifications = ref(false);
const searchQuery = ref('');
const isSidebarCollapsed = ref(false);
const isMobile = ref(false);
const userEmail = computed(() => profileData.value.email);

// Уведомления
const notifications = ref([
  {
    title: 'Новое мероприятие',
    message: 'Добавлено новое мероприятие "Танцевальный фестиваль"',
    time: '5 минут назад',
    icon: 'CalendarIcon',
    read: false,
  },
  {
    title: 'Новый пользователь',
    message: 'Зарегистрирован новый пользователь',
    time: '1 час назад',
    icon: 'UserIcon',
    read: false,
  },
]);

const unreadNotifications = computed(() => {
  return notifications.value.filter((n) => !n.read).length;
});

// Заголовок страницы
const pageTitle = computed(() => {
  const titles = {
    '/admin': 'Панель управления',
    '/admin/users': 'Пользователи',
    '/admin/events': 'Мероприятия',
    '/admin/groups': 'Коллективы',
    '/admin/settings': 'Настройки',
    '/admin/profile': 'Профиль',
  };
  return titles[route.path] || 'Панель управления';
});

// Загрузка данных профиля
const fetchProfile = async () => {
  try {
    loadingProfile.value = true;
    const response = await fetch('https://igor-plaxin.ru/star-way/profile ', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки профиля');
    }

    const data = await response.json();
    profileData.value = {
      name: data.name || '',
      surname: data.surname || '',
      patronymic: data.patronymic || '',
      email: data.email || '',
      avatar: data.avatar || '',
    };
  } catch (error) {
    toaster.value.addToast(
      'Ошибка загрузки профиля: ' + error.message,
      'error'
    );
  } finally {
    loadingProfile.value = false;
  }
};

// Обработчики
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.read = true;
  });
};

const handleLogout = () => {
  localStorage.removeItem('auth_token');
  router.push('/login');
};

// Проверка мобильного устройства
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Загрузка состояния сайдбара
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);

  const savedSidebarState = localStorage.getItem('sidebarCollapsed');
  if (savedSidebarState !== null) {
    isSidebarCollapsed.value = savedSidebarState === 'true';
  }

  document.addEventListener('click', handleClickOutside);

  // Загрузка профиля
  fetchProfile();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', checkMobile);
});

// Закрытие выпадающих меню при клике вне их
const handleClickOutside = (event) => {
  const profileButton = document.querySelector('[aria-label="Меню профиля"]');
  const profileMenu = document.querySelector('.profile-menu');
  const notificationsButton = document.querySelector(
    '[aria-label="Уведомления"]'
  );
  const notificationsMenu = document.querySelector('.notifications-menu');

  // Закрываем меню профиля
  if (
    profileButton &&
    !profileButton.contains(event.target) &&
    profileMenu &&
    !profileMenu.contains(event.target)
  ) {
    isProfileMenuOpen.value = false;
  }

  // Закрываем меню уведомлений
  if (
    notificationsButton &&
    !notificationsButton.contains(event.target) &&
    notificationsMenu &&
    !notificationsMenu.contains(event.target)
  ) {
    showNotifications.value = false;
  }
};

// Следим за изменением маршрута для обновления данных
watch(
  () => route.path,
  () => {
    if (route.path === '/admin/profile') {
      fetchProfile();
    }
  }
);

// Обработчики для поиска
const handleSearch = () => {
  console.log('Поиск:', searchQuery.value);
};
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
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
@media (max-width: 767px) {
  header {
    padding: 0.5rem 1rem;
  }
}
</style>
