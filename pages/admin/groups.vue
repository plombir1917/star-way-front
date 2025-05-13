<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Toaster ref="toaster" />
    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Коллективы
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Управление коллективами системы
      </p>
    </div>
    <!-- Поиск и кнопка в одной строке -->
    <div class="flex items-center justify-between gap-4 mb-6 flex-wrap">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по названию..."
        class="flex-1 min-w-[180px] max-w-sm px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition duration-200"
      />
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
      >
        <svg
          class="h-5 w-5 mr-2"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Добавить коллектив
      </button>
    </div>
    <!-- Карточки коллективов -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="group in filteredGroups"
        :key="group.id"
        class="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
      >
        <!-- Изображение с оверлеем -->
        <div class="relative h-36 overflow-hidden">
          <img
            :src="group.image || '/group-default.png'"
            alt="Group Image"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
        </div>

        <!-- Контент -->
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <h2
              class="text-base font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 break-words pr-2"
            >
              {{ group.name }}
            </h2>
            <span
              class="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full"
            >
              {{ group.id }}
            </span>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {{ group.description }}
          </p>

          <div class="space-y-1.5 mb-4">
            <div
              class="flex items-center text-xs text-gray-500 dark:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 mr-1.5 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ group.homeland }}
            </div>
            <div
              class="flex items-center text-xs text-gray-500 dark:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 mr-1.5 text-purple-500"
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
              ID: {{ group.user_id }}
            </div>
          </div>

          <!-- Кнопки действий -->
          <div
            class="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-700"
          >
            <button
              @click="editGroup(group)"
              class="p-1.5 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200"
              aria-label="Редактировать"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              @click="deleteGroup(group.id)"
              class="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
              aria-label="Удалить"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
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

      <div
        v-if="filteredGroups.length === 0"
        class="col-span-full text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p class="text-gray-500 dark:text-gray-400">Нет коллективов</p>
      </div>
    </div>
    <!-- Модальное окно -->
    <div
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeModal"
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
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  {{
                    isEditing ? 'Редактировать коллектив' : 'Добавить коллектив'
                  }}
                </h3>
                <div class="mt-4">
                  <form @submit.prevent="saveGroup" class="space-y-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Название</label
                      >
                      <input
                        type="text"
                        v-model="formData.name"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Описание</label
                      >
                      <textarea
                        v-model="formData.description"
                        rows="2"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Страна</label
                      >
                      <input
                        type="text"
                        v-model="formData.homeland"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >ID пользователя</label
                      >
                      <input
                        type="number"
                        v-model="formData.user_id"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="button"
              @click="saveGroup"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-200"
            >
              {{ isEditing ? 'Сохранить' : 'Добавить' }}
            </button>
            <button
              type="button"
              @click="closeModal"
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
import { ref, onMounted } from 'vue';
import Toaster from '~/components/Toaster.vue';

definePageMeta({ layout: 'admin' });

const toaster = ref(null);
const groups = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const formData = ref({
  id: '',
  name: '',
  description: '',
  homeland: '',
  user_id: '',
});
const searchQuery = ref('');

const fetchGroups = async () => {
  try {
    const response = await fetch('https://igor-plaxin.ru/star-way/group', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) throw new Error('Ошибка при загрузке коллективов');
    groups.value = await response.json();
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при загрузке коллективов: ' + error.message,
      'error'
    );
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  formData.value = {
    id: '',
    name: '',
    description: '',
    homeland: '',
    user_id: '',
  };
  showModal.value = true;
};

const editGroup = (group) => {
  isEditing.value = true;
  formData.value = {
    id: group.id,
    name: group.name || '',
    description: group.description || '',
    homeland: group.homeland || '',
    user_id: group.user_id || '',
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  formData.value = {
    id: '',
    name: '',
    description: '',
    homeland: '',
    user_id: '',
  };
};

const saveGroup = async () => {
  try {
    const url = isEditing.value
      ? `https://igor-plaxin.ru/star-way/group/${formData.value.id}`
      : 'https://igor-plaxin.ru/star-way/group';
    const method = isEditing.value ? 'PATCH' : 'POST';
    const payload = { ...formData.value };
    if (!isEditing.value) delete payload.id;
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Ошибка при сохранении коллектива');
    await fetchGroups();
    closeModal();
    toaster.value?.addToast(
      isEditing.value
        ? 'Коллектив успешно обновлён'
        : 'Коллектив успешно создан',
      'success'
    );
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при сохранении коллектива: ' + error.message,
      'error'
    );
  }
};

const deleteGroup = async (id) => {
  if (!confirm('Вы уверены, что хотите удалить этот коллектив?')) return;
  try {
    const response = await fetch(
      `https://igor-plaxin.ru/star-way/group/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    if (!response.ok) throw new Error('Ошибка при удалении коллектива');
    await fetchGroups();
    toaster.value?.addToast('Коллектив успешно удалён', 'success');
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при удалении коллектива: ' + error.message,
      'error'
    );
  }
};

const filteredGroups = computed(() => {
  return groups.value.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  fetchGroups();
});
</script>
