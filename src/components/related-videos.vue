<template>
  <div class="related-videos">
    <fancy-title
      tag="h3"
      field="Related Videos"
      color="red"
      type="small"
      :offset="[0, 0]"
      uppercase="uppercase"
    />
    <div class="videos">
      <video-card v-for="video in videos" :key="video.slug" :video="video" />
    </div>
  </div>
</template>

<script>
import VideoCard from './video-card.vue'
import FancyTitle from './fancy-title.vue'

export default {
  name: 'RelatedVideos',
  components: {
    VideoCard,
    FancyTitle,
  },
  props: {
    videos: { type: Array, required: true },
  },
}
</script>

<style lang="scss" scoped>
.related-videos {
  max-width: rem(800px);
  margin: 0 auto;

  .fancy-title {
    margin: rem(0 0 30px 0);
  }

  .videos {
    display: grid;
    grid-gap: 1rem;
    min-width: 0;
    // prettier-ignore
    @include responsive('grid-template-columns', (xs: 100%, sm: repeat(2, 47.5%), m: repeat(3, 32%)));
  }
}
</style>
