<template>
  <Layout>
    <div class="content-wrapper writings">
      <navigation />

      <main id="main-content">
        <heading
          :breadcrumb="true"
          titletag="h1"
          :title="$page.writing.data.title"
          :uppercase="true"
        />

        <div class="posts">
          <article
            v-for="post in $page.writings.edges"
            :key="post.node.id"
            class="post"
          >
            <g-link :to="`/writings/${post.node.id}/`">
              <lazy-image
                ratio="16/9"
                :alt="post.node.data.title"
                :url="post.node.data.image.url"
                :caption="false"
                :widths="[300, 400, 500, 600, 680]"
                sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
              />
            </g-link>

            <div class="post-content-wrapper">
              <p class="post-title fancy-title red">
                <g-link :to="`/writings/${post.node.id}/`">
                  {{ post.node.data.title }}
                </g-link>
              </p>
              <p class="post-description">
                <span class="post-date">
                  {{ $prismic.asDay(post.node.data.publication_date) }}
                  {{ $prismic.asMonth(post.node.data.publication_date) }}
                  {{ $prismic.asYear(post.node.data.publication_date) }}
                </span>
                &mdash; {{ post.node.data.sub_title }}
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
  writing: prismicSinglePage(id:"writings") {
    uid,
    slug,
    data {
      title
      social_cards {
        type
        content {
          title
          description
          image
        }
      }
    }
  },
  writings: allPrismicWriting {
    edges {
      node {
        id
        slug
        uid
        data {
          publication_date
          title
          sub_title
          image {
            url
          }
        }
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
      this.$page.writing.data.social_cards,
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
