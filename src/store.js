import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'query-string'

Vue.use(Vuex)

const tagIsSelected = (tags, tag) => {
  return tags.find((t) => t.tag === tag).selected
}

const noTagsSelected = (tags) => {
  let nothingSelected = true
  tags.forEach((tag) => {
    if (tag.selected) {
      nothingSelected = false
    }
  })

  return nothingSelected
}

const tagInQS = (tag) => {
  const tagsInQS = qs.parse(location.search)

  if (Object.keys(tagsInQS).length === 0) {
    return false
  } else {
    if (typeof tagsInQS.tag === 'string') {
      return tagsInQS.tag === tag
    } else {
      return !!tagsInQS.tag.find((t) => t === tag)
    }
  }
}

const setUrl = (selectedTags) => {
  const baseUrl = [
    location.protocol,
    '//',
    location.host,
    location.pathname,
  ].join('')

  let params = ''
  let sep = ''

  if (selectedTags.length !== 0) {
    params = qs.stringify({ tag: selectedTags })
    sep = '?'
  }

  window.history.replaceState({}, '', `${baseUrl}${sep}${params}`)
}

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    filteredVideos: [],
    useUrl: true,
  },
  getters: {
    filteredVideos(state) {
      return state.filteredVideos
    },

    tags(state) {
      return state.tags
    },
  },
  mutations: {
    setVideos(state, videos) {
      state.videos = videos
      state.filteredVideos = videos
    },

    useUrl(state, use) {
      state.useUrl = use
    },

    setTags(state) {
      const tags = []
      state.videos.forEach((video) => {
        video.tags.forEach((tag) => {
          if (!tags.find((t) => t.tag === tag)) {
            tags.push({ tag, selected: tagInQS(tag) })
          }
        })
      })

      state.tags = tags
    },

    updateTag(state, tag) {
      state.tags.find((t) => t.tag === tag.tag).selected = !state.tags.find(
        (t) => t.tag === tag.tag
      ).selected

      const selectedTags = []
      state.tags.forEach((tag) => {
        if (tag.selected) {
          selectedTags.push(tag.tag)
        }
      })

      if (state.useUrl) {
        setUrl(selectedTags)
      }
    },

    filterVideos(state) {
      state.filteredVideos = []
      state.videos.forEach((video) => {
        video.tags.forEach((tag) => {
          if (tagIsSelected(state.tags, tag)) {
            state.filteredVideos.push(video)
          }
        })
      })

      if (noTagsSelected(state.tags)) {
        state.filteredVideos = state.videos
      } else {
        state.filteredVideos = [...new Set(state.filteredVideos)]
      }
    },
  },
  actions: {
    setInitalVideos({ commit }, videosFromPrismic) {
      const videos = videosFromPrismic.map((edge) => {
        return {
          slug: edge.node.slug,
          tags: edge.node.tags,
          title: edge.node.data.title,
          image: edge.node.data.image,
          date: edge.node.data.publication_date,
          shown: true,
        }
      })

      commit('setVideos', videos)
      commit('setTags', videos)
      commit('filterVideos')
    },

    useUrl({ commit }, use) {
      commit('useUrl', use)
    },

    filter({ commit }, tag) {
      commit('updateTag', tag)
      commit('filterVideos')
    },
  },
})
