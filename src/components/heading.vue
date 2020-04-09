<template>
  <div class="heading">
    <ol v-if="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <g-link to="/" itemtype="https://schema.org/Thing" itemprop="item">
          <span itemprop="name">Home</span>
        </g-link>
        <meta itemprop="position" content="1">
      </li>
      <li
        v-for="(crumb, index) in crumbs"
        :key="crumb.path"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <g-link
          :to="crumb.to"
          itemtype="https://schema.org/Thing"
          itemprop="item"
        >
          <span itemprop="name">{{ crumb.text }}</span>
        </g-link>

        <meta :content="index + 2" itemprop="position">
      </li>
    </ol>

    <prismic-single-text :tag="titletag" v-if="title" :field="title" />
    <prismic-single-text :tag="subtitletag" v-if="subtitle" :field="subtitle" />

  </div>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    title: {
      type: [Array, Boolean],
      required: false,
      default: false
    },
    subtitle: {
      type: [Array, Boolean],
      required: false,
      default: false
    },
    titletag: {
      type: String,
      required: false,
      default: 'h1'
    },
    subtitletag: {
      type: String,
      required: false,
      default: 'h2'
    },
    breadcrumb: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    crumbs: function() {
      const pathArray = this.$route.path.split('/')
      pathArray.shift()

      const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        if (path) {
          breadcrumbArray.push({
            path: path,
            to: breadcrumbArray[idx - 1]
              ? '/' + breadcrumbArray[idx - 1].path + '/' + path
              : '/' + path,
            text: path
              .replace(/-/g, ' ')
              .toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          })
        }
        return breadcrumbArray
      }, [])

      return breadcrumbs
    }
  }
}
</script>

<style scoped lang="scss">
.heading {
  margin: rem(0 0 20px);
}

h1 {
  margin: rem(0 0 5px 0);
}

ol {
  list-style: none;
  margin: rem(0 0 5px 0);
  padding: 0;
  display: flex;
  font-size: 12px;

  .no-link {
    color: $blue-alt;
  }

  li {
    margin: rem(0 20px 0 0);
    position: relative;

    &:before {
      content: '›';
      position: absolute;
      left: -12px;
      top: 0;
      font-weight: bold;
    }

    &:last-child {
      margin: 0;
    }

    &:first-child::before {
      display: none;
    }
  }
}
</style>
