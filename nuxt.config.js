const secretInfos = require('./secret-infos');
const sourceFileArray = require('./src/_BLOG/json/summary.json');
const sourceFileArrayReplaced = sourceFileArray.sourceFileArray.map(
  function (sourceFileArray) {
    return sourceFileArray.replace('./src/_BLOG/markdown/','').replace('-','/').replace('.md','');
  }
)

export default {
  mode: 'universal',
  srcDir: 'src/',
  target: 'static',
  generate: {
    crawler: false,
    routes() {
        let routes = []
        sourceFileArrayReplaced.map(sourceFileArray => {
            routes.push(`/article/${sourceFileArray}/`)
        })
        routes.push('/tags/blog/', '/tags/vue/', '/tags/it/', '/tags/gas/', '/tags/life/', '/tags/car/', '/tags/book/');

        return routes;
     }
  },
  router: {
      trailingSlash: true
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    title: '無趣味の戯言',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:site_name', property: 'og:site_name', content: '無趣味の戯言' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@udc_xx' },
      { name: 'twitter:creator', content: '@udc_xx' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/common.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~plugins/ga.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      '@nuxtjs/google-adsense',
        {
          id: secretInfos.googlead.id,
          pageLevelAds: true
        }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
