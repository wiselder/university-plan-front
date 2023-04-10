// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    autoImport: false
  },

  typescript: {
    strict: true
  },

  experimental: {
    inlineSSRStyles: false,
  },

  components: [{
    path: '~/components',
    pathPrefix: false, 
  }],                 

  css: [
    '@unocss/reset/tailwind.css'
  ],

  modules: [
    ['@unocss/nuxt', {
      uno: true, 
      icons: false,
      attributify: true,
      shortcuts: [],
      rules: [],
      safelist: []
    }]
  ]
})