<template>
  <div class="wrapper">
    <a href="#main-content" aria-hidden="false" class="goToContent">{{
      $static.metadata.skiplink
    }}</a>
    <div class="bg-triangle" />
    <slot />
  </div>
</template>

<static-query>
query {
  metadata {
    skiplink
  }
}
</static-query>

<style lang="scss">
.bg-triangle {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  // prettier-ignore
  @include responsive(
    'background', (
      xs: linear-gradient(to bottom right, transparent 50%, $blue-main 50%) bottom right/175px 175px no-repeat,
      l: linear-gradient(to bottom right, transparent 50%, $blue-main 50%) bottom right/400px 400px no-repeat
    )
  );
}
</style>
