<template>
  <Layout>
    <div class="content-wrapper about">
      <navigation />

      <main id="main-content">
        <fancy-title
          :field="$page.Prismic.about.title"
          tag="h1"
          color="red"
          type="large"
          :offset="[0, 0]"
          :uppercase="true"
        />

        <prismic-rich-text :field="$page.Prismic.about.content" />
      </main>
    </div>
  </Layout>
</template>

<page-query>
# {
# 	Prismic {
#     about(uid: "about-tim-benniks", lang: "en-us"){
#       title
#       sub_title
#       content
#       body {
#         ... on Prismic_AboutBodyGeneral_card {
#           type
#           primary {
#             title
#             description
#             image
#           }
#         }
#         ... on Prismic_AboutBodyTwitter_card {
#           type
#           primary {
#             twitter_handle
#             title
#             description
#             image
#           }
#         }
#         __typename
#       }
#   	}
# 	}
# }
</page-query>

<script>
import Navigation from '../components/navigation.vue'
import FancyTitle from '../components/title.vue'
import LinkMixin from '../mixins/linkMixin'
import mapMetaInfo from '../prismic/mapMetaInfo'

export default {
  components: {
    Navigation,
    FancyTitle,
  },
  mixins: [LinkMixin],
  metaInfo() {
    return mapMetaInfo(
      this.$page.Prismic.about,
      'about',
      this.$router.currentRoute
    )
  },
}
</script>
