<template>
  <Layout>
    <div class="content-wrapper blogpost">
      <navigation />

      <main id="main-content">
        <heading
          :title="$page.about.data.title"
          :subtitle="$page.about.data.sub_title"
          :breadcrumb="true"
          titletag="h1"
          subtitletag="h2"
          :use-fancy-titles="true"
        />

        <div
          ref="body"
          class="post-content"
          v-html="$page.about.data.content"
        ></div>
      </main>
    </div>
  </Layout>
</template>

<page-query>
query {
  about: prismicSinglePage(id:"about-tim-benniks") {
    uid
    slug
    data {
      title
      sub_title
      content
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

<script>
import LinkMixin from '../mixins/linkMixin'
import IframeMixin from '../mixins/iframeMixin'
import ImageMixin from '../mixins/imageMixin'
import SyntaxHighlighterMixin from '../mixins/syntaxHighlighterMixin'
import Navigation from '../components/navigation.vue'
import Heading from '../components/heading.vue'
import mapMetaInfo from '../prismic/mapMetaInfo'

export default {
  components: {
    Navigation,
    Heading,
  },
  metaInfo() {
    return mapMetaInfo(
      {
        id: this.$page.about.id,
        last_publication_date: this.$page.about.last_publication_date,
        ...this.$page.about.data,
      },
      'writing',
      this.$router.currentRoute
    )
  },
  mixins: [LinkMixin, IframeMixin, ImageMixin, SyntaxHighlighterMixin],
}
</script>

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
