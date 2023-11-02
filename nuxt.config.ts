// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    }
  },
  css: ["@/assets/scss/main.scss"],
  devtools: {
    enabled: true, 
    timeline: {
      enabled: true
    }
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-icon", "@nuxt/image"]
})