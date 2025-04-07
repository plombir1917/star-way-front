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
            'Star Way - профессиональное танцевальное ивент-агентство. Организация мероприятий, шоу-программы, мастер-классы.',
        },
        {
          name: 'keywords',
          content:
            'танцевальное агентство, ивент агентство, организация мероприятий, шоу программы, мастер классы',
        },
        { name: 'author', content: 'Star Way' },
        {
          property: 'og:title',
          content: 'Star Way - Танцевальное ивент-агентство',
        },
        {
          property: 'og:description',
          content:
            'Star Way - профессиональное танцевальное ивент-агентство. Организация мероприятий, шоу-программы, мастер-классы.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://starway.ru' },
        {
          property: 'og:image',
          content: 'https://starway.ru/android-chrome-512x512.png',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Star Way - Танцевальное ивент-агентство',
        },
        {
          name: 'twitter:description',
          content:
            'Star Way - профессиональное танцевальное ивент-агентство. Организация мероприятий, шоу-программы, мастер-классы.',
        },
        {
          name: 'twitter:image',
          content: 'https://starway.ru/android-chrome-512x512.png',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
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
