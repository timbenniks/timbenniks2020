<template>
  <Layout>
    <div class="content-wrapper speaking">
      <navigation />

      <main id="main-content">
        <heading
          :breadcrumb="true"
          titletag="h1"
          :title="$page.Prismic.speaking.title"
          :uppercase="true"
        />

        <prismic-single-text
          class="post-title-sep"
          tag="h3"
          :field="$page.Prismic.speaking.upcoming_talks"
        />

        <div v-if="upcomingTalks.length > 0" class="posts">
          <talk
            v-for="talk in upcomingTalks"
            :key="talk.node._meta.uid"
            :talk="talk.node"
          />
        </div>

        <prismic-single-text
          v-else
          class="no-upcoming-talks"
          tag="p"
          :field="$page.Prismic.speaking.no_upcoming"
        />

        <prismic-single-text
          class="post-title-sep"
          tag="h3"
          :field="$page.Prismic.speaking.older_talks"
        />

        <div class="posts">
          <talk
            v-for="talk in oldTalks"
            :key="talk.node._meta.uid"
            :talk="talk.node"
          />
        </div>
      </main>
    </div>
  </Layout>
</template>

<page-query>
query {
  Prismic {
    allTalks {
      edges {
        node {
          _meta {
            uid
          }
          title
          date
          location
          description
          subject
          link_to_event {
            ... on Prismic__ExternalLink {
              url
              _linkType
            }
          }
        }
      }
    },
    speaking(uid: "speaking", lang: "en-us") {
      title
      upcoming_talks
      older_talks
      no_upcoming
      body {
        ... on Prismic_SpeakingBodyGeneral_card {
          type
          primary {
            title
            description
            image
          }
        }
        ... on Prismic_SpeakingBodyTwitter_card {
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

<script>
import Navigation from '../components/navigation.vue'
import Heading from '../components/heading.vue'
import Talk from '../components/talk.vue'
import mapMetaInfo from '../prismic/mapMetaInfo'

export default {
  components: {
    Navigation,
    Heading,
    Talk,
  },
  metaInfo() {
    return mapMetaInfo(
      this.$page.Prismic.speaking,
      'speaking',
      this.$router.currentRoute
    )
  },
  data() {
    return {
      oldTalks: [],
      upcomingTalks: [],
    }
  },
  mounted() {
    this.$page.Prismic.allTalks.edges.forEach((talk) => {
      if (this.isDateBeforeToday(new Date(talk.node.date))) {
        this.oldTalks.push(talk)
      } else {
        this.upcomingTalks.push(talk)
      }
    })

    this.oldTalks.sort((a, b) => {
      return new Date(b.node.date).getTime() - new Date(a.node.date).getTime()
    })

    this.upcomingTalks.sort((a, b) => {
      return new Date(a.node.date).getTime() - new Date(b.node.date).getTime()
    })
  },

  methods: {
    isDateBeforeToday(date) {
      return new Date(date.toDateString()) < new Date(new Date().toDateString())
    },
  },
}
</script>

<style lang="scss" scoped>
.heading,
.posts,
.post-title-sep,
.no-upcoming-talks {
  margin: 0 auto 2rem;
  max-width: rem(800px);
}

.no-upcoming-talks {
  margin: rem(0 auto 40px);
}

.post-title {
  margin: rem(0 0 6px 0);
}
</style>
