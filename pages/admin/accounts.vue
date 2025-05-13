<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Toaster -->
    <Toaster ref="toaster" />

    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Аккаунты</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Управление аккаунтами пользователей с ролями
      </p>
    </div>

    <!-- Основной контент -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <!-- Форма добавления -->
      <div class="mb-6">
        <button
          @click="openCreateAccountModal"
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
          Добавить аккаунт
        </button>
      </div>

      <!-- Фильтры и поиск -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Поиск -->
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
              placeholder="Поиск по имени или email"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200"
              @input="filterAccounts"
            />
          </div>
          <!-- Фильтр по роли -->
          <div>
            <select
              v-model="roleFilter"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-200"
              @change="filterAccounts"
            >
              <option value="">Все роли</option>
              <option value="MODERATOR">Модератор</option>
              <option value="ADMIN">Администратор</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Таблица аккаунтов -->
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
                  ID
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  ФИО
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Роль
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
                v-else-if="filteredAccounts.length === 0 && !loading"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td
                  colspan="5"
                  class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Аккаунты не найдены
                </td>
              </tr>
              <tr
                v-for="account in paginatedAccounts"
                :key="account.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ account.id }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="text-sm text-gray-900 dark:text-white font-medium"
                  >
                    {{ getFullName(account) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ account.email }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="roleColors[account.role]"
                  >
                    {{ roleLabels[account.role] }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <button
                    @click="editAccount(account)"
                    class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 transition duration-200"
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
                    @click="confirmDeleteAccount(account)"
                    class="ml-3 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition duration-200"
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
                        d="M19 7l-.867 12.142A2 2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
          v-if="filteredAccounts.length > 0"
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
                <span class="font-medium">{{ filteredAccounts.length }}</span>
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
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 00-1.414 0L8.5 8.086 5.707 5.293a1 1 0 00-1.414 1.414l2.793 2.793a1 1 0 001.414 0L12 9.414l2.793-2.793a1 1 0 00-1.414-1.414z"
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
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 5.293a1 1 0 011.414 0L11 7.586l2.293-2.293a1 1 0 011.414 1.414L12.414 9l2.293 2.293a1 1 0 01-1.414 1.414L11 10l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 9 6.293 6.707a1 1 0 011.414-1.414z"
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

    <!-- Модальное окно создания/редактирования аккаунта -->
    <div
      v-if="showAccountModal"
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
                  {{ isEditing ? 'Редактировать аккаунт' : 'Добавить аккаунт' }}
                </h3>
                <div class="mt-4">
                  <form @submit.prevent="saveAccount" class="space-y-4">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          for="surname"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Фамилия</label
                        >
                        <input
                          type="text"
                          id="surname"
                          v-model="accountForm.surname"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label
                          for="name"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Имя</label
                        >
                        <input
                          type="text"
                          id="name"
                          v-model="accountForm.name"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Email</label
                      >
                      <input
                        type="email"
                        id="email"
                        v-model="accountForm.email"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="role"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Роль</label
                      >
                      <select
                        id="role"
                        v-model="accountForm.role"
                        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        required
                      >
                        <option value="MODERATOR">Модератор</option>
                        <option value="ADMIN">Администратор</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Пароль</label
                      >
                      <input
                        type="password"
                        id="password"
                        v-model="accountForm.password"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        :required="!isEditing"
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
              @click="saveAccount"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
            >
              {{ isEditing ? 'Сохранить изменения' : 'Создать аккаунт' }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-200"
            >
              Отмена
            </button>
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
                >
                  Удалить аккаунт
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Вы уверены, что хотите удалить аккаунт
                    <span class="font-medium"
                      >{{ accountToDelete?.surname }}
                      {{ accountToDelete?.name }}</span
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
              @click="deleteAccount"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
            >
              Удалить
            </button>
            <button
              type="button"
              @click="closeDeleteModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto transition duration-200"
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
const accounts = ref([]);
const searchQuery = ref('');
const roleFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showAccountModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const loading = ref(true);

const openCreateAccountModal = () => {
  isEditing.value = false;
  accountForm.value = {
    id: null,
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
  };
  showAccountModal.value = true;
};

// Форма аккаунта
const accountForm = ref({
  id: null,
  name: '',
  surname: '',
  email: '',
  password: '',
  role: '',
});
const accountToDelete = ref(null);

// Получение полного имени
const getFullName = (account) => {
  return `${account.surname} ${account.name}`;
};

// Фильтрация аккаунтов
const filteredAccounts = computed(() => {
  let result = [...accounts.value];

  // Поиск по имени или фамилии
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(
      (account) =>
        account.name.toLowerCase().includes(query) ||
        account.surname.toLowerCase().includes(query) ||
        account.email.toLowerCase().includes(query)
    );
  }

  // Фильтр по роли
  if (roleFilter.value) {
    result = result.filter((account) => account.role === roleFilter.value);
  }

  return result;
});

// Пагинация
const totalPages = computed(() =>
  Math.ceil(filteredAccounts.value.length / itemsPerPage.value)
);
const paginatedAccounts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredAccounts.value.slice(start, end);
});
const paginationStart = computed(() => {
  return filteredAccounts.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1;
});
const paginationEnd = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage.value,
    filteredAccounts.value.length
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

// Цвета для ролей
const roleColors = {
  MODERATOR:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  ADMIN:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
};
const roleLabels = {
  MODERATOR: 'Модератор',
  ADMIN: 'Администратор',
};

// Загрузка аккаунтов
const fetchAccounts = async () => {
  try {
    loading.value = true;
    const response = await fetch('https://igor-plaxin.ru/star-way/account ', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки аккаунтов');
    }

    const data = await response.json();
    accounts.value = data.map((account) => ({
      id: account.id,
      name: account.name || '',
      surname: account.surname || '',
      email: account.email || '',
      role: account.role || '',
    }));
  } catch (error) {
    toaster.value.addToast(
      `Ошибка загрузки аккаунтов: ${error.message}`,
      'error'
    );
  } finally {
    loading.value = false;
  }
};

// Сохранение аккаунта
const saveAccount = async () => {
  try {
    const payload = { ...accountForm.value };
    const isCreate = !payload.id;

    const url = isCreate
      ? 'https://igor-plaxin.ru/star-way/account '
      : `https://igor-plaxin.ru/star-way/account/ ${payload.id}`;
    const method = isCreate ? 'POST' : 'PATCH';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Ошибка ${isCreate ? 'создания' : 'обновления'} аккаунта`
      );
    }

    const updated = await response.json();

    if (isCreate) {
      updated.password = '';
      accounts.value.push(updated);
      toaster.value.addToast('Аккаунт успешно создан', 'success');
    } else {
      const index = accounts.value.findIndex((a) => a.id === updated.id);
      if (index !== -1) {
        accounts.value[index] = updated;
      }
      toaster.value.addToast('Аккаунт успешно обновлен', 'success');
    }

    closeModal();
  } catch (error) {
    toaster.value.addToast(
      `Ошибка сохранения аккаунта: ${error.message}`,
      'error'
    );
  }
};

// Редактирование аккаунта
const editAccount = (account) => {
  isEditing.value = true;
  accountForm.value = { ...account };
  showAccountModal.value = true;
};

// Подтверждение удаления
const confirmDeleteAccount = (account) => {
  accountToDelete.value = account;
  showDeleteModal.value = true;
};

// Удаление аккаунта
const deleteAccount = async () => {
  try {
    const url = `https://igor-plaxin.ru/star-way/account/${accountToDelete.value.id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка удаления аккаунта');
    }

    accounts.value = accounts.value.filter(
      (a) => a.id !== accountToDelete.value.id
    );
    toaster.value.addToast('Аккаунт удален', 'success');
    closeDeleteModal();
  } catch (error) {
    toaster.value.addToast(
      `Ошибка удаления аккаунта: ${error.message}`,
      'error'
    );
  }
};

// Закрытие модальных окон
const closeModal = () => {
  showAccountModal.value = false;
  accountForm.value = {
    id: null,
    name: '',
    surname: '',
    email: '',
    password: '',
    role: '',
  };
  isEditing.value = false;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  accountToDelete.value = null;
};

// Фильтрация
const filterAccounts = () => {
  currentPage.value = 1;
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

// Загрузка данных при монтировании
onMounted(() => {
  fetchAccounts();
});
</script>
