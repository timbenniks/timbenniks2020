<template>
  <Layout>
    <div class="content-wrapper writings">
      <navigation />

      <main id="main-content">
        <heading
          :breadcrumb="true"
          titletag="h1"
          :title="$page.Prismic.videos.title"
        />

        <div class="posts videos">
          <article
            v-for="post in $page.Prismic.allVideos.edges"
            :key="post.node._meta.uid"
            class="post video"
          >
            <lazy-image
              ratio="16/9"
              :alt="$prismic.asText(post.node.title)"
              :url="post.node.image.url"
              :caption="false"
              :widths="[300, 400, 500, 600, 680]"
              sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
            />

            <div class="post-content-wrap">
              <p class="post-title">
                <g-link :to="`/videos/${post.node._meta.uid}/`">
                  {{ $prismic.asText(post.node.title) }}
                </g-link>
              </p>
              <p class="post-description">
                <span class="post-date">
                  {{ $prismic.asDay(post.node.publication_date) }}
                  {{ $prismic.asMonth(post.node.publication_date) }}
                  {{ $prismic.asYear(post.node.publication_date) }}
                </span>
              </p>
            </div>
          </article>
          <article
            v-for="post in $page.Prismic.allVideos.edges"
            :key="post.node._meta.uid"
            class="post video"
          >
            <lazy-image
              ratio="16/9"
              :alt="$prismic.asText(post.node.title)"
              :url="post.node.image.url"
              :caption="false"
              :widths="[300, 400, 500, 600, 680]"
              sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
            />

            <div class="post-content-wrap">
              <p class="post-title">
                <g-link :to="`/videos/${post.node._meta.uid}/`">
                  {{ $prismic.asText(post.node.title) }}
                </g-link>
              </p>
              <p class="post-description">
                <span class="post-date">
                  {{ $prismic.asDay(post.node.publication_date) }}
                  {{ $prismic.asMonth(post.node.publication_date) }}
                  {{ $prismic.asYear(post.node.publication_date) }}
                </span>
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
    allVideos {
      edges {
        node {
          _meta {
            uid
            tags
          }
          title
          publication_date
          image
        }
      }
    },
    videos(uid: "videos", lang: "en-us") {
      title
      body {
        ... on Prismic_VideosBodyGeneral_card {
          type
          primary {
            title
            description
            image
          }
        }
        ... on Prismic_VideosBodyTwitter_card {
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
    return mapMetaInfo(this.$page.Prismic.videos, 'videos')
  },
}
</script>

<style lang="scss" scoped>
.videos {
  display: grid;
  grid-gap: 1rem;

  @include responsive(
    'grid-template-columns',
    (
      xs: 100%,
      s: 50% 50%,
      m: 33% 33% 33%,
      l: 25% 25% 25% 25%,
    )
  );

  .video {
    width: auto;
    margin: 0;

    figure {
      float: none;
      width: 100%;
      height: auto;
      margin: rem(0 0 16px 0);
    }
  }
}

.post-date {
  font-weight: 400;
  float: none;
  margin: 0;
}
</style>
