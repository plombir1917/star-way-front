```vue
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Toaster -->
    <Toaster ref="toaster" />

    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Управление участниками
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Здесь вы можете управлять участниками системы
      </p>
    </div>

    <!-- Основной контент -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <!-- Заголовок и кнопка добавления -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
            Участники
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Управление участниками системы
          </p>
        </div>
        <button
          @click="openAddMemberModal"
          class="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Добавить участника
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
              @input="filterMembers"
            />
          </div>
          <!-- Фильтр по группе -->
          <div>
            <select
              v-model="groupFilter"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-200"
              @change="filterMembers"
            >
              <option value="">Все группы</option>
              <option v-for="group in groups" :key="group.id" :value="group.id">
                {{ group.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Сетка участников -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
        ></div>
      </div>

      <div v-else-if="filteredMembers.length === 0" class="text-center py-12">
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
          Нет участников
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Попробуйте добавить нового участника или изменить фильтры.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="member in paginatedMembers"
          :key="member.id"
          class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div
                class="flex-shrink-0 h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center"
              >
                <span class="text-xl font-bold text-purple-600">
                  {{ member.name.charAt(0) }}{{ member.surname.charAt(0) }}
                </span>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ getFullName(member) }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ getGroupName(member.group_id) }}
                </p>
              </div>
            </div>

            <div class="mt-4">
              <div
                class="flex items-center text-sm text-gray-500 dark:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{{ member.email }}</span>
              </div>
              <div
                class="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{{ member.phone }}</span>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-2">
              <button
                @click="editMember(member)"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                @click="confirmDeleteMember(member)"
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
        v-if="filteredMembers.length > 0"
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
              <span class="font-medium">{{ filteredMembers.length }}</span>
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

    <!-- Модальное окно добавления/редактирования участника -->
    <div
      v-if="showMemberModal"
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
          @click="closeMemberModal"
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
                    isEditing ? 'Редактировать участника' : 'Добавить участника'
                  }}
                </h3>
                <div class="mt-4">
                  <form @submit.prevent="saveMember" class="space-y-4">
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
                          v-model="memberForm.surname"
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
                          v-model="memberForm.name"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="patronymic"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Отчество</label
                      >
                      <input
                        type="text"
                        id="patronymic"
                        v-model="memberForm.patronymic"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                      />
                    </div>
                    <div>
                      <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Телефон</label
                      >
                      <input
                        type="tel"
                        id="phone"
                        v-model="memberForm.phone"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        required
                      />
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
                        v-model="memberForm.email"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="group"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Группа</label
                      >
                      <select
                        id="group"
                        v-model.number="memberForm.group_id"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        required
                      >
                        <option value="" disabled>Выберите группу</option>
                        <option
                          v-for="group in groups"
                          :key="group.id"
                          :value="group.id"
                        >
                          {{ group.id }} — {{ group.name }}
                        </option>
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
              @click="saveMember"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-200"
            >
              {{ isEditing ? 'Сохранить' : 'Добавить' }}
            </button>
            <button
              type="button"
              @click="closeMemberModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-200"
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
                  id="modal-title"
                >
                  Удалить участника
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Вы уверены, что хотите удалить участника
                    <span class="font-medium"
                      >{{ memberToDelete?.name }}
                      {{ memberToDelete?.surname }}</span
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
              @click="deleteMember"
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
const members = ref([]);
const groups = ref([]);
const searchQuery = ref('');
const groupFilter = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(9);
const showMemberModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const memberToDelete = ref(null);
const loading = ref(true);

// Форма участника
const memberForm = ref({
  id: null,
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  phone: '',
  group_id: null,
});

// Вычисляемое свойство для полного имени
const getFullName = (member) => {
  const parts = [member.surname, member.name];
  if (member.patronymic) {
    parts.push(member.patronymic);
  }
  return parts.filter(Boolean).join(' ');
};

// Получение имени группы
const getGroupName = (groupId) => {
  const group = groups.value.find((g) => g.id === groupId);
  return group ? group.name : 'Неизвестная группа';
};

// Фильтрация участников
const filteredMembers = computed(() => {
  let result = [...members.value];

  // Фильтрация по поиску
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.surname.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
    );
  }

  // Фильтрация по группе
  if (groupFilter.value) {
    result = result.filter(
      (member) => member.group_id === Number(groupFilter.value)
    );
  }

  return result;
});

// Пагинация
const totalPages = computed(() =>
  Math.ceil(filteredMembers.value.length / itemsPerPage.value)
);
const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredMembers.value.slice(start, end);
});
const paginationStart = computed(() => {
  return filteredMembers.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1;
});
const paginationEnd = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage.value,
    filteredMembers.value.length
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

// Методы
const fetchMembers = async () => {
  try {
    loading.value = true;
    const response = await fetch('https://igor-plaxin.ru/star-way/member', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Ошибка при загрузке участников');
    }
    const data = await response.json();
    members.value = data.map((member) => ({
      id: member.id,
      name: member.name || '',
      surname: member.surname || '',
      patronymic: member.patronymic || '',
      email: member.email || '',
      phone: member.phone || '',
      group_id: member.group_id || null,
    }));
  } catch (error) {
    console.error('Ошибка при загрузке участников:', error);
    toaster.value.addToast(
      'Ошибка при загрузке участников: ' + error.message,
      'error'
    );
  } finally {
    loading.value = false;
  }
};

const fetchGroups = async () => {
  try {
    const response = await fetch('https://igor-plaxin.ru/star-way/group', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Ошибка при загрузке групп');
    }
    const data = await response.json();
    groups.value = data.map((group) => ({
      id: group.id,
      name: group.name || '',
    }));
  } catch (error) {
    console.error('Ошибка при загрузке групп:', error);
    toaster.value.addToast(
      'Ошибка при загрузке групп: ' + error.message,
      'error'
    );
  }
};

const filterMembers = () => {
  currentPage.value = 1; // Сброс на первую страницу при фильтрации
};

const goToPage = (page) => {
  currentPage.value = page;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const openAddMemberModal = () => {
  isEditing.value = false;
  memberForm.value = {
    id: null,
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    phone: '',
    group_id: groups.value.length > 0 ? groups.value[0].id : null,
  };
  showMemberModal.value = true;
};

const editMember = (member) => {
  isEditing.value = true;
  memberForm.value = { ...member };
  showMemberModal.value = true;
};

const closeMemberModal = () => {
  showMemberModal.value = false;
};

const saveMember = async () => {
  try {
    const url = isEditing.value
      ? `https://igor-plaxin.ru/star-way/member/${memberForm.value.id}`
      : 'https://igor-plaxin.ru/star-way/member';
    const method = isEditing.value ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(memberForm.value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при сохранении участника');
    }

    const updatedMember = await response.json();

    if (isEditing.value) {
      const index = members.value.findIndex((m) => m.id === updatedMember.id);
      if (index !== -1) {
        members.value[index] = updatedMember;
      }
      toaster.value.addToast('Участник успешно обновлен', 'success');
    } else {
      members.value.push(updatedMember);
      toaster.value.addToast('Участник успешно добавлен', 'success');
    }

    closeMemberModal();
  } catch (error) {
    console.error('Ошибка при сохранении участника:', error);
    toaster.value.addToast(
      'Ошибка при сохранении участника: ' + error.message,
      'error'
    );
  }
};

const confirmDeleteMember = (member) => {
  memberToDelete.value = member;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  memberToDelete.value = null;
};

const deleteMember = async () => {
  try {
    const url = `https://igor-plaxin.ru/star-way/member/${memberToDelete.value.id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при удалении участника');
    }

    members.value = members.value.filter(
      (m) => m.id !== memberToDelete.value.id
    );
    toaster.value.addToast('Участник успешно удален', 'success');
    closeDeleteModal();
  } catch (error) {
    console.error('Ошибка при удалении участника:', error);
    toaster.value.addToast(
      'Ошибка при удалении участника: ' + error.message,
      'error'
    );
  }
};

// Загрузка данных при монтировании компонента
onMounted(() => {
  fetchMembers();
  fetchGroups();
});
</script>
