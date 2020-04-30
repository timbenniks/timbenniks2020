import prismicDOM from 'prismic-dom'
import linkResolver from './linkResolver'
import { getSrcSet } from './imageTools'

const Elements = prismicDOM.RichText.Elements

export default function (type, element, content, children) {
  if (type === Elements.hyperlink) {
    let result = ''
    const url = prismicDOM.Link.url(element.data, linkResolver)

    console.log(url)

    if (element.data.link_type === 'Document') {
      result = `<a href="${url}" data-internal-link>${content}</a>`
    } else {
      const target = element.data.target
        ? `target="'${element.data.target}'" rel="noopener"`
        : ''
      result = `<a href="${url}" ${target}>${content}</a>`
    }
    return result
  }

  if (type === Elements.image) {
    let result = `
      <figure style="--aspect-ratio:${element.dimensions.width}/${
      element.dimensions.height
    };">
        <img
          data-srcset="${getSrcSet(element.url, [
            300,
            400,
            500,
            600,
            700,
            800,
          ])}"
          data-sizes="(max-width: 700px) 90vw, (min-width: 880px) 800px"
          alt="${element.alt}"
          title="${element.alt}"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          class="twic"
        />
        <figcaption>${element.alt}</figcaption>
      </figure>
      `

    return result
  }

  if (type === Elements.heading3) {
    return `<h3 class="fancy-title red">${element.text}</h3>`
  }

  if (type === Elements.heading4) {
    return `<h4 class="fancy-title blue-main">${element.text}</h4>`
  }

  if (type === Elements.embed) {
    let result = ''

    if (element.oembed.provider_name === 'YouTube') {
      result = `
        <figure style="--aspect-ratio:16/9;">
          <iframe 
            width="16" 
            height="9" 
            allowfullscreen 
            frameborder="0" 
            data-src="${element.oembed.embed_url.replace(
              'watch?v=',
              'embed/'
            )}"></iframe>
        </figure>
      `
    }

    if (element.oembed.provider_name === 'article') {
      result = `
        <figure style="--aspect-ratio:16/9;">
          <iframe 
            width="16" 
            height="9" 
            allowfullscreen 
            frameborder="0" 
            data-src="${element.oembed.embed_url}"></iframe>
        </figure>
      `
    }

    if (element.oembed.provider_name === 'Tims_Strava') {
      result = `
        <p class="for-small-screens">Strava embeds do not work on small screens. Click <a title="direct strava link" href="${element.oembed.embed_url}" target="_blank" rel="noopener">here</a> for the direct strava link.</p>  
        <figure style="--aspect-ratio:590/293;" class="strava-embed">
          <iframe
            width="590"
            height="293"
            allowfullscreen
            frameborder="0"
            data-src="${element.oembed.embed_url}"></iframe>
        </figure>
      `
    }

    return result
  }

  return null
}
