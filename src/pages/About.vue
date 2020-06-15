<template>
  <Layout>
    <div class="content-wrapper about">
      <navigation />

      <main id="main-content">
        {{ $page.about }}
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

<style lang="scss"></style>
