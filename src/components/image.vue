<template>
  <figure :style="`--aspect-ratio:${ratio};`">
    <img
      :data-src="url"
      :alt="alt"
      :src="preload"
      class="twic"
      :class="extraClass"
      :data-src-transform="transform"
    />
    <figcaption v-if="caption">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'TwicImage',
  props: {
    ratio: { type: String, required: true },
    alt: { type: String, required: true },
    url: { type: String, required: true },
    caption: { type: Boolean, required: false, default: true },
    extraClass: { type: String, required: false, default: '' },
    preload: {
      type: String,
      required: false,
      default:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    },
    transform: { type: String, required: false, default: '' },
  },
}
</script>
