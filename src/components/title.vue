<template>
  <prismic-single-text
    :field="field"
    :tag="tag"
    class="fancy-title"
    :class="[color, type, { uppercase }]"
    :style="{ top: `${offset[0]}rem`, left: `${offset[1]}rem` }"
  />
</template>

<script>
export default {
  name: 'FancyTitle',
  props: {
    field: { type: [Array, String], required: true },
    tag: { type: String, required: false, default: 'h1' },
    color: { type: String, required: false, default: 'blue-main' },
    type: { type: String, required: false, default: 'large' },
    uppercase: { type: Boolean, required: false, default: true },
    offset: { type: Array, required: false, default: () => [0, 0] },
  },
}
</script>

<style lang="scss">
.fancy-title {
  position: relative;
  z-index: 1;
  display: inline-block;
  padding: rem(3px 8px);
  font-weight: 900;

  &.uppercase {
    text-transform: uppercase;
  }

  &.blue-main {
    &::before {
      background: $blue-main;
    }
  }

  &.red {
    &::before {
      background: $red;
    }
  }

  &.blue-dark {
    &::before {
      background: $blue-main;
    }
  }

  &.yellow {
    color: #000;

    &::before {
      background: $yellow;
    }
  }

  &.large {
    // prettier-ignore
    @include responsive('font-size', (xs: rem(22px), sm: rem(30px), m: rem(45px)));
  }

  &.small {
    // prettier-ignore
    @include responsive('font-size', (xs: rem(18px), sm: rem(22px), m: rem(30px)));
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    top: 0;
    left: 0;
    z-index: -1;
    transform: skewX(-3deg);
  }
}
</style>
