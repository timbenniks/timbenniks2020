<template>
  <Layout>
    <div class="content-wrapper home">
      <navigation />

      <main id="main-content">
        <div class="homepage">
          <lazy-image
            ratio="1/1"
            :alt="$prismic.asText($page.Prismic.home.main_title)"
            :url="$page.Prismic.home.image.url"
            extra-class="opacity-only"
            :caption="false"
            :widths="[200]"
            sizes="130px"
          />

          <div class="home-copy-wrapper">
            <fancy-title
              :field="$page.Prismic.home.main_title"
              tag="h1"
              color="blue-main"
              type="big"
              offset="0"
              :uppercase="true"
            />

            <fancy-title
              :field="$page.Prismic.home.sub_title"
              tag="h2"
              color="red"
              type="medium"
              offset="0"
              :uppercase="true"
            />

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
import FancyTitle from '../components/title.vue'
import LazyImage from '../components/lazy-image.vue'
import LinkMixin from '../prismic/linkMixin'
import mapMetaInfo from '../prismic/mapMetaInfo'

export default {
  components: {
    Navigation,
    LazyImage,
    FancyTitle,
  },
  mixins: [LinkMixin],
  metaInfo() {
    return mapMetaInfo(this.$page.Prismic.home, 'home')
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
  text-align: center;

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
      border: 3px solid $white;
    }
  }
}
</style>
