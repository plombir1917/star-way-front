<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
    aria-label="Переключить тему"
  >
    <div class="relative w-6 h-6">
      <!-- Солнце (светлая тема) -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-yellow-500 absolute transition-all duration-300"
        :class="{
          'opacity-0 rotate-90 scale-0': isDarkMode,
          'opacity-100 rotate-0 scale-100': !isDarkMode,
        }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      <!-- Луна (темная тема) -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-purple-400 absolute transition-all duration-300"
        :class="{
          'opacity-100 -rotate-90 scale-100': isDarkMode,
          'opacity-0 rotate-90 scale-0': !isDarkMode,
        }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Состояние темы
const isDarkMode = ref(false);

// Функция для переключения темы
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  updateTheme();
};

// Функция для обновления темы
const updateTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// Загрузка темы при монтировании компонента
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  isDarkMode.value = savedTheme === 'dark' || (!savedTheme && prefersDark);
  updateTheme();

  // Слушаем изменения системной темы
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        isDarkMode.value = e.matches;
        updateTheme();
      }
    });
});

// Следим за изменениями темы
watch(isDarkMode, () => {
  updateTheme();
});
</script>
