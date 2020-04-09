<template>
  <Layout>
    <div>
      <prismic-single-text :field="$page.Prismic.writing.title" />
      <prismic-single-text :field="$page.Prismic.writing.sub_title" />
      <prismic-rich-text class="homepage-description" :field="$page.Prismic.writing.content" />    
    </div>
  </Layout>
</template>

<page-query>
query Writing ($uid: String!) {
  Prismic {
    writing(uid: $uid, lang: "en-us") {
      title
      sub_title
      content
      image
    }
  }
}
</page-query>