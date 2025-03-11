<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
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
            <NuxtLink
              to="/forgot-password"
              class="text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Забыли пароль?
            </NuxtLink>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Войти
          </button>
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
import { navigateTo } from '#app';

// Обработчик входа
function handleLogin() {
  // Логика входа (например, отправка данных на сервер)
  console.log('Вход...');

  // Перенаправление на страницу /admin после успешного входа
  navigateTo('/admin');
}
</script>
