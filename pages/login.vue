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
          Вход
        </h2>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
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

          <!-- Remember Me and Forgot Password -->
          <div class="flex justify-between items-center">
            <div>
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 dark:border-gray-700 text-purple-600 focus:ring-purple-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300"
                  >Запомнить меня</span
                >
              </label>
            </div>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Загрузка...</span>
            <span v-else>Войти</span>
          </button>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {{ errorMessage }}
          </div>
        </form>

        <!-- Register Link -->
        <p class="text-center text-sm text-gray-600 dark:text-gray-400">
          Нет аккаунта?
          <NuxtLink
            to="/register"
            class="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Зарегистрироваться
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { navigateTo } from '#app';

const formData = ref({
  email: '',
  password: '',
});

const errorMessage = ref('');
const isLoading = ref(false);

// Обработчик входа
async function handleLogin() {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    const response = await fetch(
      'https://star-way-service.onrender.com/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData.value),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Ошибка сервера: ${response.status}`);
    }
    console.log(data);

    // Сохраняем токен
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      console.log('Токен успешно сохранен');
    } else {
      throw new Error('Токен не получен от сервера');
    }

    // Успешный вход
    navigateTo('/admin');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>
