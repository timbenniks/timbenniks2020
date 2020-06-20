<template>
  <Layout>
    <div class="content-wrapper startpage">
      <main id="main-content">
        <lazy-image
          ratio="1/1"
          alt="Tim Benniks"
          url="https://images.prismic.io/timbenniks/375f865f-188c-4f83-9462-c8600aff4061_favicon.png?auto=compress,format&w=200"
          extra-class="opacity-only"
          :caption="false"
          :widths="[200]"
          sizes="200px"
        />

        <fancy-title
          field="Tim's startpage"
          tag="h1"
          color="red"
          type="large"
          :offset="[0, 1]"
          :uppercase="true"
        />

        <YTStats />

        <ul class="quicklinks">
          <quick-link
            url="https://instagram.com"
            label="Instagram"
            image="instagram.png"
          />
          <quick-link
            url="https://facebook.com"
            label="Facebook"
            image="facebook.png"
          />
          <quick-link
            url="https://reddit.com"
            label="Reddit"
            image="reddit.png"
          />
          <quick-link
            url="https://amazon.com"
            label="Amazon"
            image="amazon.png"
          />
          <quick-link
            url="https://linkedin.com"
            label="LinkedIn"
            image="linkedin.png"
          />
          <quick-link url="https://app.put.io" label="Put.io" image="put.png" />
          <quick-link
            url="https://netlify.com"
            label="Netlify"
            image="netlify.png"
          />
          <quick-link
            url="https://gitlab.com"
            label="Gitlab"
            image="gitlab.png"
          />
          <quick-link
            url="https://github.com"
            label="Github"
            image="github.png"
          />
          <quick-link
            url="https://trello.com/timbenniks/boards"
            label="Trello"
            image="trello.png"
          />
          <quick-link
            url="https://web.whatsapp.com"
            label="WhatsApp"
            image="whatsapp.png"
          />
          <quick-link url="https://gmail.com" label="Gmail" image="gmail.png" />
          <quick-link
            url="https://twitter.com"
            label="Twitter"
            image="twitter.png"
          />
          <quick-link
            url="https://youtube.com"
            label="youtube"
            image="youtube.png"
          />
          <quick-link
            url="https://timbenniks.nl"
            label="Tim Benniks"
            image="timbenniks.png"
          />

          <quick-link
            url="https://auth.openair.com/login_sso"
            label="OpenAir"
            image="openair.png"
          />
          <quick-link
            url="https://valtech.workplace.com/"
            label="Workplace"
            image="workplace.png"
          />
        </ul>
      </main>
    </div>
  </Layout>
</template>

<script>
import FancyTitle from '../components/fancy-title.vue'
import LazyImage from '../components/lazy-image.vue'
import QuickLink from '../components/quick-link.vue'
import YTStats from '../components/yt-stats.vue'

export default {
  components: {
    LazyImage,
    FancyTitle,
    QuickLink,
    YTStats,
  },
  metaInfo: {
    title: "Tim's Startpage",
    description: "Tim's Startpage",
  },
}
</script>

<style lang="scss">
.startpage {
  max-width: rem(800px);

  // prettier-ignore
  @include responsive('width', (xs: 100%, m: 80%));
  // prettier-ignore
  @include responsive('margin', (xs: rem(45px auto 0), m: rem(0)));

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

  .quicklinks {
    list-style: none;
    max-width: rem(400px);
    margin: rem(30px 0 0 15px);
    columns: 2;
  }
}
</style>
