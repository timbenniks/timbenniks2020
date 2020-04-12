module.exports = function (api) {
  api.loadSource(async (store) => {
    store.addMetadata('skiplink', 'Skip to content')
  })

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
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
          }
        }
      }
    `)

    data.Prismic.allWritings.edges.forEach((writing) => {
      createPage({
        path: `/writings/${writing.node._meta.uid}`,
        component: './src/templates/writing.vue',
        context: {
          uid: writing.node._meta.uid,
        },
      })
    })
  })
}
