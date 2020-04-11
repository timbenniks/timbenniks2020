<template>
  <nav class="navigation" aria-label="Main Navigation">
    <g-link to="/" class="head-link">
      <g-image alt="Tim Benniks" src="~/assets/tim.png" width="20" />
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
          to="/writings/">
          Writings.
        </g-link>
      </li>
      <li>
        <g-link to="/speaking/">Speaking.</g-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      burgerActive: false
    }
  },
  methods: {
    showMenu() {
      this.burgerActive = !this.burgerActive
    }
  }
}
</script>

<style scoped lang="scss">
.navigation {
  position: -webkit-sticky;
  position: sticky;
  background: $blue;
  min-height: rem(64px);
  border-bottom: 1px solid $blue-alt;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0 0 20px -5px rgba(#000, 0.6);

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
  @include responsive('background', (xs: rgba($blue, 0.97), m: none));

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
    padding: rem(0 4px);
    font-weight: 400;
    letter-spacing: 0.1em;
    font-size: rem(16px);
    color: $white;
    text-decoration: none;
    position: relative;
    z-index: 1;

    &.active {
      color: $white;

      &:before {
        top: 0;
      }

      &:after {
        display: none;
      }
    }

    &:before {
      content: '';
      position: absolute;
      background: $blue-light;
      bottom: 0;
      left: 0;
      right: 0;
      top: 100%;
      z-index: -1;
      transition: top 100ms ease;
    }

    @include hover-supported() {
      color: $white;
    }

    &:focus {
      outline: 1px solid;
    }

    @include hover-supported() {
      &:before {
        top: 0;
      }
    }

    &:hover:after,
    &:focus:after {
      display: none;
    }

    &:after {
      content: '';
      position: absolute;
      height: 1px;
      background: $blue-light;
      width: calc(100% - 8px);
      left: rem(4px);
      bottom: 0;
    }
  }
}
</style>
