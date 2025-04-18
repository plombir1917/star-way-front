<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <!-- Кнопка "На главную" -->
    <NuxtLink
      to="/"
      class="absolute top-4 left-4 px-3 py-1.5 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 flex items-center text-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      На главную
    </NuxtLink>

    <!-- Container for Form and Image -->
    <div
      class="flex w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <!-- Left Side: Image -->
      <div class="w-1/2 relative">
        <img
          src="/assets/image/starway.png"
          alt="Auth Image"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-purple-600 bg-opacity-30"></div>
        <!-- Overlay -->
      </div>

      <!-- Right Side: Form -->
      <div class="w-1/2 p-8 space-y-6">
        <!-- Header -->
        <h2
          class="text-2xl font-bold text-center text-gray-800 dark:text-gray-200"
        >
          Регистрация
        </h2>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name Field -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Имя
            </label>
            <input
              v-model="formData.name"
              id="name"
              type="text"
              placeholder="Введите ваше имя"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <!-- Surname Field -->
          <div>
            <label
              for="surname"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Фамилия
            </label>
            <input
              v-model="formData.surname"
              id="surname"
              type="text"
              placeholder="Введите вашу фамилию"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              v-model="formData.email"
              id="email"
              type="email"
              placeholder="Введите ваш email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Пароль
            </label>
            <input
              v-model="formData.password"
              id="password"
              type="password"
              placeholder="Введите пароль"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label
              for="confirm-password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Подтвердите пароль
            </label>
            <input
              v-model="confirmPassword"
              id="confirm-password"
              type="password"
              placeholder="Подтвердите пароль"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Загрузка...</span>
            <span v-else>Зарегистрироваться</span>
          </button>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {{ errorMessage }}
          </div>
        </form>

        <!-- Login Link -->
        <p class="text-center text-sm text-gray-600 dark:text-gray-400">
          Уже есть аккаунт?
          <NuxtLink
            to="/login"
            class="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Войти
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const confirmPassword = ref('');
const formData = ref({
  name: '',
  surname: '',
  email: '',
  password: '',
});

const errorMessage = ref('');
const isLoading = ref(false);

// Обработчик регистрации
async function handleRegister() {
  try {
    // Проверка совпадения паролей
    if (formData.value.password !== confirmPassword.value) {
      errorMessage.value = 'Пароли не совпадают';
      return;
    }

    isLoading.value = true;
    errorMessage.value = '';

    // Создаем объект с данными в формате, который ожидает бэкенд
    const registerData = {
      name: formData.value.name,
      surname: formData.value.surname,
      email: formData.value.email,
      password: formData.value.password,
    };

    const response = await fetch(
      'https://star-way-service.onrender.com/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(registerData),
      }
    );

    if (!response.ok) {
      throw new Error(data.message || `Ошибка сервера: ${response.status}`);
    }

    // Успешная регистрация
    router.push('/login');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>
