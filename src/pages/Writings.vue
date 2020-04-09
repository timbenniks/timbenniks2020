<template>
  <Layout>
    <prismic-single-text :field="$page.Prismic.writings.title" />

    <div class="posts" v-for="writing in $page.Prismic.allWritings.edges" :key="writing.node._meta.uid">
      <article class="post">
        <prismic-single-text tag="h2" :field="writing.node.title" />
        <g-link :to="`/writings/${writing.node._meta.uid}`">{{ writing.node.title[0].text }}</g-link>
      </article>
    </div>
  </Layout>
</template>
<page-query>
query {
  Prismic {
    allWritings {
      edges {
        node {
          _meta {
            uid
          }
          title
          sub_title
          content
          image
        }
      }
    },
    writings(uid: "writings", lang: "en-us") {
      title
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'About us'
  }
}
</script>
