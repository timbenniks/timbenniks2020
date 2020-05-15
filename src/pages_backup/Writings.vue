<template>
  <Layout>
    <div class="content-wrapper writings">
      <navigation />

      <main id="main-content">
        <heading
          :breadcrumb="true"
          titletag="h1"
          :title="$page.Prismic.writings.title"
          :uppercase="true"
        />

        <div class="posts">
          <article
            v-for="post in $page.Prismic.allWritings.edges"
            :key="post.node._meta.uid"
            class="post"
          >
            <g-link :to="`/writings/${post.node._meta.uid}/`">
              <lazy-image
                ratio="16/9"
                :alt="$prismic.asText(post.node.title)"
                :url="post.node.image.url"
                :caption="false"
                :widths="[300, 400, 500, 600, 680]"
                sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
              />
            </g-link>

            <div class="post-content-wrapper">
              <p class="post-title fancy-title red">
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
    allWritings(sortBy:publication_date_DESC) {
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
import LazyImage from '../components/lazy-image.vue'
import mapMetaInfo from '../prismic/mapMetaInfo'

export default {
  components: {
    Navigation,
    Heading,
    LazyImage,
  },
  metaInfo() {
    return mapMetaInfo(
      this.$page.Prismic.writings,
      'writings',
      this.$router.currentRoute
    )
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
