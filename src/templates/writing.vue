<template>
  <Layout>
    <div class="content-wrapper blogpost">
      <navigation />

      <main id="main-content">
        <heading
          :title="$page.Prismic.writing.title"
          :subtitle="$page.Prismic.writing.sub_title"
          :breadcrumb="true"
          titletag="h1"
          subtitletag="h2"
          :use-fancy-titles="false"
        />

        <prismic-rich-text
          ref="body"
          class="post-content"
          :field="$page.Prismic.writing.content"
        />
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
    return mapMetaInfo(this.$page.Prismic.writing, 'writing')
  },
  mixins: [LinkMixin, IframeMixin, ImageMixin],
}
</script>

<page-query>
query Writing ($uid: String!) {
  Prismic {
    writing(uid: $uid, lang: "en-us") {
      publication_date
      title
      sub_title
      content
      image
      _meta {
        firstPublicationDate
        lastPublicationDate
        uid
      }
      body {
        ... on Prismic_WritingBodyGeneral_card {
          type
          primary {
            title
            description
            image
          }
        }
        ... on Prismic_WritingBodyTwitter_card {
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

  h1,
  h2 {
    line-height: 1.2;
  }
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
