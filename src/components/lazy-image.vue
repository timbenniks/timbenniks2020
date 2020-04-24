<template>
  <figure :style="`--aspect-ratio:${ratio};`">
    <img
      :data-srcset="generateSrcSet()"
      :alt="alt"
      :src="preload"
      :title="alt"
      :data-sizes="sizes"
      :class="extraClass"
      class="twic"
    />
    <figcaption v-if="caption">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script>
import { loadImages, getSrcSet } from '../prismic/imageTools'

export default {
  name: 'LazyImage',
  props: {
    ratio: { type: String, required: true },
    alt: { type: String, required: true },
    url: { type: String, required: true },
    sizes: { type: String, required: false, default: '' },
    widths: { type: Array, required: true },
    caption: { type: Boolean, required: false, default: true },
    extraClass: { type: String, required: false, default: '' },
    preload: {
      type: String,
      required: false,
      default:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    },
  },
  mounted() {
    loadImages()
  },

  methods: {
    generateSrcSet() {
      return getSrcSet(this.url, this.widths)
    },
  },
}
</script>
