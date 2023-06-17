import secretInfos from '../../secret-infos.json';

import VueGtag, { trackRouter } from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGtag, {
        property: {
            id: secretInfos.gtag.id
        }
    })
    trackRouter(useRouter())
})