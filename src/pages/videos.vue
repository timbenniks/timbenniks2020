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

        <div class="filters">
          <button
            v-for="tag in tags"
            :key="tag.tag"
            class="filter"
            :class="{ selected: tag.selected }"
            @click="tagClick(tag)"
          >
            {{ tag.tag }}

            <span v-if="tag.selected" class="selected"><span>+</span></span>
          </button>
        </div>
        <div class="posts videos">
          <article
            v-for="video in filteredVideos"
            :key="video.slug"
            class="post video"
          >
            <g-link :to="`/videos/${video.slug}/`">
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
                <span v-for="tag in video.tags" :key="tag">
                  {{ tag }}
                </span>
              </p>
              <p class="post-title">
                <g-link :to="`/videos/${video.slug}/`">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Navigation,
    Heading,
    LazyImage,
  },

  metaInfo() {
    return mapMetaInfo(this.$page.Prismic.videos, 'videos')
  },

  computed: mapGetters(['filteredVideos', 'tags']),

  mounted() {
    this.setInitalVideos(this.$page.Prismic.allVideos.edges)
  },

  methods: {
    tagClick(tag) {
      this.filter(tag)
    },

    ...mapActions(['setInitalVideos', 'setInitalTags', 'filter']),
  },
}
</script>

<style lang="scss" scoped>
.filters {
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
    padding: 0.2rem 0.3rem;
    margin: 0 0.5rem 0 0;
    cursor: pointer;

    span.selected {
      display: inline-block;
      background: $blue-light;
      color: $white;
      padding: rem(0 3px);
      margin: rem(0 0 0 4px);

      span {
        transform: rotate(45deg);
        transform-origin: center;
        display: block;
      }
    }

    &:hover,
    &.selected {
      background: $grey-light;
      color: $blue;

      &:focus {
        outline: 1px solid $blue;
        background: $grey-light-alt;
      }
    }

    &:focus {
      outline: 1px solid $white;
    }
  }
}

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
      font-weight: 400;
      color: darken($blue-light, 20);
      font-size: 0.8rem;
      text-transform: uppercase;
      margin: rem(0 0 10px 0);

      span {
        margin: 0 0.5rem 0 0;
        display: inline-block;
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
