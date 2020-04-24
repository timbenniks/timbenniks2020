import { RichText, Link } from 'prismic-dom'
import linkResolver from './linkResolver'
import htmlSerializer from './htmlSerializer'

export function asRichText(field) {
  return RichText.asHtml(field, linkResolver, htmlSerializer)
}

export function asText(field) {
  return RichText.asText(field, linkResolver, htmlSerializer)
}

export function asLink(field) {
  return Link.url(field, linkResolver)
}

export function asDay(date) {
  const day = new Date(date).getDate().toString()
  return day.padStart(2, '0')
}

export function asMonth(date) {
  return new Date(date).toLocaleString('en-us', { month: 'short' }).toString()
}

export function asYear(date) {
  return new Date(date).getFullYear().toString()
}

export function asDate(date) {
  console.log(date)
  return new Date(date)
    .toLocaleString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    .toString()
}

export function toType(type) {
  switch (type) {
    case RichText.Elements.heading1:
      return 'h1'
      break
    case RichText.Elements.heading2:
      return 'h2'
      break
    case RichText.Elements.heading3:
      return 'h3'
      break
    case RichText.Elements.heading4:
      return 'h4'
      break
    case RichText.Elements.heading5:
      return 'h5'
      break
    case RichText.Elements.heading6:
      return 'h6'
      break
    case RichText.Elements.paragraph:
      return 'p'
      break
    case RichText.Elements.preformatted:
      return 'pre'
      break
    case RichText.Elements.strong:
      return 'strong'
      break
    case RichText.Elements.em:
      return 'em'
      break
    case RichText.Elements.listItem:
      return 'li'
      break
    case RichText.Elements.oListItem:
      return 'li'
      break
    case RichText.Elements.list:
      return 'ul'
      break
    case RichText.Elements.oList:
      return 'ol'
      break
    case RichText.Elements.image:
      return 'img'
      break
    case RichText.Elements.embed:
      return 'embed'
      break
    case RichText.Elements.hyperlink:
      return 'a'
      break
    case RichText.Elements.label:
      return 'label'
      break
    case RichText.Elements.span:
      return 'span'
      break
    default:
      break
  }
}
