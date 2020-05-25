<template>
  <Layout>
    <div class="content-wrapper home">
      <navigation />

      <main id="main-content">
        <div class="homepage">
          <lazy-image
            ratio="1/1"
            :alt="$page.home.data.main_title"
            :url="$page.home.data.image.url"
            extra-class="opacity-only"
            :caption="false"
            :widths="[200]"
            sizes="200px"
          />

          <div class="home-copy-wrapper">
            <fancy-title
              :field="$page.home.data.main_title"
              tag="h1"
              color="red"
              type="large"
              :offset="[0, 1]"
              :uppercase="true"
            />

            <fancy-title
              :field="$page.home.data.sub_title"
              tag="h2"
              color="blue-main"
              type="small"
              :offset="[-0.18, 0]"
              :uppercase="true"
            />

            <div
              class="homepage-description"
              v-html="$page.home.data.description"
            />
          </div>
        </div>
      </main>
    </div>
  </Layout>
</template>

<page-query>
query {
  home: prismicSinglePage(id:"home") {
    uid,
    slug,
    data {
      main_title
      sub_title
      description
      image {
        dimensions {
          width
          height
        }
        alt
        url
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

<script>
import Navigation from '../components/navigation.vue'
import FancyTitle from '../components/fancy-title.vue'
import LazyImage from '../components/lazy-image.vue'
import LinkMixin from '../mixins/linkMixin'
import mapMetaInfo from '../prismic/mapMetaInfo'

export default {
  components: {
    Navigation,
    LazyImage,
    FancyTitle,
  },
  mixins: [LinkMixin],
  metaInfo() {
    return mapMetaInfo(this.$page.home.data, 'home', this.$router.currentRoute)
  },
}
</script>

<style lang="scss">
.homepage {
  max-width: rem(800px);

  // prettier-ignore
  @include responsive('width', (xs: 100%, m: 80%));
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

  .homepage-description {
    // prettier-ignore
    @include responsive('margin', (xs: rem(0), m: 0));
    // prettier-ignore
    @include responsive('padding', (xs: rem(0 0 0 1rem)));
    // prettier-ignore
    @include responsive('width', (xs: 90%));
  }

  p {
    // prettier-ignore
    @include responsive('text-align', (xs: left, m: left));
    // prettier-ignore
    @include responsive('font-size', (xs: rem(20px), m: rem(24px)));
  }

  h1 {
    z-index: 2;
  }

  h2 {
    z-index: 1;
  }

  figure {
    position: relative;
    top: rem(20px);
    left: rem(20px);

    // prettier-ignore
    @include responsive('width', (xs: rem(100px), m: rem(140px)));

    img {
      border-radius: 100%;
      border: 5px solid $white;
    }
  }
}
</style>
