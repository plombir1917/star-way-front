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
              id="name"
              type="text"
              placeholder="Введите ваше имя"
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

          <!-- Confirm Password Field -->
          <div>
            <label
              for="confirm-password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Подтвердите пароль
            </label>
            <input
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
            class="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Зарегистрироваться
          </button>
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
// Обработчик регистрации
function handleRegister() {
  // Логика регистрации (например, отправка данных на сервер)
  console.log('Регистрация...');
}
</script>
