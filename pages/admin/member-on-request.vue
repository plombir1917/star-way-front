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
            <div>
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
            Добавить связь
          </button>
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

      <!-- Таблица связей -->
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
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  ID заявки
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Название заявки
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  ID участника
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  ФИО участника
                </th>
                <th
                  scope="col"
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
                v-if="loading"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td
                  colspan="5"
                  class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Загрузка данных...
                </td>
              </tr>
              <tr
                v-else-if="filteredRelations.length === 0 && !loading"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td
                  colspan="5"
                  class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Связи не найдены
                </td>
              </tr>
              <tr
                v-for="relation in paginatedRelations"
                :key="`${relation.member_id}-${relation.request_id}`"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ relation.request_id }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ getRequestName(relation.request_id) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ relation.member_id }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ getMemberName(relation.member_id) }}
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    @click="confirmDeleteRelation(relation)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition duration-200"
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

        <!-- Пагинация -->
        <div
          v-if="filteredRelations.length > 0"
          class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6"
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
                      d="M12.707 5.293a1 1 0 00-1.414 0L8.5 8.086 5.707 5.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
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
                      d="M7.293 5.293a1 1 0 00-1.414 1.414L8.586 10l-2.707 2.707a1 1 0 001.414 1.414L10 11.414l2.707 2.707a1 1 0 001.414-1.414L11.414 10l2.707-2.707a1 1 0 00-1.414-1.414L10 8.586 7.293 5.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
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
          class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeDeleteModal"
        ></div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
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
          <div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
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
definePageMeta({
  layout: 'admin',
});

const toaster = ref(null);
const relations = ref([]);
const requests = ref([]);
const members = ref([]);
const loading = ref(true);
const showDeleteModal = ref(false);
const relationToDelete = ref(null);

// Форма для новой связи
const newRelation = ref({
  request_id: '',
  member_id: '',
});

// Фильтры
const searchQuery = ref('');
const requestFilter = ref('');

// Пагинация
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Получение полного имени
const getFullName = (member) => {
  const parts = [member.surname, member.name];
  if (member.patronymic) parts.push(member.patronymic);
  return parts.filter(Boolean).join(' ');
};

// Загрузка данных
const fetchRequests = async () => {
  try {
    const response = await fetch('https://igor-plaxin.ru/star-way/request ', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) throw new Error('Ошибка загрузки заявок');
    requests.value = await response.json();
  } catch (error) {
    toaster.value.addToast(`Ошибка загрузки заявок: ${error.message}`, 'error');
  }
};

const fetchMembers = async () => {
  try {
    const response = await fetch('https://igor-plaxin.ru/star-way/member ', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) throw new Error('Ошибка загрузки участников');
    members.value = await response.json();
  } catch (error) {
    toaster.value.addToast(
      `Ошибка загрузки участников: ${error.message}`,
      'error'
    );
  }
};

const fetchRelations = async () => {
  try {
    const response = await fetch(
      'https://igor-plaxin.ru/star-way/member-on-request ',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    if (!response.ok) throw new Error('Ошибка загрузки связей');
    relations.value = await response.json();
  } catch (error) {
    toaster.value.addToast(`Ошибка загрузки связей: ${error.message}`, 'error');
  } finally {
    loading.value = false;
  }
};

// Фильтрация связей
const filteredRelations = computed(() => {
  let result = [...relations.value];

  // Фильтрация по заявке
  if (requestFilter.value) {
    result = result.filter((r) => r.request_id === Number(requestFilter.value));
  }

  // Поиск по ФИО участника
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter((relation) => {
      const member = members.value.find((m) => m.id === relation.member_id);
      if (!member) return false;
      const fullName = getFullName(member).toLowerCase();
      return fullName.includes(query);
    });
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
const paginationStart = computed(() => {
  return filteredRelations.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1;
});
const paginationEnd = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage.value,
    filteredRelations.value.length
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
      'https://igor-plaxin.ru/star-way/member-on-request ',
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
  relationToDelete.value = { ...relation };
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
      'https://igor-plaxin.ru/star-way/member-on-request ',
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

// Фильтрация
const filterRelations = () => {
  currentPage.value = 1; // Сброс на первую страницу при фильтрации
};

// Загрузка данных при монтировании
onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchRequests(), fetchMembers(), fetchRelations()]);
});
</script>
