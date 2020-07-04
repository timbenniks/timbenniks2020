<template>
  <article :key="video.slug" class="post video">
    <g-link :to="`/videos/${video.slug}/`">
      <lazy-image
        ratio="16/9"
        :alt="video.title"
        :url="video.image"
        :widths="[300, 400, 500, 600, 680]"
        sizes="(max-width: 400px) 100vw, (min-width: 700px) 210px"
      />
    </g-link>

    <div class="post-content-wrap">
      <p class="post-title">
        <g-link :to="`/videos/${video.slug}/`">
          {{ video.title }}
        </g-link>
      </p>
      <p class="post-tags">
        <span v-for="(tag, index) in video.tags" :key="tag">
          {{ tag }}
          <template v-if="index + 1 < video.tags.length">, </template>
        </span>
      </p>

      <p class="post-date fancy-title yellow">
        {{ $prismic.asDay(video.publication_date) }}
        {{ $prismic.asMonth(video.publication_date) }}
        {{ $prismic.asYear(video.publication_date) }}
      </p>
    </div>
  </article>
</template>

<script>
import LazyImage from './lazy-image.vue'

export default {
  name: 'VideoCard',
  components: {
    LazyImage,
  },
  props: {
    video: { type: Object, required: true },
  },
}
</script>

<style lang="scss" scoped>
.video {
  width: auto;
  margin: 0;
  flex-direction: column;

  figure {
    float: none;
    width: 100%;
    height: auto;
    margin: rem(0 0 16px 0);
  }

  .post-tags {
    font-weight: 400;
    color: $blue-light;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin: rem(0 0 10px 0);
  }

  .post-date {
    float: none;
    text-align: left;
    margin: 0;
    font-size: rem(13px);
  }

  .post-title {
    font-size: 1rem;
    line-height: 1.3;
  }
}
</style>
