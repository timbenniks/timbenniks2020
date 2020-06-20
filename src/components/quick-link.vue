<template>
  <li class="quicklink">
    <a :href="url" target="blank">
      <g-image :src="imgUrl" width="18" :immediate="true" quality="100" />
      {{ label }}
    </a>
  </li>
</template>

<script>
export default {
  name: 'QuickLink',
  props: {
    url: { type: String, required: true },
    image: { type: String, required: true },
    label: { type: String, required: true },
  },
  data() {
    return {
      imgUrl: '',
    }
  },
  created() {
    this.imgUrl = require(`~/assets/images/${this.image}`)
  },
}
</script>

<style lang="scss" scoped>
.quicklink {
  a {
    display: inline-block;
    text-decoration: none;
    font-weight: 700;
    text-transform: uppercase;
    color: $white;
    padding: rem(10px);
    transition: all 300ms ease;

    &:hover,
    &:focus {
      background: $blue-main;
      outline: none;
    }
  }

  img {
    width: rem(18px);
    height: auto;
    display: inline-block;
    background-size: 100% 100%;
    vertical-align: middle;
    margin: rem(-4px 6px 0 0);
  }
}
</style>
