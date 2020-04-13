<template>
  <Layout>
    <div class="content-wrapper home">
      <navigation />

      <main id="main-content">
        <div class="homepage">
          <twic-image
            ratio="1/1"
            :alt="$prismic.asText($page.Prismic.home.main_title)"
            :url="$page.Prismic.home.image.url"
            extra-class="opacity-only"
            :caption="false"
          />

          <div class="home-copy-wrapper">
            <prismic-single-text :field="$page.Prismic.home.main_title" />
            <prismic-single-text :field="$page.Prismic.home.sub_title" />
            <prismic-rich-text
              class="homepage-description"
              :field="$page.Prismic.home.description"
            />
          </div>
        </div>
      </main>
    </div>
  </Layout>
</template>

<script>
import Navigation from '../components/navigation.vue'
import LinkMixin from '../prismic/linkMixin'
import TwicImage from '../components/image.vue'
import mapMetaInfo from '../prismic/mapMetaInfo'

export default {
  components: {
    Navigation,
    TwicImage,
  },
  mixins: [LinkMixin],
  metaInfo() {
    return mapMetaInfo(this.$page.Prismic.home.body)
  },
}
</script>

<page-query>
query {
  Prismic {
    home(uid: "home", lang: "en-us"){
      main_title
      sub_title
      description
      image
      body {
      ... on Prismic_HomeBodyGeneral_card {
        type
        primary {
          title
          description
          image
        }
      }
      ... on Prismic_HomeBodyTwitter_card {
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
.homepage {
  width: 80%;
  max-width: rem(800px);

  // prettier-ignore
  @include responsive('margin', (xs: rem(45px auto 0), m: rem(0)));
  // prettier-ignore
  @include responsive('position', (xs: static, m: absolute));
  // prettier-ignore
  @include responsive('top', (m: 50%));
  // prettier-ignore
  @include responsive('left', (m: 50%));
  // prettier-ignore
  @include responsive('transform',  (xs: none, m: translate(-50%, -50%)));

  p {
    // prettier-ignore
    @include responsive('font-size', (xs: rem(18px), m: rem(24px)));
  }

  figure {
    margin: rem(0 auto 40px);

    // prettier-ignore
    @include responsive('width', (xs: rem(100px), m: rem(130px)));

    img {
      border-radius: 100%;
    }
  }
}
</style>
