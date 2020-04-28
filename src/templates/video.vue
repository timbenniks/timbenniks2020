<template>
  <Layout>
    <div class="content-wrapper blogpost">
      <navigation />

      <main id="main-content">
        <heading
          :title="$page.Prismic.video.title"
          :breadcrumb="true"
          titletag="h1"
          :use-fancy-titles="false"
        />

        <div class="filters">
          <g-link
            v-for="tag in $page.Prismic.video._meta.tags"
            :key="tag"
            :to="`/videos/?tag=${tag}`"
            class="filter"
          >
            {{ tag }}
          </g-link>
        </div>

        <prismic-rich-text
          ref="body"
          class="post-content"
          :field="$page.Prismic.video.content"
        />

        <figure class="youtube" style="--aspect-ratio: 16/9;">
          <iframe
            width="16"
            height="9"
            allowfullscreen
            frameborder="0"
            :data-src="
              $page.Prismic.video.video_embed.embed_url.replace(
                'watch?v=',
                'embed/'
              )
            "
          />
          <prismic-single-text
            :field="$page.Prismic.video.title"
            tag="figcaption"
          />
        </figure>
      </main>
    </div>
  </Layout>
</template>

<script>
import LinkMixin from '../prismic/linkMixin'
import IframeMixin from '../prismic/iframeMixin'
import ImageMixin from '../prismic/imageMixin'
import Navigation from '../components/navigation.vue'
import Heading from '../components/heading.vue'
import mapMetaInfo from '../prismic/mapMetaInfo'

export default {
  components: {
    Navigation,
    Heading,
  },
  metaInfo() {
    return mapMetaInfo(this.$page.Prismic.video, 'video')
  },
  mixins: [LinkMixin, IframeMixin, ImageMixin],
}
</script>

<page-query>
query Video ($uid: String!) {
  Prismic {
    video(uid: $uid, lang: "en-us") {
      publication_date
      title
      content
      image
      video_embed
      _meta {
        firstPublicationDate
        lastPublicationDate
        uid
        tags
      }
      body {
        ... on Prismic_VideoBodyGeneral_card {
          type
          primary {
            title
            description
            image
          }
        }
        ... on Prismic_VideoBodyTwitter_card {
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

<style lang="scss">
.blogpost .heading {
  margin: rem(0 auto 20px) !important;
  max-width: rem(800px);
}

.youtube {
  max-width: rem(800px);
  margin: 0 auto 0.7rem;
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
