<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Toaster -->
    <Toaster ref="toaster" />
    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Профиль пользователя
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Информация о вашем аккаунте
      </p>
    </div>
    <!-- Основной контент -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in"
    >
      <!-- Profile Section -->
      <div class="space-y-6">
        <div class="flex items-center space-x-4">
          <div class="relative group">
            <img
              :src="avatarUrl"
              alt="User Avatar"
              class="w-20 h-20 rounded-full object-cover border-2 border-purple-600 dark:border-purple-400"
            />
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200">
              {{ getFullName }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ profileData.email }}
            </p>
            <p class="text-sm text-purple-600 dark:text-purple-400 mt-1">
              Роль: {{ userRole || 'Загрузка...' }}
            </p>
          </div>
        </div>
        <!-- Profile Info -->
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="surname"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Фамилия
              </label>
              <p
                id="surname"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              >
                {{ profileData.surname }}
              </p>
            </div>
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Имя
              </label>
              <p
                id="name"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              >
                {{ profileData.name }}
              </p>
            </div>
          </div>
          <div>
            <label
              for="patronymic"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Отчество
            </label>
            <p
              id="patronymic"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            >
              {{ profileData.patronymic || '-' }}
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <p
                id="email"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              >
                {{ profileData.email }}
              </p>
            </div>
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Телефон
              </label>
              <p
                id="phone"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              >
                {{ profileData.phone || '-' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Toaster from '~/components/Toaster.vue';

definePageMeta({
  layout: 'admin',
});

const toaster = ref(null);
const profileData = ref({
  id: null,
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  phone: '',
  avatar: '',
});
const userRole = ref(null); // Хранение роли пользователя

// Получение полного имени
const getFullName = computed(() => {
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
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    getFullName.value
  )}&background=6366f1&color=fff`;
});

// Загрузка данных профиля
const fetchProfile = async () => {
  try {
    const response = await fetch('https://igor-plaxin.ru/star-way/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) throw new Error('Ошибка загрузки профиля');
    const data = await response.json();
    profileData.value = {
      id: data.id,
      name: data.name || '',
      surname: data.surname || '',
      patronymic: data.patronymic || '',
      email: data.email || '',
      phone: data.phone || '',
      avatar: data.avatar || '',
    };
  } catch (error) {
    toaster.value.addToast(
      'Ошибка загрузки профиля: ' + error.message,
      'error'
    );
    console.error('Ошибка загрузки профиля:', error);
  }
};

// Функция для получения роли пользователя
const fetchUserRole = async () => {
  try {
    const response = await fetch(
      'https://igor-plaxin.ru/star-way/token-payload',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    if (!response.ok) throw new Error('Ошибка получения данных пользователя');
    const data = await response.json();
    userRole.value = data.role;
  } catch (error) {
    console.error('Ошибка получения роли:', error);
    userRole.value = null;
  }
};

// Загрузка данных при монтировании
onMounted(async () => {
  await fetchProfile();
  await fetchUserRole();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
