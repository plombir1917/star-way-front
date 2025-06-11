<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Toaster -->
    <Toaster ref="toaster" />

    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Управление участниками заявок
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Здесь вы можете управлять связями между участниками и заявками
      </p>
    </div>

    <!-- Основной контент -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <!-- Форма добавления -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Добавить участника к заявке
        </h2>
        <form @submit.prevent="addMemberToRequest" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Выбор заявки -->
            <div>
              <label
                for="request"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Заявка</label
              >
              <select
                id="request"
                v-model.number="newRelation.request_id"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-200"
                required
              >
                <option value="" disabled>Выберите заявку</option>
                <option
                  v-for="request in requests"
                  :key="request.id"
                  :value="request.id"
                >
                  {{ request.id }} — {{ request.name }}
                </option>
              </select>
            </div>

            <!-- Выбор участника -->
            <div
              v-if="
                userRole !== 'USER' ||
                (userRole === 'USER' && members.length > 0)
              "
            >
              <label
                for="member"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Участник</label
              >
              <select
                id="member"
                v-model.number="newRelation.member_id"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-200"
                required
              >
                <option value="" disabled>Выберите участника</option>
                <option
                  v-for="member in members"
                  :key="member.id"
                  :value="member.id"
                >
                  {{ member.id }} — {{ getFullName(member) }}
                </option>
              </select>
            </div>

            <!-- Сообщение для USER без участников -->
            <div v-else class="text-center py-4">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Нет доступных участников для добавления
              </p>
            </div>
          </div>

          <!-- Кнопка отправки -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="
                !newRelation.request_id ||
                !newRelation.member_id ||
                (userRole === 'USER' && members.length === 0)
              "
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Добавить связь
            </button>
          </div>
        </form>
      </div>

      <!-- Фильтры -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Поиск по ФИО -->
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
              placeholder="Поиск по ФИО участника"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200"
              @input="filterRelations"
            />
          </div>
          <!-- Фильтр по заявке -->
          <div>
            <select
              v-model="requestFilter"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-200"
              @change="filterRelations"
            >
              <option value="">Все заявки</option>
              <option
                v-for="request in requests"
                :key="request.id"
                :value="request.id"
              >
                {{ request.id }} — {{ request.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Сетка связей -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
        ></div>
      </div>

      <div v-else-if="filteredRelations.length === 0" class="text-center py-12">
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
          Нет связей
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Попробуйте добавить новую связь или изменить фильтры.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="relation in paginatedRelations"
          :key="relation.id"
          class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div
                class="flex-shrink-0 h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center"
              >
                <span class="text-xl font-bold text-purple-600">{{
                  relation.id
                }}</span>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ getMemberName(relation.member_id) }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Заявка: {{ getRequestName(relation.request_id) }}
                </p>
              </div>
            </div>

            <div v-if="userRole !== 'USER'" class="mt-6 flex justify-end">
              <button
                @click="confirmDeleteRelation(relation)"
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

      <!-- Пагинация -->
      <div
        v-if="filteredRelations.length > 0"
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
              <span class="font-medium">{{ filteredRelations.length }}</span>
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
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно подтверждения удаления -->
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
          class="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
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
                  Удалить связь
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Вы уверены, что хотите удалить связь участника
                    <span class="font-medium">{{
                      relationToDelete?.member_id
                    }}</span>
                    с заявкой
                    <span class="font-medium">{{
                      relationToDelete?.request_id
                    }}</span
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
              @click="deleteRelation"
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
definePageMeta({ layout: 'admin' });

const toaster = ref(null);
const relations = ref([]);
const requests = ref([]);
const members = ref([]);
const loading = ref(true);
const showDeleteModal = ref(false);
const relationToDelete = ref(null);

// Фильтры
const searchQuery = ref('');
const requestFilter = ref('');

// Пагинация
const currentPage = ref(1);
const itemsPerPage = ref(10);
const userRole = ref(null); // Хранение роли пользователя

// Форма для новой связи
const newRelation = ref({
  request_id: '',
  member_id: '',
});

// Функция получения роли
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

// Получение полного имени
const getFullName = (member) => {
  const parts = [member.surname, member.name];
  if (member.patronymic) parts.push(member.patronymic);
  return parts.filter(Boolean).join(' ');
};

// Загрузка заявок
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
    if (!response.ok) throw new Error('Ошибка загрузки заявок');
    requests.value = await response.json();
  } catch (error) {
    toaster.value?.addToast(
      `Ошибка загрузки заявок: ${error.message}`,
      'error'
    );
  }
};

// Загрузка участников
const fetchMembers = async () => {
  try {
    let url = 'https://igor-plaxin.store/star-way/member ';

    // Используем новый API для пользователей с ролью USER
    if (userRole.value === 'USER') {
      url = 'https://igor-plaxin.store/star-way/member/by-user ';
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) throw new Error('Ошибка загрузки участников');
    members.value = await response.json();
  } catch (error) {
    toaster.value?.addToast(
      `Ошибка загрузки участников: ${error.message}`,
      'error'
    );
  }
};

// Загрузка связей
const fetchRelations = async () => {
  try {
    const response = await fetch(
      'https://igor-plaxin.store/star-way/member-on-request ',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    if (!response.ok) throw new Error('Ошибка загрузки связей');
    relations.value = await response.json();
  } catch (error) {
    toaster.value?.addToast(
      `Ошибка загрузки связей: ${error.message}`,
      'error'
    );
  }
};

// Фильтрация связей
const filteredRelations = computed(() => {
  let result = [...relations.value];

  // Фильтрация по поиску
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((relation) => {
      const member = members.value.find((m) => m.id === relation.member_id);
      const request = requests.value.find((r) => r.id === relation.request_id);
      return (
        (member && getFullName(member).toLowerCase().includes(query)) ||
        (request && request.name.toLowerCase().includes(query))
      );
    });
  }

  // Фильтрация по заявке
  if (requestFilter.value) {
    result = result.filter(
      (relation) => relation.request_id === Number(requestFilter.value)
    );
  }

  return result;
});

// Пагинация
const totalPages = computed(() =>
  Math.ceil(filteredRelations.value.length / itemsPerPage.value)
);
const paginatedRelations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredRelations.value.slice(start, end);
});
const paginationStart = computed(() =>
  filteredRelations.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1
);
const paginationEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredRelations.value.length
  )
);
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

// Вспомогательные методы
const getRequestName = (request_id) => {
  const request = requests.value.find((r) => r.id === request_id);
  return request?.name || 'Неизвестная заявка';
};

const getMemberName = (member_id) => {
  const member = members.value.find((m) => m.id === member_id);
  return member ? getFullName(member) : 'Неизвестный участник';
};

// Методы пагинации
const goToPage = (page) => {
  currentPage.value = page;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Добавление новой связи
const addMemberToRequest = async () => {
  try {
    // Проверка на существование связи
    const existing = relations.value.find(
      (r) =>
        r.member_id === newRelation.value.member_id &&
        r.request_id === newRelation.value.request_id
    );

    if (existing) {
      toaster.value.addToast('Такая связь уже существует', 'warning');
      return;
    }

    // Добавляем новую связь
    const response = await fetch(
      'https://igor-plaxin.store/star-way/member-on-request ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(newRelation.value),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при добавлении связи');
    }

    const createdRelation = await response.json();
    relations.value.push(createdRelation);
    newRelation.value = { request_id: '', member_id: '' };
    toaster.value.addToast('Связь успешно добавлена', 'success');
  } catch (error) {
    toaster.value.addToast(
      `Ошибка при добавлении связи: ${error.message}`,
      'error'
    );
  }
};

// Удаление связи
const confirmDeleteRelation = (relation) => {
  relationToDelete.value = relation;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  relationToDelete.value = null;
};

const deleteRelation = async () => {
  try {
    const { member_id, request_id } = relationToDelete.value;

    const response = await fetch(
      'https://igor-plaxin.store/star-way/member-on-request ',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ member_id, request_id }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при удалении связи');
    }

    relations.value = relations.value.filter(
      (r) => !(r.member_id === member_id && r.request_id === request_id)
    );
    toaster.value.addToast('Связь успешно удалена', 'success');
    closeDeleteModal();
  } catch (error) {
    toaster.value.addToast(
      `Ошибка при удалении связи: ${error.message}`,
      'error'
    );
  }
};

// Загрузка данных при монтировании
onMounted(async () => {
  loading.value = true;
  await fetchUserRole(); // Сначала получаем роль
  await Promise.all([
    fetchRequests(),
    fetchMembers(), // Теперь с учетом роли пользователя
    fetchRelations(),
  ]);
  loading.value = false;
});
</script>
