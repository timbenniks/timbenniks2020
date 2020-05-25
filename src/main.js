import DefaultLayout from '~/layouts/Default.vue'
import Store from './store'
import gridsomeConfig from '../gridsome.config'
import { asDay, asMonth, asYear, asLink } from '~/prismic/methods'
import './styles/index.scss'

export default function (Vue, { head, appOptions }) {
  Vue.prototype.$prismic = {
    asDay,
    asMonth,
    asYear,
    asLink,
  }

  appOptions.store = Store

  Vue.component('Layout', DefaultLayout)

  head.meta.push({
    name: 'google-site-verification',
    content: 'El5Wtr19CHQY1u_sQOjbuusrXqYCt6I6n3OJSyZEPAg',
  })

  head.meta.push({
    property: 'og:site_name',
    content: gridsomeConfig.siteName,
  })

  head.meta.push({
    property: 'twitter:card',
    content: 'summary_large_image',
  })

  head.meta.push({
    property: 'twitter:handle',
    content: 'timbenniks',
  })

  head.meta.push({
    property: 'twitter:creator',
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
    rel: 'preconnect',
    href: 'https://www.google-analytics.com',
  })

  head.link.push({
    rel: 'preconnect',
    href: 'https://images.prismic.io',
  })

  head.link.push({
    rel: 'alternate',
    type: 'application/rss+xml',
    title: 'Tim Benniks Feed',
    href: 'https://timbenniks.nl/feed.xml',
  })
}
