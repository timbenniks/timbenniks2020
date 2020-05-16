import gridsomeConfig from '../../gridsome.config'

function getPropType(fields, type, prop) {
  return fields.find((card) => card.type === type)[prop]
}

export default function (fields, pageType, route) {
  const url = `${gridsomeConfig.siteUrl}${route.path}`

  const metaData = {
    title: getPropType(fields, 'general_card', 'title'),
    link: [
      {
        rel: 'canonical',
        href: url,
      },
    ],
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

  if (pageType === 'video') {
    metaData.script = [
      {
        innerHTML: JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'VideoObject',
          name: getPropType(fields, 'general_card', 'title'),
          description: getPropType(fields, 'general_card', 'description'),
          thumbnailUrl: [getPropType(fields, 'general_card', 'image')],
          embedUrl: fields.data.video_embed.embed_url.replace(
            'watch?v=',
            'embed/'
          ),
          contentUrl: `${gridsomeConfig.siteUrl}videos/${fields.id}`,
          uploadDate: `${fields.data.last_publication_date}T00:00:00`,
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
          headline: getPropType(fields, 'general_card', 'title'),
          image: getPropType(fields, 'general_card', 'image'),
          wordcount: fields.data.content.split(' ').filter((n) => {
            return n != ''
          }).length,
          url: `${gridsomeConfig.siteUrl}writings/${fields.id}`,
          datePublished: `${fields.publication_date}T00:00:00`,
          dateCreated: `${fields.publication_date}T00:00:00`,
          dateModified: fields.last_publication_date,
          description: getPropType(fields, 'general_card', 'description'),
          publisher: {
            '@type': 'Organization',
            name: 'Tim Benniks',
            logo: {
              '@type': 'ImageObject',
              url: getPropType(fields, 'general_card', 'image'),
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
