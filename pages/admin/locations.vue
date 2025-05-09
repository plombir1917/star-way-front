<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Toaster ref="toaster" />
    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Управление площадками
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Здесь вы можете управлять площадками системы
      </p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <!-- Заголовок и кнопка добавления -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
            Площадки
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Управление площадками системы
          </p>
        </div>
        <button
          @click="openCreateModal"
          class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
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
          Добавить площадку
        </button>
      </div>
      <!-- Таблица площадок -->
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Название
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Адрес
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Город
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Страна
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <tr
                v-if="!locations.length"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td
                  colspan="5"
                  class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Загрузка площадок...
                </td>
              </tr>
              <tr
                v-else-if="locations.length === 0"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td
                  colspan="5"
                  class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Площадки не найдены
                </td>
              </tr>
              <tr
                v-for="location in locations"
                :key="location.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-200 font-medium"
                >
                  {{ location.id }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-200 font-medium"
                >
                  {{ location.name }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-200"
                >
                  {{ location.address }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-200"
                >
                  {{ location.city }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-200"
                >
                  {{ location.country }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-base font-medium flex gap-2 justify-end"
                >
                  <button
                    @click="editLocation(location)"
                    class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 transition duration-200"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteLocation(location.id)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition duration-200"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
                    isEditing ? 'Редактировать площадку' : 'Добавить площадку'
                  }}
                </h3>
                <div class="mt-4">
                  <form @submit.prevent="saveLocation" class="space-y-4">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                          >Адрес</label
                        >
                        <input
                          type="text"
                          v-model="formData.address"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Город</label
                        >
                        <input
                          type="text"
                          v-model="formData.city"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Страна</label
                        >
                        <input
                          type="text"
                          v-model="formData.country"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                          required
                        />
                      </div>
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
              @click="saveLocation"
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

definePageMeta({
  layout: 'admin',
});

const toaster = ref(null);
const locations = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const formData = ref({
  id: '',
  name: '',
  address: '',
  city: '',
  country: '',
});

// Загрузка площадок
const fetchLocations = async () => {
  try {
    const response = await fetch('https://igor-plaxin.ru/star-way/location', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) throw new Error('Ошибка при загрузке площадок');
    locations.value = await response.json();
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при загрузке площадок: ' + error.message,
      'error'
    );
  }
};

// Открытие модального окна для создания
const openCreateModal = () => {
  isEditing.value = false;
  formData.value = {
    name: '',
    address: '',
    city: '',
    country: '',
  };
  showModal.value = true;
};

// Открытие модального окна для редактирования
const editLocation = (location) => {
  isEditing.value = true;
  formData.value = {
    id: location.id,
    name: location.name || '',
    address: location.address || '',
    city: location.city || '',
    country: location.country || '',
  };
  showModal.value = true;
};

// Закрытие модального окна
const closeModal = () => {
  showModal.value = false;
  formData.value = {
    name: '',
    address: '',
    city: '',
    country: '',
  };
};

// Сохранение площадки
const saveLocation = async () => {
  try {
    const url = isEditing.value
      ? `https://igor-plaxin.ru/star-way/location/${formData.value.id}`
      : 'https://igor-plaxin.ru/star-way/location';

    const method = isEditing.value ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(formData.value),
    });

    if (!response.ok) throw new Error('Ошибка при сохранении площадки');

    await fetchLocations();
    closeModal();
    toaster.value?.addToast(
      isEditing.value
        ? 'Площадка успешно обновлена'
        : 'Площадка успешно создана',
      'success'
    );
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при сохранении площадки: ' + error.message,
      'error'
    );
  }
};

// Удаление площадки
const deleteLocation = async (id) => {
  if (!confirm('Вы уверены, что хотите удалить эту площадку?')) return;

  try {
    const response = await fetch(
      `https://igor-plaxin.ru/star-way/location/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );

    if (!response.ok) throw new Error('Ошибка при удалении площадки');

    await fetchLocations();
    toaster.value?.addToast('Площадка успешно удалена', 'success');
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при удалении площадки: ' + error.message,
      'error'
    );
  }
};

onMounted(() => {
  fetchLocations();
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.animate-modal-pop {
  animation: modal-pop 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes modal-pop {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
