import prismicDOM from 'prismic-dom'
import linkResolver from './linkResolver'

const Elements = prismicDOM.RichText.Elements

export default function (type, element, content, children) {
  if (type === Elements.hyperlink) {
    let result = ''
    const url = prismicDOM.Link.url(element.data, linkResolver)

    if (element.data.link_type === 'Document') {
      result = `<a href="${url}" data-internal-link>${content}</a>`
    } else {
      const target = element.data.target ? `target="'${element.data.target}'" rel="noopener"` : ''
      result = `<a href="${url}" ${target}>${content}</a>`
    }
    return result
  }

  if (type === Elements.image) {
    let result = `
      <figure style="--aspect-ratio:${element.dimensions.width}/${element.dimensions.height};">
        <img
          data-src="${element.url}"
          alt="${element.alt}"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          class="twic"
        />
        <figcaption>${element.alt}</figcaption>
      </figure>
      `

    return result
  }

  return null
}
