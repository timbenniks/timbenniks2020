<template>
  <Layout>
    <div class="content-wrapper writings">
      <navigation />

      <main id="main-content">
        <heading
          :breadcrumb="true"
          titletag="h1"
          :title="$page.Prismic.writings.title"
        />

        <div class="posts">
          <article
            v-for="post in $page.Prismic.allWritings.edges"
            :key="post.node._meta.uid"
            class="post"
          >
            <figure style="--aspect-ratio: 1/1;">
              <img
                :data-src="post.node.image.url"
                :alt="post.node.title"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                class="twic"
                data-src-transform="cover=1:1"
              />
            </figure>
            <div class="post-content-wrap">
              <p class="post-title">
                <g-link :to="`/writings/${post.node._meta.uid}/`">
                  {{ $prismic.asText(post.node.title) }}
                </g-link>
              </p>
              <p class="post-description">
                <span class="post-date">
                  {{ $prismic.asDay(post.node.publication_date) }}
                  {{ $prismic.asMonth(post.node.publication_date) }}
                  {{ $prismic.asYear(post.node.publication_date) }}
                </span>
                &mdash; {{ $prismic.asText(post.node.sub_title) }}
              </p>
            </div>
          </article>
        </div>
      </main>
    </div>
  </Layout>
</template>

<page-query>
query {
  Prismic {
    allWritings {
      edges {
        node {
          _meta {
            uid
          }
          title
          sub_title
          content
          image
          publication_date
        }
      }
    },
    writings(uid: "writings", lang: "en-us") {
      title
    }
  }
}
</page-query>

<script>
import Navigation from '../components/navigation.vue'
import Heading from '../components/heading.vue'

export default {
  components: {
    Navigation,
    Heading,
  },
  metaInfo: {
    title: 'Writings',
    meta: [
      {
        name: 'description',
        property: 'og:description',
        content: 'An overview of my writings',
        hid: 'description',
      },
      {
        property: 'og:title',
        content: 'Writings',
      },
      {
        property: 'twitter:description',
        content: 'An overview of my writings',
      },
      {
        property: 'og:image',
        content: 'https://timbenniks.nl/icon.png',
      },
      {
        property: 'twitter:image',
        content: 'https://timbenniks.nl/icon.png',
      },
    ],
  },
}
</script>

<style lang="scss" scoped>
.post-date {
  font-weight: 400;
  float: none;
  margin: 0;
}
</style>
