<template>
  <nav class="navigation" aria-label="Main Navigation">
    <g-link to="/" class="head-link">
      <figure style="--aspect-ratio: 1/1;">
        <img
          src="data:image/jpeg;base64,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"
          alt="Tim Benniks, logo in drawn in vector"
        />
      </figure>
      <span>TIM BENNIKS</span>
    </g-link>

    <button
      id="button"
      :class="{ 'is-active': burgerActive }"
      :aria-expanded="burgerActive"
      class="hamburger hamburger--3dx"
      type="button"
      aria-haspopup="true"
      aria-controls="menu"
      aria-label="Toggles main navigation"
      @click="showMenu"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </button>
    <ul id="menu" class="dropdown-menu">
      <li>
        <g-link
          :class="$route.name === 'writings-slug' ? 'active' : ''"
          to="/writings/"
        >
          Writings
        </g-link>
      </li>
      <li>
        <g-link
          :class="$route.name === 'videos-slug' ? 'active' : ''"
          to="/videos/"
        >
          Videos
        </g-link>
      </li>
      <li>
        <g-link to="/speaking/">
          Speaking
        </g-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      burgerActive: false,
    }
  },
  methods: {
    showMenu() {
      this.burgerActive = !this.burgerActive
    },
  },
}
</script>

<style lang="scss">
.navigation {
  position: -webkit-sticky;
  position: sticky;
  background: darken($blue-dark, 3);
  min-height: rem(64px);
  border-bottom: 1px solid darken($blue-main, 20);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;

  ul {
    margin: 0;
  }

  li {
    display: inline;
  }

  .head-link {
    position: absolute;
    top: rem(8px);
    left: rem(8px);
    display: flex;
    padding: rem(4px 5px 3px 5px);
    text-decoration: none;

    span {
      align-self: center;
      color: $white;
      font-weight: 900;
      font-size: rem(16px);
    }

    &:focus {
      outline: 1px solid;
    }

    figure {
      width: rem(39px);
      display: block;
      align-self: center;
      margin: rem(0 10px 0 0);

      img {
        border-radius: 100%;
        border: 2px solid $white;
      }
    }
  }

  .hamburger {
    position: absolute;
    top: rem(17px);
    right: rem(13px);
    padding: rem(7px 3px 0);

    // prettier-ignore
    @include responsive('display', (xs: block, m: none));

    &:focus {
      outline: 1px solid;
    }
  }

  .hamburger[aria-expanded='true'] + .dropdown-menu {
    display: block;
  }
}

.dropdown-menu {
  list-style: none;
  line-height: 2;
  left: 0;
  height: auto;

  // prettier-ignore
  @include responsive('width', (xs: 100%, m: auto));

  // prettier-ignore
  @include responsive('position', (xs: fixed));

  // prettier-ignore
  @include responsive('top', (xs: rem(65px), m: 0));

  // prettier-ignore
  @include responsive('left', (xs: 0, m: auto));

  // prettier-ignore
  @include responsive('right', (xs: auto, m: 0));

  // prettier-ignore
  @include responsive('background', (xs: rgba($blue-bg, 0.97), m: none));

  // prettier-ignore
  @include responsive('box-shadow', (xs: 0 10px 22px -6px rgba(#000, 0.8), m: none));

  // prettier-ignore
  @include responsive('display', (xs: none, m: block));

  // prettier-ignore
  @include responsive('text-align', (xs: center, m: right));

  // prettier-ignore
  @include responsive('padding', (xs: rem(10px 10px 16px), m: rem(15px 0 0 0)));

  a {
    display: inline-block;
    margin: rem(0 11px 0 0);
    padding: rem(0 8px);
    font-weight: 900;
    letter-spacing: 0.01em;
    font-size: rem(16px);
    color: $white;
    text-decoration: none;
    position: relative;
    z-index: 1;
    text-transform: uppercase;

    &.active,
    &:focus {
      &:after {
        top: 0;
      }

      &:before {
        display: none;
      }
    }

    &:before {
      content: '';
      position: absolute;
      background: $blue-main;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      z-index: -1;
      transform: skew(-4deg);
    }

    &:after {
      content: '';
      position: absolute;
      background: $red;
      bottom: 0;
      left: 0;
      right: 0;
      top: 100%;
      z-index: -1;
      transform: skew(-4deg);
      transition: top 200ms ease;
    }

    &:focus {
      outline: none;
    }

    @include hover-supported() {
      &:after {
        top: 0;
      }
    }
  }
}
</style>
