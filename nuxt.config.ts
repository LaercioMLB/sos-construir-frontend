// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/seo', '@nuxt/image'],
  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],
  site: { url: 'https://sosconstruir.com.br', name: 'SOS Construir' },
  ui: {
    colorMode: false,
  },
  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',
  vite: {
    optimizeDeps: {
      include: ['@vueuse/core'],
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
})
