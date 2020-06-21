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

        <div class="search sr-only">
          <form
            method="GET"
            action="https://www.google.com/search"
            autocomplete="off"
          >
            <input
              autofocus
              type="search"
              name="q"
              placeholder="Search Google"
              autocomplete="false"
            />
          </form>
        </div>

        <div class="stats-wrapper">
          <YTStats />
          <TWStats />
        </div>

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
            url="https://amazon.fr"
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
import TWStats from '../components/tw-stats.vue'

export default {
  components: {
    LazyImage,
    FancyTitle,
    QuickLink,
    YTStats,
    TWStats,
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
  margin: 0;

  main {
    padding: 0.5rem 1.25rem 2.5rem;
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

  .stats-wrapper {
    display: flex;
    margin: 2rem 0 0 0;
  }

  .quicklinks {
    list-style: none;
    max-width: 40rem;
    margin: rem(30px 0 0 15px);
    columns: 3;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}
</style>
