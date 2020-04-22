<template>
  <div
    :is="tag || $prismic.toType(field[0].type)"
    v-html="$prismic.asText(field)"
  />
</template>

<script>
export default {
  name: 'PrismicSingleText',
  props: {
    field: { type: Array, required: true },
    tag: { type: String, required: false },
  },
}
</script>
