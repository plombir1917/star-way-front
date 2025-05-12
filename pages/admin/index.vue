<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Приветствие -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Добро пожаловать, {{ fullName }}!
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Вот краткий обзор вашей административной панели
      </p>
    </div>

    <!-- Статистика -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105"
      >
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-purple-600 dark:text-purple-400"
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
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Пользователи
            </p>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ stats.users }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span
              :class="
                stats.usersChange >= 0 ? 'text-green-500' : 'text-red-500'
              "
            >
              {{ stats.usersChange >= 0 ? '+' : '' }}{{ stats.usersChange }}%
            </span>
            <span class="ml-2 text-gray-500 dark:text-gray-400"
              >за последний месяц</span
            >
          </div>
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105"
      >
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Мероприятия
            </p>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ stats.events }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span
              :class="
                stats.eventsChange >= 0 ? 'text-green-500' : 'text-red-500'
              "
            >
              {{ stats.eventsChange >= 0 ? '+' : '' }}{{ stats.eventsChange }}%
            </span>
            <span class="ml-2 text-gray-500 dark:text-gray-400"
              >за последний месяц</span
            >
          </div>
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105"
      >
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Коллективы
            </p>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ stats.groups }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span
              :class="
                stats.groupsChange >= 0 ? 'text-green-500' : 'text-red-500'
              "
            >
              {{ stats.groupsChange >= 0 ? '+' : '' }}{{ stats.groupsChange }}%
            </span>
            <span class="ml-2 text-gray-500 dark:text-gray-400"
              >за последний месяц</span
            >
          </div>
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105"
      >
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-yellow-600 dark:text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Заявки
            </p>
            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
              {{ stats.applications }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span
              :class="
                stats.applicationsChange >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              "
            >
              {{ stats.applicationsChange >= 0 ? '+' : ''
              }}{{ stats.applicationsChange }}%
            </span>
            <span class="ml-2 text-gray-500 dark:text-gray-400"
              >за последний месяц</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Графики и таблицы -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- График активности -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Активность за последние 7 дней
        </h2>
        <div class="h-64 flex items-end justify-between">
          <div
            v-for="(day, index) in activityData"
            :key="index"
            class="flex flex-col items-center"
          >
            <div
              class="w-12 h-32 bg-purple-100 dark:bg-purple-900 rounded-t-lg flex items-end"
            >
              <div
                class="w-full bg-purple-600 dark:bg-purple-400 rounded-t-lg transition-all duration-500"
                :style="{ height: `${day.value}%` }"
              ></div>
            </div>
            <span class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{
              day.label
            }}</span>
          </div>
        </div>
      </div>

      <!-- Последние действия -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Последние действия
        </h2>
        <div class="space-y-4">
          <div
            v-for="(action, index) in recentActions"
            :key="index"
            class="flex items-start"
          >
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :class="action.bgColor"
              >
                <component
                  :is="action.icon"
                  class="h-4 w-4"
                  :class="action.iconColor"
                />
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-800 dark:text-white">
                {{ action.title }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ action.time }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Быстрые действия -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Быстрые действия
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="(action, index) in quickActions"
          :key="index"
          class="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition duration-200"
          @click="handleQuickAction(action.path)"
        >
          <div class="p-2 rounded-full" :class="action.bgColor">
            <component
              :is="action.icon"
              class="h-5 w-5"
              :class="action.iconColor"
            />
          </div>
          <span
            class="ml-3 text-sm font-medium text-gray-800 dark:text-white"
            >{{ action.name }}</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Toaster from '~/components/Toaster.vue';

const router = useRouter();
definePageMeta({
  layout: 'admin',
});

const toaster = ref(null);
const fullName = ref('');
const loadingProfile = ref(true);
const stats = ref({
  users: 1245,
  usersChange: 12,
  events: 48,
  eventsChange: 8,
  groups: 32,
  groupsChange: 5,
  applications: 89,
  applicationsChange: -3,
});
const activityData = ref([
  { label: 'Пн', value: 65 },
  { label: 'Вт', value: 45 },
  { label: 'Ср', value: 80 },
  { label: 'Чт', value: 30 },
  { label: 'Пт', value: 90 },
  { label: 'Сб', value: 50 },
  { label: 'Вс', value: 70 },
]);
const recentActions = ref([
  {
    title: 'Добавлено новое мероприятие "Танцевальный фестиваль"',
    time: '5 минут назад',
    icon: 'CalendarIcon',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Зарегистрирован новый пользователь',
    time: '1 час назад',
    icon: 'UserIcon',
    bgColor: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Создан новый коллектив "Звездочки"',
    time: '3 часа назад',
    icon: 'UserGroupIcon',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    title: 'Обновлено положение мероприятия',
    time: '5 часов назад',
    icon: 'DocumentIcon',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
]);
const quickActions = ref([
  {
    name: 'Создать заявку',
    path: '/admin/requests',
    icon: 'CalendarIcon',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'Добавить участника',
    path: '/admin/member',
    icon: 'UserIcon',
    bgColor: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    name: 'Создать коллектив',
    path: '/admin/groups',
    icon: 'UserGroupIcon',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    name: 'Добавить участника в заявку',
    path: '/admin/member-on-request',
    icon: 'CogIcon',
    bgColor: 'bg-gray-100 dark:bg-gray-900',
    iconColor: 'text-gray-600 dark:text-gray-400',
  },
]);

// Получение полного имени
const getFullName = (profile) => {
  const parts = [profile.surname, profile.name];
  if (profile.patronymic) {
    parts.push(profile.patronymic);
  }
  return parts.filter(Boolean).join(' ');
};

// Загрузка данных профиля
const fetchProfile = async () => {
  try {
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
    fullName.value = getFullName(data);
  } catch (error) {
    toaster.value.addToast(
      'Ошибка загрузки профиля: ' + error.message,
      'error'
    );
    fullName.value = 'Пользователь';
  } finally {
    loadingProfile.value = false;
  }
};

// Обработчик быстрых действий
const handleQuickAction = (path) => {
  router.push(path);
};

// Загрузка данных при монтировании
onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
main {
  margin-top: 4rem;
  margin-left: 0;
}
@media (min-width: 768px) {
  main {
    margin-left: 16rem;
  }
}
</style>
