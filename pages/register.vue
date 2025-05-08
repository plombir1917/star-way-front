<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4"
  >
    <!-- Кнопка "На главную" -->
    <NuxtLink
      to="/"
      class="absolute top-4 left-4 px-3 py-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-md hover:bg-white dark:hover:bg-gray-800 transition duration-200 flex items-center text-sm shadow-sm"
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
      class="flex w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
    >
      <!-- Left Side: Image -->
      <div class="hidden md:block w-1/2 relative">
        <img
          src="/assets/image/starway.png"
          alt="Register Image"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30"
        ></div>
      </div>

      <!-- Right Side: Form -->
      <div class="w-full md:w-1/2 p-6 sm:p-8 space-y-6">
        <!-- Header -->
        <div class="text-center">
          <h2
            class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200"
          >
            Создание аккаунта
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Заполните форму для регистрации
          </p>
        </div>

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
            <div class="mt-1 relative">
              <input
                v-model="formData.name"
                id="name"
                type="text"
                placeholder="Введите ваше имя"
                required
                class="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition duration-200"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Surname Field -->
          <div>
            <label
              for="surname"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Фамилия
            </label>
            <div class="mt-1 relative">
              <input
                v-model="formData.surname"
                id="surname"
                type="text"
                placeholder="Введите вашу фамилию"
                required
                class="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition duration-200"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div class="mt-1 relative">
              <input
                v-model="formData.email"
                id="email"
                type="email"
                placeholder="Введите ваш email"
                required
                class="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition duration-200"
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Пароль
            </label>
            <div class="mt-1 relative">
              <input
                v-model="formData.password"
                id="password"
                type="password"
                placeholder="Введите пароль"
                required
                class="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition duration-200"
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Password Confirmation Field -->
          <div>
            <label
              for="password_confirmation"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Подтверждение пароля
            </label>
            <div class="mt-1 relative">
              <input
                v-model="formData.password_confirmation"
                id="password_confirmation"
                type="password"
                placeholder="Подтвердите пароль"
                required
                class="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition duration-200"
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Загрузка...
            </span>
            <span v-else>Зарегистрироваться</span>
          </button>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
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
import { navigateTo } from '#app';

const formData = ref({
  name: '',
  surname: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const errorMessage = ref('');
const isLoading = ref(false);

// Обработчик регистрации
async function handleRegister() {
  try {
    isLoading.value = true;
    errorMessage.value = '';

    const response = await fetch('http://37.233.81.42/star-way/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Ошибка сервера: ${response.status}`);
    }

    // Успешная регистрация
    navigateTo('/login');
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* Анимации для формы */
.form-enter-active,
.form-leave-active {
  transition: opacity 0.3s ease;
}

.form-enter-from,
.form-leave-to {
  opacity: 0;
}

/* Стили для мобильной версии */
@media (max-width: 767px) {
  .container {
    padding: 1rem;
  }
}
</style>
