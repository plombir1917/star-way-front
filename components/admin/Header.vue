<template>
  <header class="bg-white shadow-sm dark:bg-gray-800">
    <div
      class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Административная панель
      </h1>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from './ThemeToggle.vue';
</script>
