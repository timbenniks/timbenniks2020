<template>
  <Layout>
    <div class="content-wrapper speaking">
      <navigation />

      <main id="main-content">
        <heading
          :breadcrumb="true"
          titletag="h1"
          :title="$page.speaking.data.title"
          :uppercase="true"
        />

        <h3 class="post-title-sep">
          {{ $page.speaking.data.upcoming_talks }}
        </h3>

        <div v-if="upcomingTalks.length > 0" class="posts">
          <talk
            v-for="talk in upcomingTalks"
            :key="talk.node.id"
            :talk="talk.node.data"
          />
        </div>

        <p v-else class="no-upcoming-talks">
          {{ $page.speaking.data.no_upcoming }}
        </p>

        <h3 class="post-title-sep">
          {{ $page.speaking.data.older_talks }}
        </h3>

        <div class="posts">
          <talk
            v-for="talk in oldTalks"
            :key="talk.node.id"
            :talk="talk.node.data"
          />
        </div>
      </main>
    </div>
  </Layout>
</template>

<page-query>
query {
  speaking: prismicSinglePage(id:"speaking") {
    uid,
    slug,
    data {
      title
      upcoming_talks
      no_upcoming
      older_talks
      social_cards {
        type
        content {
          title
          description
          image
        }
      }
    }
  },
  talks: allPrismicTalk {
    edges {
      node {
        id
        slug
        uid
        data {
          title
          date
          location
          description
          subject
          link_to_event {
            link_type
            url
            target
          }
        }
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
      this.$page.speaking.data.social_cards,
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
    this.$page.talks.edges.forEach((talk) => {
      if (this.isDateBeforeToday(new Date(talk.node.data.date))) {
        this.oldTalks.push(talk)
      } else {
        this.upcomingTalks.push(talk)
      }
    })

    this.oldTalks.sort((a, b) => {
      return (
        new Date(b.node.data.date).getTime() -
        new Date(a.node.data.date).getTime()
      )
    })

    this.upcomingTalks.sort((a, b) => {
      return (
        new Date(a.node.data.date).getTime() -
        new Date(b.node.data.date).getTime()
      )
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
