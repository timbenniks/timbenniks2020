import DefaultLayout from '~/layouts/Default.vue'
import PrismicTextComponent from '~/components/prismic-single-text.vue'

// Prismic stuff
import { common } from 'prismic-vue/components/common'
import linkResolver from '~/prismic/linkResolver'
import htmlSerializer from '~/prismic/htmlSerializer'
import {
  asRichText,
  asText,
  toType,
  asLink,
  asDay,
  asMonth,
  asYear,
} from '~/prismic/methods'

import './styles/index.scss'

export default function (Vue, { router, head, isClient }) {
  Vue.prototype.$prismic = {
    linkResolver,
    htmlSerializer,
    asRichText,
    asText,
    toType,
    asLink,
    asDay,
    asMonth,
    asYear,
  }

  Vue.component('Layout', DefaultLayout)
  Vue.component(PrismicTextComponent.name, PrismicTextComponent)

  Object.entries(common).forEach(([_, component]) => {
    Vue.component(component.name, component)
  })

  head.meta.push({
    name: 'google-site-verification',
    content: 'El5Wtr19CHQY1u_sQOjbuusrXqYCt6I6n3OJSyZEPAg',
  })
  head.meta.push({
    property: 'og:type',
    content: 'website',
  })
  head.meta.push({
    property: 'og:site_name',
    content: 'timbenniks',
  })
  head.meta.push({
    property: 'og:image',
    content: 'https://timbenniks.nl/icon.png',
  })
  head.meta.push({
    property: 'twitter:image',
    content: 'https://timbenniks.nl/icon.png',
  })

  head.meta.push({
    name: 'author',
    content: 'Tim Benniks',
  })

  head.link.push({
    rel: 'icon',
    type: 'image/x-icon',
    href: '/favicon.ico',
  })
  head.link.push({
    rel: 'preconnect',
    href: 'https://www.google-analytics.com',
  })
  // head.link.push({
  //   rel: 'preconnect',
  //   href: 'https://i.twic.pics',
  // })
  head.link.push({
    rel: 'preload',
    as: 'font',
    href: 'https://fonts.googleapis.com/css?family=Lato:400,900&display=swap',
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Lato:400,900&display=swap',
  })

  // head.script.push({ src: 'https://i.twic.pics/v1/script', async: '' })

  router.beforeEach((to, _from, next) => {
    const url = `https://timbenniks.nl/${to.path}`

    head.meta.push({
      key: 'og:url',
      name: 'og:url',
      content: url,
    })

    head.link.push({
      rel: 'canonical',
      href: url,
    })

    next()
  })
}