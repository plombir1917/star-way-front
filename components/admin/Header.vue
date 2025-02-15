<template>
  <header class="bg-white shadow-sm dark:bg-gray-800">
    <div
      class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <!-- Левая часть: Заголовок -->
      <div class="flex items-center space-x-4">
        <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Административная панель
        </h1>

        <!-- Поиск -->
        <div class="relative hidden md:block">
          <input
            type="text"
            placeholder="Поиск..."
            class="w-48 pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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

      <!-- Правая часть: Управление темой, уведомления и профиль -->
      <div class="flex items-center space-x-4">
        <!-- Уведомления -->
        <button
          class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.841A6.002 6.002 0 006 11v3.159a2.032 2.032 0 01-1.405 1.855L9 17h6z"
            />
          </svg>
          <span
            class="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full"
          >
            3
          </span>
        </button>

        <!-- Переключатель темы -->
        <ThemeToggle />

        <!-- Профиль пользователя -->
        <div class="relative">
          <button
            @click="isProfileMenuOpen = !isProfileMenuOpen"
            class="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              class="w-8 h-8 rounded-full object-cover"
            />
            <span class="hidden md:block text-gray-800 dark:text-gray-200"
              >Имя Фамилия</span
            >
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
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-10"
            >
              <ul class="py-1">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Профиль
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Настройки
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    class="block px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Выйти
                  </a>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import ThemeToggle from './ThemeToggle.vue';

const isProfileMenuOpen = ref(false);
</script>
