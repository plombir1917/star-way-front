<template>
  <div class="bg-white dark:bg-gray-900">
    <!-- Hero Section -->
    <section
      class="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 z-0">
        <img
          src="/assets/image/starway.png"
          alt="Star Way Background"
          class="w-full h-full object-cover opacity-20"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 opacity-80"
        ></div>
      </div>
      <div class="container mx-auto px-4 z-10 text-center">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">Star Way</h1>
        <p class="text-xl md:text-2xl text-purple-200 mb-8">
          Танцевальное ивент-агентство для развития творческого потенциала
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            to="/register"
            class="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
          >
            Зарегистрироваться
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-900 transition duration-300 transform hover:scale-105"
          >
            Войти
          </NuxtLink>
        </div>
      </div>
      <div
        class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-16"
        >
          Возможности платформы
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <!-- Feature 1 -->
          <div
            class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105"
          >
            <div
              class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4"
            >
              Календарь мероприятий
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center">
              Планируйте и управляйте мероприятиями на год вперёд. Добавляйте,
              редактируйте и удаляйте события в удобном календаре.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105"
          >
            <div
              class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4"
            >
              Регистрация участников
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center">
              Регистрируйте детей на мероприятия с помощью удобной системы
              подачи заявок. Отслеживайте статус заявок в реальном времени.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105"
          >
            <div
              class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4"
            >
              Положения мероприятий
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center">
              Создавайте и редактируйте положения для каждого мероприятия с
              подробной информацией о правилах, требованиях и условиях участия.
            </p>
          </div>

          <!-- Feature 4 -->
          <div
            class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105"
          >
            <div
              class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4"
            >
              Мастер-классы
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center">
              Продавайте мастер-классы с автоматической отправкой ссылок на
              Telegram с шаблонными сообщениями для каждого мероприятия.
            </p>
          </div>

          <!-- Feature 5 -->
          <div
            class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105"
          >
            <div
              class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4"
            >
              Управление мероприятиями
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center">
              Полный контроль над планированием, организацией и проведением
              мероприятий с удобным интерфейсом администратора.
            </p>
          </div>

          <!-- Feature 6 -->
          <div
            class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transform transition duration-300 hover:scale-105"
          >
            <div
              class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6 mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-purple-600 dark:text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4"
            >
              Быстрая регистрация
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-center">
              Простая и быстрая регистрация пользователей с возможностью
              добавления детей для участия в мероприятиях.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-16"
        >
          Как это работает
        </h2>
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="w-full md:w-1/2 mb-10 md:mb-0">
            <img
              src="/assets/image/starway.png"
              alt="Star Way Process"
              class="rounded-lg shadow-xl"
            />
          </div>
          <div class="w-full md:w-1/2 md:pl-10">
            <div class="space-y-8">
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                >
                  <span
                    class="text-xl font-bold text-purple-600 dark:text-purple-300"
                    >1</span
                  >
                </div>
                <div class="ml-4">
                  <h3
                    class="text-xl font-semibold text-gray-800 dark:text-white"
                  >
                    Регистрация
                  </h3>
                  <p class="mt-2 text-gray-600 dark:text-gray-300">
                    Создайте аккаунт в системе Star Way для доступа ко всем
                    возможностям платформы.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                >
                  <span
                    class="text-xl font-bold text-purple-600 dark:text-purple-300"
                    >2</span
                  >
                </div>
                <div class="ml-4">
                  <h3
                    class="text-xl font-semibold text-gray-800 dark:text-white"
                  >
                    Просмотр мероприятий
                  </h3>
                  <p class="mt-2 text-gray-600 dark:text-gray-300">
                    Изучите календарь мероприятий и выберите интересующие вас
                    события.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                >
                  <span
                    class="text-xl font-bold text-purple-600 dark:text-purple-300"
                    >3</span
                  >
                </div>
                <div class="ml-4">
                  <h3
                    class="text-xl font-semibold text-gray-800 dark:text-white"
                  >
                    Подача заявки
                  </h3>
                  <p class="mt-2 text-gray-600 dark:text-gray-300">
                    Зарегистрируйте себя или своего ребенка на выбранное
                    мероприятие.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                >
                  <span
                    class="text-xl font-bold text-purple-600 dark:text-purple-300"
                    >4</span
                  >
                </div>
                <div class="ml-4">
                  <h3
                    class="text-xl font-semibold text-gray-800 dark:text-white"
                  >
                    Участие
                  </h3>
                  <p class="mt-2 text-gray-600 dark:text-gray-300">
                    Получайте информацию о мероприятии и участвуйте в нем,
                    развивая свой творческий потенциал.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Секция Мастер-классы -->
    <section
      id="mclasses"
      class="py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2
            class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Онлайн-мастер-классы
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Повышайте свои навыки танцев с профессионалами через наши
            онлайн-мастер-классы
          </p>
        </div>
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
          ></div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="mclass in featuredMClasses"
            :key="mclass.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            <!-- Блок с изображением мастер-класса -->
            <img
              src="/mclass.png"
              alt="Изображение мастер-класса"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-3">
                {{ mclass.name }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                {{ mclass.description }}
              </p>
              <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  @click="openTelegramLink"
                  class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
                >
                  Записаться
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="allMClasses.length > 3" class="text-center mt-12">
          <button
            @click="scrollToMClasses"
            class="px-6 py-3 bg-transparent border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 transform hover:scale-105"
          >
            Посмотреть все мастер-классы
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-16"
        >
          Отзывы участников
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
            <div class="flex items-center mb-6">
              <img
                src="https://i.pravatar.cc/60?img=1"
                alt="User Avatar"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white">
                  Анна Петрова
                </h4>
                <p class="text-gray-600 dark:text-gray-300">Мама участника</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              "Система Star Way значительно упростила процесс регистрации моего
              ребенка на танцевальные мероприятия. Теперь я всегда в курсе всех
              событий и могу легко подавать заявки."
            </p>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
            <div class="flex items-center mb-6">
              <img
                src="https://i.pravatar.cc/60?img=2"
                alt="User Avatar"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white">
                  Игорь Соколов
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  Организатор мероприятий
                </p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              "Как организатор, я ценю удобство управления мероприятиями через
              платформу Star Way. Календарь и система подачи заявок значительно
              упрощают мою работу."
            </p>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
            <div class="flex items-center mb-6">
              <img
                src="https://i.pravatar.cc/60?img=3"
                alt="User Avatar"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white">
                  Мария Иванова
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  Участница мастер-классов
                </p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              "Мастер-классы через Star Way - это отличная возможность развивать
              свои навыки. Система автоматической отправки ссылок на Telegram
              очень удобна."
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-purple-900">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">
          Готовы присоединиться к Star Way?
        </h2>
        <p class="text-xl text-purple-200 mb-10 max-w-3xl mx-auto">
          Зарегистрируйтесь сейчас и получите доступ ко всем возможностям нашей
          платформы для танцевальных мероприятий.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            to="/register"
            class="px-8 py-3 bg-white text-purple-900 rounded-lg hover:bg-purple-100 transition duration-300 transform hover:scale-105"
          >
            Зарегистрироваться
          </NuxtLink>
          <NuxtLink
            to="/login"
            class="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-900 transition duration-300 transform hover:scale-105"
          >
            Войти
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold text-white mb-4">Star Way</h3>
            <p class="mb-4">
              Танцевальное ивент-агентство для развития творческого потенциала
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <svg
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Навигация</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="hover:text-white">Главная</a>
              </li>
              <li>
                <a href="#features" class="hover:text-white">Возможности</a>
              </li>
              <li>
                <a href="#how-it-works" class="hover:text-white"
                  >Как это работает</a
                >
              </li>
              <li>
                <a href="#testimonials" class="hover:text-white">Отзывы</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Контакты</h3>
            <ul class="space-y-2">
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 mr-2 text-purple-500"
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
                <span>+7 (999) 123-45-67</span>
              </li>
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 mr-2 text-purple-500"
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
                <span>info@starway.ru</span>
              </li>
              <li class="flex items-start">
                <svg
                  class="h-6 w-6 mr-2 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>г. Москва, ул. Танцевальная, 1</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white mb-4">Подписка</h3>
            <p class="mb-4">
              Подпишитесь на нашу рассылку для получения новостей о мероприятиях
            </p>
            <form class="flex">
              <input
                type="email"
                placeholder="Ваш email"
                class="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900"
              />
              <button
                type="submit"
                class="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition duration-300"
              >
                Подписаться
              </button>
            </form>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; 2025 Star Way. Все права защищены.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const allMClasses = ref([]);
const loading = ref(true);

// Функция открытия ссылки на Telegram
const openTelegramLink = () => {
  window.open('https://t.me/mosyakin_ilya ', '_blank', 'noopener noreferrer');
};

// Получение отображаемых мастер-классов
const featuredMClasses = computed(() => {
  return allMClasses.value.slice(0, 3);
});

// Форматирование стоимости
const formatCost = (cost) => {
  return cost.toLocaleString('ru-RU') + ' ₽';
};

// Обрезка описания
const truncateDescription = (description) => {
  return description.length > 100
    ? description.slice(0, 100) + '...'
    : description;
};

// Загрузка мастер-классов
const fetchMClasses = async () => {
  try {
    const response = await fetch('https://igor-plaxin.ru/star-way/mclass ', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });

    if (!response.ok) throw new Error('Ошибка загрузки мастер-классов');

    const data = await response.json();
    allMClasses.value = data.map((mclass) => ({
      id: mclass.id,
      name: mclass.name || '',
      description: mclass.description || '',
      cost: mclass.cost || 0,
    }));
  } catch (error) {
    console.error('Ошибка при загрузке мастер-классов:', error);
  } finally {
    loading.value = false;
  }
};

// Скролл к разделу мастер-классов
const scrollToMClasses = () => {
  const section = document.getElementById('mclasses');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

// Скролл к регистрации
const scrollToRegistration = () => {
  const section = document.getElementById('registration');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

// Загрузка данных при монтировании
onMounted(() => {
  fetchMClasses();
});
</script>
