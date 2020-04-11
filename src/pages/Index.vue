<template>
  <Layout>
    <div class="content-wrapper home">
      <navigation />

      <main id="main-content">
        <div class="homepage">
          <g-image alt="Tim Benniks" src="~/assets/tim.png" />
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

export default {
  components: {
    Navigation,
  },
  mixins: [LinkMixin],
  metaInfo() {
    return {
      title: 'Tim Benniks, web-developer, speaker, Parisian',
      meta: [
        {
          name: 'description',
          property: 'og:description',
          content:
            'This is the personal website of Tim Benniks. This is the place where you can find my public speaking schedule and where I share my opinions.',
          hid: 'description',
        },
        {
          property: 'og:title',
          content: 'Tim Benniks, web-developer, speaker, Parisian.',
        },
        {
          property: 'twitter:description',
          content:
            'This is the personal website of Tim Benniks. This is the place where you can find my public speaking schedule and where I share my opinions.'
        },
        { property: 'og:image', content: 'https://timbenniks.nl/icon.png' },
        {
          property: 'twitter:image',
          content: 'https://timbenniks.nl/icon.png',
        },
      ],
    }
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
    }
  }
}
</page-query>

<style lang="scss" scoped>
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