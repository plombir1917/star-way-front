<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <span v-if="isDark" class="text-gray-200">🌙</span>
    <span v-else class="text-gray-800">☀️</span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

// Функция для переключения темы
const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// При загрузке страницы проверяем сохранённую тему
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>
