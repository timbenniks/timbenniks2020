import { RichText } from 'prismic-dom'
import linkResolver from './linkResolver'
import htmlSerializer from './htmlSerializer'

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

export default function (fields) {
  return {
    title: getPropType(fields, 'general_card', 'title'),
    meta: [
      {
        property: 'og:title',
        content: getPropType(fields, 'general_card', 'title'),
      },
      {
        property: 'twitter:title',
        content: getPropType(fields, 'twitter_card', 'title'),
      },
      {
        name: 'description',
        content: getPropType(fields, 'general_card', 'description'),
      },
      {
        property: 'og:description',
        content: getPropType(fields, 'general_card', 'description'),
      },
      {
        property: 'twitter:description',
        content: getPropType(fields, 'twitter_card', 'description'),
      },
      {
        property: 'og:image',
        content: getPropType(fields, 'general_card', 'image'),
      },
      {
        property: 'twitter:image',
        content: getPropType(fields, 'twitter_card', 'image'),
      },
    ],
  }
}
