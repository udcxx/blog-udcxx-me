// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  srcDir: 'src/',

  app: {
      head: {
          title: "無趣味の戯言",
          meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { name: 'description', content: '無趣味なりにつらつらと戯言を。フロントエンドと車にちょっぴり興味あり。'},
              { hid: 'og:site_name', property: 'og:site_name', content: '無趣味の戯言' },
              { name: 'og:image', content: '/images/blog-card.png'},
              { name: 'twitter:card', content: 'summary_large_image' },
              { name: 'twitter:site', content: '@udc_xx' },
              { name: 'twitter:creator', content: '@udc_xx' },
          ],
          link: [
              { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
              { rel: 'stylesheet', href: '/highlight/highlightjs.min.css'}
          ],
          script: [
              { src: '/highlight/highlight.min.js'}
          ]
      }
  },

  css: [
      'assets/css/font-bizudpgothic.css',
      'assets/css/font-notocoloremoji.css',
      'assets/css/common.scss'
  ],

  vite: {
      css: {
          preprocessorOptions: {
              scss: {
                  additionalData: '@import "@/assets/css/_vars.scss";',
              }
          }
      }
  },

  nitro: {
      prerender: {
          failOnError: false,
          routes: ['/sitemap.xml']
      }
  },

  routeRules: {
    '/feed.xml': {
        headers: { 'content-type': 'application/rss+xml; charset=UTF-8' },
    }
  },

  modules: [
    '@nuxt/content',
    ['@nuxtjs/google-adsense', { id: 'ca-pub-1301045842322864' }],
    '@nuxt/image'
  ],

  typescript: {
      strict: false
  },

  content: {
      documentDriven: true
  },

  compatibilityDate: '2024-08-29'
})