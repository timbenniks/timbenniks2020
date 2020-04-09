<template>
  <div class="wrapper">
    <a href="#main-content" aria-hidden="false" class="goToContent">{{ $static.metadata.skiplink }}</a>
    <div class="bg-triangle"/>
    <slot/>
  </div>

  <!-- <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/writings/">Writing</g-link>
        <g-link class="nav__link" to="/speaking/">Speaking</g-link>
      </nav>
    </header>
    <slot/>
  </div> -->
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
      xs: linear-gradient(to bottom right, transparent 50%, $blue 50%) bottom right/375px 375px no-repeat,
      l: linear-gradient(to bottom right, transparent 50%, $blue 50%) bottom right/600px 700px no-repeat
    )
  );
}
</style>
