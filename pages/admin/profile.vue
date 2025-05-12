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
        Управление вашим профилем
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
              class="w-20 h-20 rounded-full object-cover border-2 border-purple-600 dark:border-purple-400 transition-transform duration-300 group-hover:scale-105"
            />
            <label
              for="avatar-upload"
              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer"
            >
              <svg
                class="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.01a2 2 0 010 4H5a2 2 0 01-2-2zm0 0V7m0 0a2 2 0 012-2h.01a2 2 0 010 4H5a2 2 0 01-2-2zm16 0a2 2 0 012-2h.01a2 2 0 010 4H21a2 2 0 01-2-2zm0 0V7m0 0a2 2 0 012-2h.01a2 2 0 010 4H21a2 2 0 01-2-2z"
                />
              </svg>
              <input
                id="avatar-upload"
                type="file"
                class="hidden"
                accept="image/*"
                @change="updateAvatar"
              />
            </label>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200">
              {{ getFullName }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ profileData.email }}
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
              <input
                id="surname"
                type="text"
                v-model="profileData.surname"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Имя
              </label>
              <input
                id="name"
                type="text"
                v-model="profileData.name"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>

          <div>
            <label
              for="patronymic"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Отчество
            </label>
            <input
              id="patronymic"
              type="text"
              v-model="profileData.patronymic"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                v-model="profileData.email"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Телефон
              </label>
              <input
                id="phone"
                type="tel"
                v-model="profileData.phone"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div
          class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
        >
          <button
            @click="resetForm"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Сбросить изменения
          </button>
          <button
            @click="saveProfile"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Сохранить изменения
          </button>
        </div>

        <!-- Account Management -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
          <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            Управление аккаунтом
          </h3>
          <ul class="space-y-2">
            <li>
              <button
                @click="openChangePasswordModal"
                class="flex items-center text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 transition duration-200"
              >
                <svg
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                Изменить пароль
              </button>
            </li>
            <li>
              <button
                @click="confirmDeleteAccount"
                class="flex items-center text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition duration-200"
              >
                <svg
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Удалить аккаунт
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Модальное окно изменения пароля -->
    <div
      v-if="showPasswordModal"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closePasswordModal"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div>
            <div class="text-center">
              <h3
                class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
              >
                Изменить пароль
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Введите новый пароль
              </p>
            </div>
            <div class="mt-6 space-y-4">
              <div>
                <label
                  for="current-password"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Текущий пароль</label
                >
                <input
                  id="current-password"
                  type="password"
                  v-model="passwordForm.current"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label
                  for="new-password"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Новый пароль</label
                >
                <input
                  id="new-password"
                  type="password"
                  v-model="passwordForm.new"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Подтвердите пароль</label
                >
                <input
                  id="confirm-password"
                  type="password"
                  v-model="passwordForm.confirm"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
          </div>
          <div
            class="mt-5 sm:mt-6 sm:flex sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3"
          >
            <button
              @click="closePasswordModal"
              type="button"
              class="inline-flex justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Отмена
            </button>
            <button
              @click="changePassword"
              type="button"
              class="inline-flex justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Сохранить пароль
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно подтверждения удаления -->
    <div
      v-if="showDeleteModal"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeDeleteModal"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                id="modal-title"
              >
                Удалить аккаунт
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Вы уверены, что хотите удалить свой аккаунт? Это действие
                  необратимо.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <button
              @click="deleteAccount"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Удалить
            </button>
            <button
              @click="closeDeleteModal"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Отмена
            </button>
          </div>
        </div>
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
const profileData = ref({
  id: null,
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  phone: '',
  avatar: '',
});
const originalData = ref({});
const showPasswordModal = ref(false);
const showDeleteModal = ref(false);
const loading = ref(false);

// Данные для изменения пароля
const passwordForm = ref({
  current: '',
  new: '',
  confirm: '',
});

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
  return `https://ui-avatars.com/api/?name= ${encodeURIComponent(
    getFullName.value
  )}&background=6366f1&color=fff`;
});

// Загрузка данных профиля
const fetchProfile = async () => {
  try {
    loading.value = true;
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
      id: data.id,
      name: data.name || '',
      surname: data.surname || '',
      patronymic: data.patronymic || '',
      email: data.email || '',
      phone: data.phone || '',
      avatar: data.avatar || '',
    };
    originalData.value = { ...profileData.value };
  } catch (error) {
    toaster.value.addToast(
      'Ошибка загрузки профиля: ' + error.message,
      'error'
    );
    console.error('Ошибка загрузки профиля:', error);
  } finally {
    loading.value = false;
  }
};

// Сохранение изменений профиля
const saveProfile = async () => {
  try {
    loading.value = true;
    const response = await fetch('https://igor-plaxin.ru/star-way/profile ', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({
        name: profileData.value.name,
        surname: profileData.value.surname,
        patronymic: profileData.value.patronymic,
        email: profileData.value.email,
        phone: profileData.value.phone,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка сохранения изменений');
    }

    const updated = await response.json();
    profileData.value = { ...updated };
    originalData.value = { ...updated };
    toaster.value.addToast('Профиль успешно обновлен', 'success');
  } catch (error) {
    toaster.value.addToast('Ошибка сохранения: ' + error.message, 'error');
    console.error('Ошибка сохранения профиля:', error);
  } finally {
    loading.value = false;
  }
};

// Сброс формы
const resetForm = () => {
  profileData.value = { ...originalData.value };
};

// Открытие модального окна изменения пароля
const openChangePasswordModal = () => {
  showPasswordModal.value = true;
  passwordForm.value = {
    current: '',
    new: '',
    confirm: '',
  };
};

// Закрытие модального окна изменения пароля
const closePasswordModal = () => {
  showPasswordModal.value = false;
  passwordForm.value = {
    current: '',
    new: '',
    confirm: '',
  };
};

// Изменение пароля
const changePassword = async () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    toaster.value.addToast('Пароли не совпадают', 'error');
    return;
  }

  try {
    const response = await fetch(
      'https://igor-plaxin.ru/star-way/profile/password ',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          current_password: passwordForm.value.current,
          new_password: passwordForm.value.new,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Ошибка изменения пароля');
    }

    toaster.value.addToast('Пароль успешно изменен', 'success');
    closePasswordModal();
  } catch (error) {
    toaster.value.addToast(
      'Ошибка изменения пароля: ' + error.message,
      'error'
    );
    console.error('Ошибка изменения пароля:', error);
  }
};

// Подтверждение удаления аккаунта
const confirmDeleteAccount = () => {
  showDeleteModal.value = true;
};

// Закрытие модального окна удаления
const closeDeleteModal = () => {
  showDeleteModal.value = false;
};

// Удаление аккаунта
const deleteAccount = async () => {
  try {
    const response = await fetch('https://igor-plaxin.ru/star-way/profile ', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка удаления аккаунта');
    }

    toaster.value.addToast('Аккаунт успешно удален', 'success');
    localStorage.removeItem('access_token');
    router.push('/login');
  } catch (error) {
    toaster.value.addToast(
      'Ошибка удаления аккаунта: ' + error.message,
      'error'
    );
    console.error('Ошибка удаления аккаунта:', error);
  } finally {
    closeDeleteModal();
  }
};

// Обновление аватара
const updateAvatar = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Проверка формата файла
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    toaster.value.addToast(
      'Пожалуйста, выберите изображение (JPEG, PNG или GIF)',
      'error'
    );
    return;
  }

  // Проверка размера файла (максимум 5MB)
  if (file.size > 5 * 1024 * 1024) {
    toaster.value.addToast('Размер файла не должен превышать 5MB', 'error');
    return;
  }

  // Здесь должна быть логика загрузки аватара
  toaster.value.addToast(
    'Функция загрузки аватара временно недоступна',
    'warning'
  );
  console.warn('Функция загрузки аватара не реализована');
};

// Загрузка данных при монтировании
onMounted(() => {
  fetchProfile();
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
