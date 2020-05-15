<template>
  <Layout>
    <div class="content-wrapper home">
      <navigation />

      <main id="main-content">
        <div class="homepage">
          <h1>hi</h1>
        </div>
      </main>
    </div>
  </Layout>
</template>

<static-query>
query {
  metadata {
    skiplink
  }
}
</static-query>

<script>
import Navigation from '../components/navigation.vue'
export default {
  components: {
    Navigation,
  },
}
</script>

<style lang="scss">
.homepage {
  max-width: rem(800px);

  // prettier-ignore
  @include responsive('width', (xs: 100%, m: 80%));
  // prettier-ignore
  @include responsive('margin', (xs: rem(45px auto 0), m: rem(0)));
  // prettier-ignore
  @include responsive('position', (xs: static, m: absolute));
  // prettier-ignore
  @include responsive('top', (m: 50%));
  // prettier-ignore
  @include responsive('left', (m: 50%));
  // prettier-ignore
  @include responsive('transform',  (xs: none, m: translate(-50%, -50%)));

  .homepage-description {
    // prettier-ignore
    @include responsive('margin', (xs: rem(0), m: 0));
    // prettier-ignore
    @include responsive('padding', (xs: rem(0 0 0 1rem)));
    // prettier-ignore
    @include responsive('width', (xs: 90%));
  }

  p {
    // prettier-ignore
    @include responsive('text-align', (xs: left, m: left));
    // prettier-ignore
    @include responsive('font-size', (xs: rem(20px), m: rem(24px)));
  }

  h1 {
    z-index: 2;
  }

  h2 {
    z-index: 1;
  }

  figure {
    position: relative;
    top: rem(20px);
    left: rem(20px);

    // prettier-ignore
    @include responsive('width', (xs: rem(100px), m: rem(140px)));

    img {
      border-radius: 100%;
      border: 5px solid $white;
    }
  }
}
</style>
