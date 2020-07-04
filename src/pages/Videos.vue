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
          index-name="dev_VIDEOS"
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

        <!-- <div class="filters">
          <button
            v-for="tag in tags"
            :key="tag.tag"
            class="filter"
            :class="{ selected: tag.selected }"
            @click="tagClick(tag)"
          >
            {{ tag.tag }}
          </button>
        </div> -->
        <!-- <div class="posts videos">
          <video-card
            v-for="video in filteredVideos"
            :key="video.slug"
            :video="video"
          />
        </div> -->
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
import { mapGetters, mapActions } from 'vuex'
import algoliasearch from 'algoliasearch'

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
      searchClient: algoliasearch(
        'LTRZ8EDRZF',
        'b026a037e416510c0af71195118d465c'
      ),
    }
  },

  computed: mapGetters(['filteredVideos', 'tags']),

  mounted() {
    this.setInitalVideos(this.$page.videos.edges)
  },

  methods: {
    tagClick(tag) {
      this.useUrl(true)
      this.filter(tag)
    },

    ...mapActions(['setInitalVideos', 'filter', 'useUrl']),
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
