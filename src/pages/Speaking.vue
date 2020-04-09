<template>
  <Layout>
    <div class="content-wrapper speaking">
      <navigation/>

      <main id="main-content">

        <heading :breadcrumb="true" titletag="h1" :title="$page.Prismic.speaking.title"/>

        <prismic-single-text class="post-title-sep" tag="h3" :field="$page.Prismic.speaking.upcoming_talks" />
        <!-- <div v-if="upcomingTalks.length > 0" class="posts">
          <talk v-for="talk in upcomingTalks" :talk="talk" :key="talk.date"/>
        </div>
        <p v-else class="no-upcoming-talks">No upcoming talks at the moment.</p> -->

        <prismic-single-text class="post-title-sep" tag="h3" :field="$page.Prismic.speaking.older_talks" />
        <!-- <div class="posts">
          <talk v-for="talk in oldTalks" :talk="talk" :key="talk.date"/>
        </div> -->

      </main>
    </div>





    

    <!-- <div class="posts" v-for="talk in $page.Prismic.allTalks.edges" :key="talk.node._meta.uid">
      <article class="post">
        <prismic-single-text tag="h2" :field="talk.node.title" />
      </article>
    </div> -->
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
          description
          date
          location
          url {
            _linkType
          }
          subject        
        }
      }
    },
    speaking(uid: "speaking", lang: "en-us") {
      title
      upcoming_talks
      older_talks
    }
  }
}
</page-query>

<script>
import Navigation from '../components/navigation.vue';
import Heading from '../components/heading.vue';

export default {
  components: {
    Navigation,
    Heading
  },
  metaInfo() {
    return {
      title: 'Tim Benniks Speaking',
      meta: [
        {
          name: 'description',
          property: 'og:description',
          content: 'An overview of my conference speaking engagements',
          hid: 'description'
        },
        { property: 'og:title', content: 'Tim Benniks Speaking' },
        {
          property: 'twitter:description',
          content: 'An overview of my conference speaking engagements'
        },

      ]
    }
  }
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