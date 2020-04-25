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
              }
            }
          }
          allVideos {
            edges {
              node {
                _meta {
                  uid
                }
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

    data.Prismic.allVideos.edges.forEach((video) => {
      createPage({
        path: `/videos/${video.node._meta.uid}`,
        component: './src/templates/video.vue',
        context: {
          uid: video.node._meta.uid,
        },
      })
    })
  })
}
