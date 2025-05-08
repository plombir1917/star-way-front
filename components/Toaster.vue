<template>
  <div
    class="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
    aria-live="polite"
  >
    <TransitionGroup
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-full opacity-0"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center p-4 rounded-lg shadow-lg min-w-[300px] max-w-md"
        :class="{
          'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200':
            toast.type === 'error',
          'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-200':
            toast.type === 'success',
          'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200':
            toast.type === 'info',
        }"
      >
        <!-- Иконка -->
        <div class="flex-shrink-0">
          <svg
            v-if="toast.type === 'error'"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else-if="toast.type === 'success'"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <!-- Сообщение -->
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium">{{ toast.message }}</p>
        </div>

        <!-- Кнопка закрытия -->
        <button
          @click="removeToast(toast.id)"
          class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const toasts = ref([]);
let nextId = 1;

// Функция для добавления нового уведомления
const addToast = (message, type = 'info', duration = 5000) => {
  const id = nextId++;
  toasts.value.push({ id, message, type });

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
};

// Функция для удаления уведомления
const removeToast = (id) => {
  const index = toasts.value.findIndex((t) => t.id === id);
  if (index !== -1) {
    toasts.value.splice(index, 1);
  }
};

// Экспортируем функции для использования в других компонентах
defineExpose({
  addToast,
  removeToast,
});
</script>

<style scoped>
/* Анимации для уведомлений */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Стили для мобильной версии */
@media (max-width: 640px) {
  .fixed {
    padding: 1rem;
  }
}
</style>
