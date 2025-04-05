<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <AdminHeader />

      <!-- Main Section -->
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
          <h2
            class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
          >
            Профиль пользователя
          </h2>

          <!-- Profile Section -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4">
              <img
                src="https://i.pravatar.cc/100"
                alt="User Avatar"
                class="w-20 h-20 rounded-full object-cover border-2 border-purple-600 dark:border-purple-400"
              />
              <div>
                <h3
                  class="text-lg font-medium text-gray-800 dark:text-gray-200"
                >
                  Иван Иванов
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  ivan@example.com
                </p>
              </div>
            </div>

            <!-- Profile Info -->
            <div class="space-y-4">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value="Иван Иванов"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
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
                  id="email"
                  type="email"
                  placeholder="Введите ваш email"
                  value="ivan@example.com"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-4">
              <button
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Отмена
              </button>
              <button
                class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Сохранить изменения
              </button>
            </div>

            <!-- Account Management -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3
                class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4"
              >
                Управление аккаунтом
              </h3>
              <ul class="space-y-2">
                <li>
                  <button
                    class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Изменить аватар
                  </button>
                </li>
                <li>
                  <button
                    class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Удалить аккаунт
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminHeader from '~/components/Header.vue';
import AdminSidebar from '~/components/Sidebar.vue';
</script>
