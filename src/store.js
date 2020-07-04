import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    youTubeStats: {
      subscriberCount: 0,
      viewCount: 0,
      videoCount: 0,
    },
    twitterStats: {
      followers: 0,
    },
  },
  getters: {
    youTubeStats(state) {
      return state.youTubeStats
    },

    twitterStats(state) {
      return state.twitterStats
    },
  },
  mutations: {
    setYouTubeStats(state, stats) {
      state.youTubeStats = stats.channelStats
    },

    setTwitterStats(state, stats) {
      state.twitterStats = stats.userData
    },
  },
  actions: {
    getYouTubeStats({ commit }) {
      fetch('https://tims-startpage.azurewebsites.net/api/yt-stats', {
        cache: 'no-cache',
      })
        .then((response) => response.json())
        .then((stats) => commit('setYouTubeStats', stats))
        .catch(console.error)
    },

    getTwitterStats({ commit }) {
      fetch('https://tims-startpage.azurewebsites.net/api/tw-stats', {
        cache: 'no-cache',
      })
        .then((response) => response.json())
        .then((stats) => commit('setTwitterStats', stats))
        .catch(console.error)
    },
  },
})
