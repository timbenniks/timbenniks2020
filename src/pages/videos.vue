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
            v-for="video in filteredVideos"
            :key="video._meta.uid"
            class="post video"
          >
            <g-link :to="`/videos/${video._meta.uid}/`">
              <lazy-image
                ratio="16/9"
                :alt="$prismic.asText(video.title)"
                :url="video.image.url"
                :caption="false"
                :widths="[300, 400, 500, 600, 680]"
                sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
              />
            </g-link>

            <div class="post-content-wrap">
              <p class="post-tags">
                <button
                  v-for="tag in video._meta.tags"
                  :key="tag"
                  class="tag"
                  @click="filter(tag)"
                >
                  {{ tag }}
                </button>
              </p>
              <p class="post-title">
                <g-link :to="`/videos/${video._meta.uid}/`">
                  {{ $prismic.asText(video.title) }}
                </g-link>
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
  computed: {
    filteredVideos: {
      get: function () {
        return this.$page.Prismic.allVideos.edges.map((edge) => {
          return edge.node
        })
      },
      set: function (newValue) {
        this.filteredVideos = newValue
      },
    },
    tags: function () {
      const tags = []
      this.$page.Prismic.allVideos.edges.forEach((edge) => {
        edge.node._meta.tags.forEach((tag) => {
          if (!tags.find((t) => t.tag === tag)) {
            tags.push({ tag, selected: false })
          }
        })
      })

      return tags
    },
  },
  methods: {
    filter(tag) {
      this.filteredVideos = []

      this.tags.find((t) => t.tag === tag).selected = !this.tags.find(
        (t) => t.tag === tag
      ).selected

      this.$page.Prismic.allVideos.edges.forEach((edge) => {
        edge.node._meta.tags.forEach((tag) => {
          const tagFound = this.tags.find((t) => t.tag === tag)
          if (tagFound.selected) {
            this.filteredVideos.push(edge.node)
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.videos {
  display: grid;
  grid-gap: 1rem;
  min-width: 0;

  // prettier-ignore
  @include responsive('grid-template-columns', (xs: 100%, s: repeat(2, 47.5%), m: repeat(3, 32%)));

  .video {
    width: auto;
    margin: 0;

    figure {
      float: none;
      width: 100%;
      height: auto;
      margin: rem(0 0 16px 0);
    }

    .post-tags {
      margin: 0 0 0.7rem 0;

      button {
        background: none;
        padding: 0;
        border: none;
        appearance: none;
        color: $white;
        background: $blue-light;
        text-transform: uppercase;
        font-weight: 600;
        padding: 0.2rem;
        margin: 0 0.5rem 0 0;
        cursor: pointer;

        &:hover {
          background: $grey-light;
          color: $blue;
        }
      }
    }

    .post-date {
      font-weight: 400;
      float: none;
      margin: 0;
      font-size: 1rem;
    }

    .post-title {
      font-size: 1rem;
      line-height: 1.3;
    }
  }
}
</style>
