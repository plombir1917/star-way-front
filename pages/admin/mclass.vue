<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Toaster -->
    <Toaster ref="toaster" />

    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Мастер-классы
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Здесь вы можете управлять мастер-классами
      </p>
    </div>

    <!-- Основной контент -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <!-- Форма добавления -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Добавить мастер-класс
        </h2>
        <form @submit.prevent="saveMClass" class="space-y-4">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Название</label
            >
            <input
              type="text"
              id="name"
              v-model="mclassForm.name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
              required
            />
          </div>
          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Описание</label
            >
            <textarea
              id="description"
              v-model="mclassForm.description"
              rows="3"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
            ></textarea>
          </div>
          <div>
            <label
              for="cost"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Стоимость (руб.)</label
            >
            <input
              type="number"
              id="cost"
              v-model.number="mclassForm.cost"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
              required
            />
          </div>
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{ isEditing ? 'Сохранить изменения' : 'Добавить мастер-класс' }}
          </button>
        </form>
      </div>

      <!-- Поиск -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div class="relative">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск по названию или описанию"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200"
            @input="filterMClasses"
          />
        </div>
      </div>

      <!-- Сетка мастер-классов -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
        ></div>
      </div>

      <div v-else-if="filteredMClasses.length === 0" class="text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
          Нет мастер-классов
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Попробуйте добавить новый мастер-класс.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="mclass in paginatedMClasses"
          :key="mclass.id"
          class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="p-6">
            <h3
              class="text-lg font-medium text-gray-900 dark:text-white mb-2 truncate"
            >
              {{ mclass.name }}
            </h3>
            <p
              class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3"
            >
              {{ mclass.description }}
            </p>
            <div class="flex justify-between items-center">
              <span
                class="text-lg font-bold text-purple-600 dark:text-purple-400"
              >
                {{ formatCost(mclass.cost) }}
              </span>
              <div class="flex space-x-2">
                <button
                  @click="editMClass(mclass)"
                  class="p-2 text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 rounded-full hover:bg-purple-50 dark:hover:bg-gray-600 transition duration-200"
                  aria-label="Редактировать"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteMClass(mclass)"
                  class="p-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-gray-600 transition duration-200"
                  aria-label="Удалить"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Пагинация -->
      <div
        v-if="filteredMClasses.length > 0"
        class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 mt-6"
      >
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Показано
              <span class="font-medium">{{ paginationStart }}</span>
              -
              <span class="font-medium">{{ paginationEnd }}</span>
              из
              <span class="font-medium">{{ filteredMClasses.length }}</span>
              результатов
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                <span class="sr-only">Предыдущая</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="page in displayedPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  page === currentPage
                    ? 'z-10 bg-purple-50 dark:bg-purple-900 border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-300'
                    : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition duration-200',
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                <span class="sr-only">Следующая</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 5.293a1 1 0 00-1.414 1.414L8.586 10 5.293 13.293a1 1 0 001.414 1.414l4-4a1 1 0 000-1.414l-4-4a1 1 0 00-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно удаления -->
    <div
      v-if="showDeleteModal"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeDeleteModal"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600 dark:text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  Удалить мастер-класс
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Вы уверены, что хотите удалить мастер-класс
                    <span class="font-medium">{{ mclassToDelete?.name }}</span
                    >? Это действие нельзя отменить.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              @click="deleteMClass"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-200"
            >
              Удалить
            </button>
            <button
              type="button"
              @click="closeDeleteModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-200"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
definePageMeta({
  layout: 'admin',
});

const toaster = ref(null);
const mclasses = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(9);
const showDeleteModal = ref(false);
const mclassToDelete = ref(null);
const loading = ref(true);

// Форма мастер-класса
const mclassForm = ref({
  id: null,
  name: '',
  description: '',
  cost: 0,
});
const isEditing = ref(false);

// Фильтрация и пагинация
const filteredMClasses = computed(() => {
  let result = [...mclasses.value];

  // Поиск по имени или описанию
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (mclass) =>
        mclass.name.toLowerCase().includes(query) ||
        mclass.description.toLowerCase().includes(query)
    );
  }

  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredMClasses.value.length / itemsPerPage.value)
);
const paginatedMClasses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredMClasses.value.slice(start, end);
});
const paginationStart = computed(() => {
  return filteredMClasses.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1;
});
const paginationEnd = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage.value,
    filteredMClasses.value.length
  );
});
const displayedPages = computed(() => {
  const pages = [];
  const maxDisplayed = 5;
  if (totalPages.value <= maxDisplayed) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    let start = Math.max(1, currentPage.value - Math.floor(maxDisplayed / 2));
    let end = Math.min(totalPages.value, start + maxDisplayed - 1);
    if (end - start + 1 < maxDisplayed) {
      start = Math.max(1, end - maxDisplayed + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  return pages;
});

// Форматирование стоимости
const formatCost = (cost) => {
  return cost.toLocaleString('ru-RU') + ' ₽';
};

// Загрузка данных
const fetchMClasses = async () => {
  try {
    loading.value = true;
    const response = await fetch('https://igor-plaxin.store/star-way/mclass ', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки мастер-классов');
    }

    const data = await response.json();
    mclasses.value = data.map((mclass) => ({
      id: mclass.id,
      name: mclass.name || '',
      description: mclass.description || '',
      cost: mclass.cost || 0,
    }));
  } catch (error) {
    toaster.value.addToast(
      'Ошибка загрузки мастер-классов: ' + error.message,
      'error'
    );
  } finally {
    loading.value = false;
  }
};

// Сохранение мастер-класса
const saveMClass = async () => {
  try {
    const url = isEditing.value
      ? `https://igor-plaxin.store/star-way/mclass/ ${mclassForm.value.id}`
      : 'https://igor-plaxin.store/star-way/mclass ';
    const method = isEditing.value ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(mclassForm.value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || 'Ошибка при сохранении мастер-класса'
      );
    }

    const updatedClass = await response.json();

    if (isEditing.value) {
      const index = mclasses.value.findIndex((m) => m.id === updatedClass.id);
      if (index !== -1) {
        mclasses.value[index] = updatedClass;
      }
      toaster.value.addToast('Мастер-класс успешно обновлен', 'success');
    } else {
      mclasses.value.push(updatedClass);
      toaster.value.addToast('Мастер-класс успешно добавлен', 'success');
    }

    resetForm();
  } catch (error) {
    toaster.value.addToast(
      'Ошибка при сохранении мастер-класса: ' + error.message,
      'error'
    );
  }
};

// Редактирование
const editMClass = (mclass) => {
  isEditing.value = true;
  mclassForm.value = { ...mclass };
};

// Подтверждение удаления
const confirmDeleteMClass = (mclass) => {
  mclassToDelete.value = mclass;
  showDeleteModal.value = true;
};

// Удаление мастер-класса
const deleteMClass = async () => {
  try {
    const url = `https://igor-plaxin.store/star-way/mclass/ ${mclassToDelete.value.id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при удалении мастер-класса');
    }

    mclasses.value = mclasses.value.filter(
      (m) => m.id !== mclassToDelete.value.id
    );
    toaster.value.addToast('Мастер-класс удален', 'success');
    closeDeleteModal();
  } catch (error) {
    toaster.value.addToast(
      'Ошибка при удалении мастер-класса: ' + error.message,
      'error'
    );
  }
};

// Пагинация
const goToPage = (page) => {
  currentPage.value = page;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Сброс формы
const resetForm = () => {
  mclassForm.value = {
    id: null,
    name: '',
    description: '',
    cost: 0,
  };
  isEditing.value = false;
};

// Закрытие модальных окон
const closeDeleteModal = () => {
  showDeleteModal.value = false;
  mclassToDelete.value = null;
};

// Загрузка данных при монтировании
onMounted(() => {
  fetchMClasses();
});
</script>
