<template>
  <Layout>
    <div class="content-wrapper blogpost">
      <navigation />
      <main id="main-content">
        <div class="video-header">
          <figure class="youtube" style="--aspect-ratio: 16/9;">
            <iframe
              width="16"
              height="9"
              allowfullscreen
              frameborder="0"
              :data-src="
                $page.video.data.video_embed.embed_url.replace(
                  'watch?v=',
                  'embed/'
                ) + '?autoplay=1'
              "
            ></iframe>
          </figure>
        </div>
        <heading
          :title="$page.video.data.title"
          :breadcrumb="true"
          titletag="h1"
          :use-fancy-titles="true"
        />
        <div class="filters">
          <g-link
            v-for="tag in $page.video.tags"
            :key="tag"
            :to="`/videos/?tag=${tag}`"
            class="filter"
          >
            {{ tag }}
          </g-link>
        </div>

        <div
          ref="body"
          class="post-content"
          v-html="$page.video.data.content"
        ></div>

        <related-videos :videos="filteredVideos" />
      </main>
    </div>
  </Layout>
</template>

<script>
import LinkMixin from '../mixins/linkMixin'
import IframeMixin from '../mixins/iframeMixin'
import ImageMixin from '../mixins/imageMixin'
import Navigation from '../components/navigation.vue'
import Heading from '../components/heading.vue'
import RelatedVideos from '../components/related-videos.vue'
import mapMetaInfo from '../prismic/mapMetaInfo'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Navigation,
    Heading,
    RelatedVideos,
  },
  metaInfo() {
    return mapMetaInfo(
      {
        id: this.$page.video.id,
        last_publication_date: this.$page.video.last_publication_date,
        ...this.$page.video.data,
      },
      'video',
      this.$router.currentRoute
    )
  },
  mixins: [LinkMixin, IframeMixin, ImageMixin],
  computed: mapGetters(['filteredVideos']),
  created() {
    this.setInitalVideos(this.$static.videos.edges)
    this.$page.video.tags.forEach((tag) => {
      this.filter({ tag, selected: true })
    })
  },
  mounted() {},
  methods: {
    ...mapActions(['setInitalVideos', 'filter']),
  },
}
</script>

<page-query>
query Video ($id: ID!) {
  video: prismicVideo(id: $id) {
    uid
    tags
    id
    slug
    last_publication_date
    data {
      publication_date
      title
      content
      video_embed {
        width
        height
        embed_url
        type
        title
        author_name
        author_url
        provider_name
        provider_url
        html
      }
      social_cards {
        type
        content {
          title
          description
          image
        }
      }
    }
  }
}
</page-query>

<static-query>
query {
  videos: allPrismicVideo(sortBy: "data.publication_date", order: DESC) {
    edges {
      node {
        slug
        tags
        data {
          title
          publication_date
          image {
            url
          }
        }
      }
    }
  }
}
</static-query>

<style lang="scss">
.blogpost .heading {
  margin: rem(0 auto 20px) !important;
  max-width: rem(800px);
}

.video-header {
  width: 100%;
  height: auto;
  max-width: rem(1440px);
  margin: 0 auto 3.75rem;
}

.post-content {
  max-width: rem(800px);
  margin: 3rem auto;

  p,
  li {
    line-height: 1.8;
    font-size: rem(18px);
    letter-spacing: 0.04em;
  }

  blockquote {
    border-left: 3px solid $blue-light;
    background: $blue-main;
    padding: rem(0 0 0 10px);

    p {
      font-size: rem(16px);
      font-style: italic;
    }
  }

  figure {
    margin: rem(0 0 32px);
    display: block;
    background: $blue-main;
    position: relative;
    border-bottom: 3px solid $blue-light;

    figcaption {
      position: absolute;
      bottom: 0;
      background: rgba($blue-main, 0.8);
      padding: rem(3px 7px);
      font-size: inherit;
      font-size: rem(16px);
    }
  }
}
</style>
