import DefaultLayout from '~/layouts/Default.vue'
import PrismicTextComponent from '~/components/prismic-single-text.vue'
import Store from './store'
import VueAnalytics from 'vue-analytics'

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
  asDate,
} from '~/prismic/methods'

import gridsomeConfig from '../gridsome.config'

import './styles/index.scss'

export default function (Vue, { router, head, appOptions }) {
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
    asDate,
  }

  appOptions.store = Store

  Vue.component('Layout', DefaultLayout)
  Vue.component(PrismicTextComponent.name, PrismicTextComponent)

  Object.entries(common).forEach(([_, component]) => {
    Vue.component(component.name, component)
  })

  Vue.use(VueAnalytics, {
    id: 'UA-XXX-X',
    router,
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
    content: gridsomeConfig.siteName,
  })

  head.meta.push({
    property: 'twitter:card',
    content: 'summary',
  })

  head.meta.push({
    property: 'twitter:handle',
    content: 'timbenniks',
  })

  head.meta.push({
    name: 'author',
    content: gridsomeConfig.siteName,
  })

  head.meta.push({
    name: 'robots',
    content: 'index, follow',
  })

  head.link.push({
    rel: 'icon',
    type: 'image/x-icon',
    href: `${gridsomeConfig.siteUrl}/${gridsomeConfig.icon}`,
  })

  head.link.push({
    rel: 'preconnect',
    href: 'https://www.google-analytics.com',
  })

  head.link.push({
    rel: 'preconnect',
    href: 'https://images.prismic.io',
  })

  head.link.push({
    rel: 'preload',
    as: 'font',
    href: 'https://fonts.googleapis.com/css?family=Lato:400,900&display=swap',
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Lato:400,900&display=swap',
  })
}
