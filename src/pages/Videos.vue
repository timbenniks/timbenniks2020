<template>
  <Layout>
    <div class="content-wrapper writings">
      <navigation />

      <main id="main-content">
        <heading
          :breadcrumb="true"
          titletag="h1"
          :title="$page.youtube.data.title"
          :uppercase="true"
        />

        <ais-instant-search
          :search-client="searchClient"
          :index-name="$algolia.index"
        >
          <ais-refinement-list
            attribute="tags"
            operator="or"
            :sort-by="['name:asc']"
            :class-names="{ 'ais-RefinementList': 'test' }"
          >
            <div slot-scope="{ items, refine, createURL }" class="filters">
              <button
                v-for="item in items"
                :key="item.value"
                :class="{ selected: item.isRefined }"
                class="filter"
                :data-href="createURL(item)"
                @click.prevent="refine(item.value)"
              >
                {{ item.label }}
                <span>{{ item.count.toLocaleString() }}</span>
              </button>
            </div>
          </ais-refinement-list>
          <ais-stats :class-names="{ 'ais-Stats': 'posts' }" />
          <ais-infinite-hits>
            <div slot-scope="{ items, isLastPage, refineNext }" class="posts">
              <div class="videos">
                <video-card
                  v-for="item in items"
                  :key="item.slug"
                  :video="item"
                />
              </div>
              <button v-if="!isLastPage" class="load-more" @click="refineNext">
                Load More Results
              </button>
            </div>
          </ais-infinite-hits>
        </ais-instant-search>
      </main>
    </div>
  </Layout>
</template>

<page-query>
query {
  videos: allPrismicVideo(sortBy: "data.publication_date", order: DESC) {
    edges {
      node {
        slug
        tags
        data {
          title
          publication_date
          image {
            url
          }
        }
      }
    }
  },
  youtube: prismicSinglePage(id:"youtube"){
    data {
      title
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
import Heading from '../components/heading.vue'
import VideoCard from '../components/video-card.vue'
import mapMetaInfo from '../prismic/mapMetaInfo'
import algoliasearch from 'algoliasearch'
import { history } from 'instantsearch.js/es/lib/routers'
import { singleIndex as singleIndexMapping } from 'instantsearch.js/es/lib/stateMappings'

import {
  AisInstantSearch,
  AisRefinementList,
  AisInfiniteHits,
  AisStats,
} from 'vue-instantsearch'

export default {
  components: {
    Navigation,
    Heading,
    VideoCard,
    AisInstantSearch,
    AisRefinementList,
    AisInfiniteHits,
    AisStats,
  },

  metaInfo() {
    return mapMetaInfo(
      this.$page.youtube.data,
      'videos',
      this.$router.currentRoute
    )
  },

  data() {
    return {
      searchClient: algoliasearch(this.$algolia.appId, this.$algolia.apiKey),
      routing: {
        router: history({
          writeDelay: 10,
        }),
        stateMapping: singleIndexMapping(this.$algolia.index),
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.videos {
  display: grid;
  grid-gap: 1rem;
  min-width: 0;

  // prettier-ignore
  @include responsive('grid-template-columns', (xs: 100%, sm: repeat(2, 47.5%), m: repeat(3, 32%)));
}
</style>
