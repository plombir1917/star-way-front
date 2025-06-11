<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Toaster ref="toaster" />
    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Управление заявками
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Здесь вы можете управлять заявками на участие в фестивалях
      </p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <!-- Кнопка создания -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Заявки</h1>
        <button
          @click="openCreateModal"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
        >
          <svg
            class="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Создать заявку
        </button>
      </div>
      <!-- Таблица -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
                Описание
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Событие
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Статус
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
            <tr v-if="!requests.length">
              <td
                colspan="6"
                class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Загрузка заявок...
              </td>
            </tr>
            <tr v-else-if="requests.length === 0">
              <td
                colspan="6"
                class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Заявки не найдены
              </td>
            </tr>
            <tr
              v-for="request in requests"
              :key="request.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-200 font-medium"
              >
                {{ request.id }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-200 font-medium"
              >
                {{ request.name }}
              </td>
              <td
                class="px-6 py-4 max-w-xs truncate text-base text-gray-900 dark:text-gray-200"
              >
                {{ request.description }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-base text-gray-900 dark:text-gray-200"
              >
                {{ request.event_id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100':
                      request.status === 'ACCEPTED',
                    'inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100':
                      request.status === 'SEND',
                    'inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100':
                      request.status === 'REJECTED',
                  }"
                >
                  {{ statusLabel(request.status) }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-base font-medium flex gap-2 justify-end"
                v-if="canEdit"
              >
                <button
                  @click="openEditModal(request)"
                  class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 transition duration-200"
                  :disabled="!canEdit"
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
                <!-- Кнопка удаления -->
                <button
                  @click="deleteRequest(request.id)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition duration-200"
                  title="Удалить"
                  :disabled="!canEdit"
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
              </td>
            </tr>
          </tbody>
        </table>
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
          class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 transition-opacity"
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
                  {{ isEditing ? 'Редактировать заявку' : 'Создать заявку' }}
                </h3>
                <div class="mt-4">
                  <form @submit.prevent="saveRequest" class="space-y-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Название</label
                      >
                      <input
                        type="text"
                        v-model="formData.name"
                        required
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                      />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Описание</label
                      >
                      <textarea
                        v-model="formData.description"
                        rows="4"
                        required
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                      ></textarea>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Мероприятие</label
                      >
                      <select
                        v-model.number="formData.event_id"
                        required
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                      >
                        <option value="" disabled>Выберите мероприятие</option>
                        <option
                          v-for="event in events"
                          :key="event.id"
                          :value="event.id"
                        >
                          {{ event.id }} — {{ event.name }}
                        </option>
                      </select>
                    </div>

                    <!-- Поле для изменения статуса (только при редактировании) -->
                    <div v-if="isEditing">
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Статус</label
                      >
                      <select
                        v-model="formData.status"
                        required
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                      >
                        <option value="SEND">В ожидании</option>
                        <option value="ACCEPTED">Одобрено</option>
                        <option value="REJECTED">Отклонено</option>
                      </select>
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
              @click="saveRequest"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-200"
            >
              {{ isEditing ? 'Сохранить' : 'Создать' }}
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
import { ref, onMounted, computed } from 'vue';
import Toaster from '~/components/Toaster.vue';
definePageMeta({
  layout: 'admin',
});
const toaster = ref(null);
const showModal = ref(false);
const isEditing = ref(false);
const requests = ref([]);
const events = ref([]);
const formData = ref({
  name: '',
  description: '',
  event_id: null,
  status: null,
});
const userRole = ref(null); // Хранение роли пользователя

// Функция для получения роли пользователя
const fetchUserRole = async () => {
  try {
    const response = await fetch(
      'https://igor-plaxin.store/star-way/token-payload ',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    if (!response.ok) throw new Error('Ошибка получения данных пользователя');
    const data = await response.json();
    userRole.value = data.role;
  } catch (error) {
    console.error('Ошибка получения роли:', error);
    userRole.value = null;
  }
};

// Получение заявок
const fetchRequests = async () => {
  try {
    const response = await fetch(
      'https://igor-plaxin.store/star-way/request ',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    if (!response.ok) throw new Error('Ошибка при загрузке заявок');
    requests.value = await response.json();
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при загрузке заявок: ' + error.message,
      'error'
    );
  }
};

// Получение мероприятий
const fetchEvents = async () => {
  try {
    const response = await fetch('https://igor-plaxin.store/star-way/event ', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) throw new Error('Ошибка при загрузке мероприятий');
    events.value = await response.json();
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при загрузке мероприятий: ' + error.message,
      'error'
    );
  }
};

// Вычисляемое свойство для проверки возможности редактирования
const canEdit = computed(() => {
  return ['ADMIN', 'MODERATOR'].includes(userRole.value);
});

// Открытие формы создания
const openCreateModal = () => {
  isEditing.value = false;
  formData.value = {
    name: '',
    description: '',
    event_id: null,
  };
  showModal.value = true;
};

// Открытие формы редактирования
const openEditModal = (request) => {
  isEditing.value = true;
  formData.value = { ...request };
  showModal.value = true;
};

// Закрытие модального окна
const closeModal = () => {
  showModal.value = false;
  formData.value = {
    name: '',
    description: '',
    event_id: null,
    status: null,
  };
};

// Сохранение заявки (создание или обновление)
const saveRequest = async () => {
  try {
    const url = isEditing.value
      ? `https://igor-plaxin.store/star-way/request/${formData.value.id}`
      : 'https://igor-plaxin.store/star-way/request';
    const method = isEditing.value ? 'PATCH' : 'POST';

    // Для новой заявки устанавливаем статус по умолчанию
    const requestData = { ...formData.value };
    if (!isEditing.value) {
      requestData.status = 'SEND'; // Устанавливаем статус по умолчанию
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) throw new Error('Ошибка при сохранении заявки');
    await fetchRequests();
    closeModal();
    toaster.value?.addToast(
      isEditing.value ? 'Заявка успешно обновлена' : 'Заявка успешно создана',
      'success'
    );
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при сохранении заявки: ' + error.message,
      'error'
    );
  }
};

// Удаление заявки
const deleteRequest = async (id) => {
  if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return;
  try {
    const response = await fetch(
      `https://igor-plaxin.store/star-way/request/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    if (!response.ok) throw new Error('Ошибка при удалении заявки');
    // Обновляем список заявок
    await fetchRequests();
    toaster.value?.addToast('Заявка успешно удалена', 'success');
  } catch (error) {
    toaster.value?.addToast(
      'Ошибка при удалении заявки: ' + error.message,
      'error'
    );
  }
};

// Преобразование статуса в человекочитаемый вид
const statusLabel = (status) => {
  switch (status) {
    case 'SEND':
      return 'В ожидании';
    case 'ACCEPTED':
      return 'Одобрено';
    case 'REJECTED':
      return 'Отклонено';
    default:
      return status;
  }
};

onMounted(() => {
  fetchUserRole();
  fetchRequests();
  fetchEvents();
});
</script>
