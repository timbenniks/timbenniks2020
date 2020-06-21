<template>
  <div class="stats">
    <fancy-title
      field="Twitter Stats"
      tag="h1"
      color="blue-dark"
      type="small"
      :offset="[0, 0]"
      :uppercase="true"
    />
    <div class="stats-wrap">
      <div class="stat">
        <h6>FOLLOWERS</h6>
        <p>{{ twitterStats.followers }}</p>
      </div>
    </div>
    <p class="quick-links">
      Go to:
      <a href="https://twitter.com/timbenniks/" target="blank">Profile</a>,
      <a href="https://analytics.twitter.com" target="blank">Analytics</a>.
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FancyTitle from './fancy-title.vue'

export default {
  name: 'TwStats',
  components: {
    FancyTitle,
  },
  computed: mapGetters(['twitterStats']),
  mounted() {
    this.getTwitterStats()
  },
  methods: {
    ...mapActions(['getTwitterStats']),
  },
}
</script>
