export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: 'Star Way - Танцевальное ивент-агентство',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content:
            'Star Way - платформа для управления танцевальными мероприятиями, регистрации участников и развития творческого потенциала',
        },
        {
          name: 'keywords',
          content:
            'танцевальные мероприятия, ивент-агентство, регистрация участников, мастер-классы, танцы, творчество',
        },
        { name: 'author', content: 'Star Way' },
        {
          property: 'og:title',
          content: 'Star Way - Танцевальное ивент-агентство',
        },
        {
          property: 'og:description',
          content:
            'Платформа для управления танцевальными мероприятиями и регистрации участников',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://starway.ru' },
        { property: 'og:image', content: '/favicon.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Star Way - Танцевальное ивент-агентство',
        },
        {
          name: 'twitter:description',
          content:
            'Платформа для управления танцевальными мероприятиями и регистрации участников',
        },
        { name: 'twitter:image', content: '/favicon.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#7c3aed' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  compatibilityDate: '2025-02-15',
});
