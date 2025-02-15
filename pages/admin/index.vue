<template>
  <div class="flex min-h-screen bg-gray-50 dark:bg-gray-900">
    <AdminSidebar />
    <div class="flex-1 flex flex-col">
      <AdminHeader />
      <main class="flex-1 p-6">
        <div class="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-800">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Добро пожаловать в админку!
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Здесь вы можете управлять пользователями, настройками и другими
            аспектами системы.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminHeader from '~/components/admin/Header.vue';
import AdminSidebar from '~/components/admin/Sidebar.vue';
</script>
