import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/icon', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'Claude Code pour les nuls',
      htmlAttrs: { lang: 'fr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Les 4 concepts de Claude Code expliqués simplement, avec des analogies du quotidien.',
        },
      ],
    },
  },

  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' },
      { name: 'Space Grotesk', provider: 'google' },
    ],
  },
})
