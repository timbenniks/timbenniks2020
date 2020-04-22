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
            <twic-image
              ratio="16/9"
              :alt="$prismic.asText(post.node.title)"
              :url="post.node.image.url"
              :caption="false"
            />

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
      body {
        ... on Prismic_WritingsBodyGeneral_card {
          type
          primary {
            title
            description
            image
          }
        }
        ... on Prismic_WritingsBodyTwitter_card {
          type
          primary {
            twitter_handle
            title
            description
            image
          }
        }
        __typename
      }
    }
  }
}
</page-query>

<script>
import Navigation from '../components/navigation.vue'
import Heading from '../components/heading.vue'
import TwicImage from '../components/image.vue'
import mapMetaInfo from '../prismic/mapMetaInfo'

export default {
  components: {
    Navigation,
    Heading,
    TwicImage,
  },
  metaInfo() {
    return mapMetaInfo(this.$page.Prismic.writings, 'writings')
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
