import { RichText } from 'prismic-dom'
import linkResolver from './linkResolver'
import htmlSerializer from './htmlSerializer'
import gridsomeConfig from '../../gridsome.config'

function asText(field) {
  return RichText.asText(field, linkResolver, htmlSerializer)
}

function getPropType(fields, type, prop) {
  const field = fields.find((card) => card.type === type).primary[prop]

  if (prop === 'image') {
    return field.url
  } else {
    return asText(field)
  }
}

export default function (fields, pageType, route) {
  const url = `${gridsomeConfig.siteUrl}${route.path}`

  const metaData = {
    title: getPropType(fields.body, 'general_card', 'title'),
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
    meta: [
      {
        property: 'og:title',
        content: getPropType(fields.body, 'general_card', 'title'),
      },
      {
        property: 'twitter:title',
        content: getPropType(fields.body, 'twitter_card', 'title'),
      },
      {
        name: 'description',
        content: getPropType(fields.body, 'general_card', 'description'),
      },
      {
        property: 'og:description',
        content: getPropType(fields.body, 'general_card', 'description'),
      },
      {
        property: 'twitter:description',
        content: getPropType(fields.body, 'twitter_card', 'description'),
      },
      {
        property: 'og:image',
        content: getPropType(fields.body, 'general_card', 'image'),
      },
      {
        property: 'twitter:image',
        content: getPropType(fields.body, 'twitter_card', 'image'),
      },
      {
        property: 'og:url',
        content: url,
      },
      {
        property: 'twitter:url',
        content: url,
      },
    ],
  }

  if (pageType === 'home') {
    metaData.script = [
      {
        innerHTML: JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'Website',
          url: 'https://timbenniks.nl',
        }),
        type: 'application/ld+json',
      },
    ]
  }

  if (pageType === 'writing') {
    metaData.script = [
      {
        innerHTML: JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          headline: getPropType(fields.body, 'general_card', 'title'),
          image: getPropType(fields.body, 'general_card', 'image'),
          wordcount: asText(fields.content)
            .split(' ')
            .filter((n) => {
              return n != ''
            }).length,
          url: `https://timbenniks.nl/writings/${fields._meta.uid}`,
          datePublished: `${fields.publication_date}T00:00:00`,
          dateCreated: `${fields.publication_date}T00:00:00`,
          dateModified: fields._meta.lastPublicationDate,
          description: getPropType(fields.body, 'general_card', 'description'),
          publisher: {
            '@type': 'Organization',
            name: 'Tim Benniks',
            logo: {
              '@type': 'ImageObject',
              url: getPropType(fields.body, 'general_card', 'image'),
            },
          },
          author: {
            '@type': 'Person',
            name: 'Tim Benniks',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://google.com/article`,
          },
        }),
        type: 'application/ld+json',
      },
    ]
  }

  return metaData
}
