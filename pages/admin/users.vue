<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Toaster -->
    <Toaster ref="toaster" />

    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
        Управление пользователями
      </h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        Здесь вы можете управлять пользователями системы
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
            Пользователи
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Управление пользователями системы
          </p>
        </div>
        <button
          @click="openAddUserModal"
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
          Добавить пользователя
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
              @input="filterUsers"
            />
          </div>

          <!-- Фильтр по роли -->
          <div>
            <select
              v-model="roleFilter"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-200"
              @change="filterUsers"
            >
              <option value="">Все роли</option>
              <option value="admin">Администратор</option>
              <option value="manager">Менеджер</option>
              <option value="user">Пользователь</option>
            </select>
          </div>

          <!-- Фильтр по статусу -->
          <div>
            <select
              v-model="statusFilter"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition duration-200"
              @change="filterUsers"
            >
              <option value="">Все статусы</option>
              <option value="active">Активный</option>
              <option value="inactive">Неактивный</option>
              <option value="pending">Ожидает подтверждения</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Таблица пользователей -->
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
                  v-for="(header, index) in tableHeaders"
                  :key="index"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  @click="sortBy(header.key)"
                >
                  <div class="flex items-center">
                    {{ header.label }}
                    <svg
                      v-if="sortKey === header.key"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 ml-1"
                      :class="{ 'transform rotate-180': sortOrder === 'desc' }"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </div>
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Действия</span>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <tr
                v-if="!users.length"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td
                  colspan="5"
                  class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Загрузка пользователей...
                </td>
              </tr>
              <tr
                v-else-if="filteredUsers.length === 0"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td
                  colspan="5"
                  class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Пользователи не найдены
                </td>
              </tr>
              <tr
                v-for="user in paginatedUsers"
                :key="user.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ user.id }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        :src="
                          user.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            getFullName(user)
                          )}&background=6366f1&color=fff`
                        "
                        :alt="getFullName(user)"
                        class="h-10 w-10 rounded-full object-cover"
                      />
                    </div>
                    <div class="ml-4">
                      <div
                        class="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {{ getFullName(user) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ user.email }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ user.phone }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200':
                        user.role === 'admin',
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200':
                        user.role === 'manager',
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200':
                        user.role === 'user',
                    }"
                  >
                    {{ roleLabels[user.role] }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                        user.status === 'active',
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                        user.status === 'inactive',
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                        user.status === 'pending',
                    }"
                  >
                    {{ statusLabels[user.status] }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="editUser(user)"
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
                      @click="confirmDeleteUser(user)"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Пагинация -->
        <div
          class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6"
        >
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Назад
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Вперед
            </button>
          </div>
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
                <span class="font-medium">{{ filteredUsers.length }}</span>
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
    </div>

    <!-- Модальное окно добавления/редактирования пользователя -->
    <div
      v-if="showUserModal"
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
          @click="closeUserModal"
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
                    isEditing
                      ? 'Редактировать пользователя'
                      : 'Добавить пользователя'
                  }}
                </h3>
                <div class="mt-4">
                  <form @submit.prevent="saveUser" class="space-y-4">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          for="surname"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Фамилия
                        </label>
                        <input
                          type="text"
                          id="surname"
                          v-model="userForm.surname"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        />
                      </div>
                      <div>
                        <label
                          for="name"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Имя
                        </label>
                        <input
                          type="text"
                          id="name"
                          v-model="userForm.name"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="patronymic"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Отчество
                      </label>
                      <input
                        type="text"
                        id="patronymic"
                        v-model="userForm.patronymic"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                      />
                    </div>
                    <div>
                      <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        v-model="userForm.phone"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                      />
                    </div>
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        v-model="userForm.email"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                      />
                    </div>
                    <div>
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {{
                          isEditing
                            ? 'Новый пароль (оставьте пустым, чтобы не менять)'
                            : 'Пароль'
                        }}
                      </label>
                      <input
                        type="password"
                        id="password"
                        v-model="userForm.password"
                        class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                      />
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          for="role"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Роль
                        </label>
                        <select
                          id="role"
                          v-model="userForm.role"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        >
                          <option value="user">Пользователь</option>
                          <option value="manager">Менеджер</option>
                          <option value="admin">Администратор</option>
                        </select>
                      </div>
                      <div>
                        <label
                          for="status"
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Статус
                        </label>
                        <select
                          id="status"
                          v-model="userForm.status"
                          class="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-200"
                        >
                          <option value="active">Активный</option>
                          <option value="inactive">Неактивный</option>
                          <option value="pending">Ожидает подтверждения</option>
                        </select>
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
              @click="saveUser"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm transition duration-200"
            >
              {{ isEditing ? 'Сохранить' : 'Добавить' }}
            </button>
            <button
              type="button"
              @click="closeUserModal"
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
                  Удалить пользователя
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Вы уверены, что хотите удалить пользователя
                    <span class="font-medium"
                      >{{ userToDelete?.name }}
                      {{ userToDelete?.surname }}</span
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
              @click="deleteUser"
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

// Устанавливаем layout для этой страницы
definePageMeta({
  layout: 'admin',
});

const toaster = ref(null);
const users = ref([]);
const searchQuery = ref('');
const roleFilter = ref('');
const statusFilter = ref('');
const sortKey = ref('name');
const sortOrder = ref('asc');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showUserModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const userToDelete = ref(null);

// Форма пользователя
const userForm = ref({
  id: null,
  name: '',
  surname: '',
  patronymic: '',
  email: '',
  phone: '',
  password: '',
  role: 'user',
  status: 'active',
  avatar: '',
  createdAt: '',
  lastLogin: '',
});

// Метки для ролей и статусов
const roleLabels = {
  admin: 'Администратор',
  manager: 'Менеджер',
  user: 'Пользователь',
};

const statusLabels = {
  active: 'Активный',
  inactive: 'Неактивный',
  pending: 'Ожидает подтверждения',
};

// Заголовки таблицы
const tableHeaders = [
  { key: 'id', label: 'ID' },
  { key: 'fullName', label: 'ФИО' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Телефон' },
  { key: 'role', label: 'Роль' },
  { key: 'status', label: 'Статус' },
];

// Добавляем вычисляемое свойство для полного имени
const getFullName = (user) => {
  const parts = [user.surname, user.name];
  if (user.patronymic) {
    parts.push(user.patronymic);
  }
  return parts.filter(Boolean).join(' ');
};

// Фильтрация пользователей
const filteredUsers = computed(() => {
  let result = [...users.value];

  // Фильтрация по поиску
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.surname.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  // Фильтрация по роли
  if (roleFilter.value) {
    result = result.filter((user) => user.role === roleFilter.value);
  }

  // Фильтрация по статусу
  if (statusFilter.value) {
    result = result.filter((user) => user.status === statusFilter.value);
  }

  // Сортировка
  result.sort((a, b) => {
    let aValue = a[sortKey.value];
    let bValue = b[sortKey.value];

    // Специальная обработка для имени (объединяем имя и фамилию)
    if (sortKey.value === 'name') {
      aValue = `${a.name} ${a.surname}`;
      bValue = `${b.name} ${b.surname}`;
    }

    if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
});

// Пагинация
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage.value)
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

const paginationStart = computed(() => {
  return filteredUsers.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1;
});

const paginationEnd = computed(() => {
  return Math.min(
    currentPage.value * itemsPerPage.value,
    filteredUsers.value.length
  );
});

// Отображаемые страницы для пагинации
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
const fetchUsers = async () => {
  try {
    const response = await fetch('https://igor-plaxin.store/star-way/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке пользователей');
    }

    const data = await response.json();
    users.value = data.map((user) => ({
      id: user.id,
      name: user.name || '',
      surname: user.surname || '',
      patronymic: user.patronymic || '',
      email: user.email || '',
      phone: user.phone || '',
      role: 'user',
      status: 'active',
      avatar: '',
      createdAt: new Date().toISOString(),
      lastLogin: null,
    }));
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
    toaster.value.addToast(
      'Ошибка при загрузке пользователей: ' + error.message,
      'error'
    );
  }
};

const filterUsers = () => {
  currentPage.value = 1; // Сброс на первую страницу при фильтрации
};

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
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

const formatDate = (dateString) => {
  if (!dateString) return 'Никогда';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const openAddUserModal = () => {
  isEditing.value = false;
  userForm.value = {
    id: null,
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
    status: 'active',
    avatar: '',
    createdAt: '',
    lastLogin: '',
  };
  showUserModal.value = true;
};

const editUser = (user) => {
  isEditing.value = true;
  userForm.value = { ...user, password: '' };
  showUserModal.value = true;
};

const closeUserModal = () => {
  showUserModal.value = false;
};

const saveUser = async () => {
  try {
    const url = isEditing.value
      ? `https://igor-plaxin.store/star-way/user/${userForm.value.id}`
      : 'https://igor-plaxin.store/star-way/user';

    const method = isEditing.value ? 'PATCH' : 'POST';

    const userData = {
      name: userForm.value.name,
      surname: userForm.value.surname,
      patronymic: userForm.value.patronymic,
      email: userForm.value.email,
      phone: userForm.value.phone,
    };

    if (userForm.value.password) {
      userData.password = userForm.value.password;
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || 'Ошибка при сохранении пользователя'
      );
    }

    const updatedUser = await response.json();

    if (isEditing.value) {
      const index = users.value.findIndex((u) => u.id === updatedUser.id);
      if (index !== -1) {
        users.value[index] = {
          ...updatedUser,
          role: userForm.value.role,
          status: userForm.value.status,
          avatar: userForm.value.avatar,
          createdAt: userForm.value.createdAt,
          lastLogin: userForm.value.lastLogin,
        };
      }
      toaster.value.addToast('Пользователь успешно обновлен', 'success');
    } else {
      users.value.push({
        ...updatedUser,
        role: 'user',
        status: 'active',
        avatar: '',
        createdAt: new Date().toISOString(),
        lastLogin: null,
      });
      toaster.value.addToast('Пользователь успешно создан', 'success');
    }

    closeUserModal();
  } catch (error) {
    console.error('Ошибка при сохранении пользователя:', error);
    toaster.value.addToast(
      'Ошибка при сохранении пользователя: ' + error.message,
      'error'
    );
  }
};

const confirmDeleteUser = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  userToDelete.value = null;
};

const deleteUser = async () => {
  try {
    const url = `https://igor-plaxin.store/star-way/user/${userToDelete.value.id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка при удалении пользователя');
    }

    users.value = users.value.filter((u) => u.id !== userToDelete.value.id);
    toaster.value.addToast('Пользователь успешно удален', 'success');
    closeDeleteModal();
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    toaster.value.addToast(
      'Ошибка при удалении пользователя: ' + error.message,
      'error'
    );
  }
};

// Загрузка данных при монтировании компонента
onMounted(() => {
  fetchUsers();
});
</script>
