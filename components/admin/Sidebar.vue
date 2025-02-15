<template>
  <aside
    class="w-64 bg-gray-900 text-white h-screen flex-shrink-0 dark:bg-gray-800"
  >
    <div class="p-6">
      <h2 class="text-xl font-bold text-gray-200 dark:text-gray-100">Меню</h2>
      <nav class="mt-6">
        <ul class="space-y-2">
          <li>
            <a
              href="/admin"
              class="flex items-center p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition duration-200 dark:hover:bg-gray-700"
            >
              <span class="ml-3">Главная</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/users"
              class="flex items-center p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition duration-200 dark:hover:bg-gray-700"
            >
              <span class="ml-3">Пользователи</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/settings"
              class="flex items-center p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition duration-200 dark:hover:bg-gray-700"
            >
              <span class="ml-3">Настройки</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
