<template>
  <div class="stats">
    <fancy-title
      field="YouTube Stats"
      tag="h1"
      color="blue-dark"
      type="small"
      :offset="[0, 0]"
      :uppercase="true"
    />
    <div class="stats-wrap">
      <div class="stat">
        <h6>SUBSCRIBERS</h6>
        <p>{{ youTubeStats.subscriberCount }}</p>
      </div>
      <div class="stat">
        <h6>VIEWS</h6>
        <p>{{ youTubeStats.viewCount }}</p>
      </div>
      <div class="stat">
        <h6>VIDOES</h6>
        <p>{{ youTubeStats.videoCount }}</p>
      </div>
    </div>
    <p class="quick-links">
      Go to: <a href="https://studio.youtube.com/" target="blank">Studio</a>,
      <a href="https://youtube.com/timbenniks" target="blank">Channel</a>,
      <a href="https://trello.com/b/YsxqLr2C/youtube" target="blank">Trello</a>.
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FancyTitle from './fancy-title.vue'

export default {
  name: 'YtStats',
  components: {
    FancyTitle,
  },
  computed: mapGetters(['youTubeStats']),
  mounted() {
    this.getYouTubeStats()
  },
  methods: {
    ...mapActions(['getYouTubeStats']),
  },
}
</script>

<style lang="scss">
.stats {
  background: $blue-main;
  padding: 1rem;
  margin: 1rem 0 0 1rem;
  width: rem(350px);

  .quick-links {
    margin: rem(10px 0 0);
    font-size: rem(14px);
  }

  .stats-wrap {
    display: flex;
    margin: rem(20px 0);

    .stat {
      flex: 1;
      max-width: rem(120px);

      h6 {
        font-weight: 400;
      }

      p {
        margin: 0;
        font-size: rem(30px);
        line-height: 1;
        font-weight: 700;
      }
    }
  }
}
</style>
