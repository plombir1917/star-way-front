<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
  >
    <span v-if="isDarkMode">☀️</span>
    <span v-else>🌙</span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Состояние темы
const isDarkMode = ref(false);

// Функция для переключения темы
function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  applyTheme();
}

// Применение темы
function applyTheme() {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark'); // Сохраняем тему в localStorage
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light'); // Сохраняем тему в localStorage
  }
}

// Загрузка темы при монтировании компонента
onMounted(() => {
  const savedTheme = localStorage.getItem('theme'); // Получаем сохраненную тему
  if (savedTheme === 'dark') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>
