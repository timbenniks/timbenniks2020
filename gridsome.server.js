//const Prismic = require('prismic-javascript')

// function initApi(req) {
//   return Prismic.getApi('https://timbenniks.prismic.io/api/v2', {
//     accessToken: process.env.PRISMIC_TOKEN,
//     req,
//   })
// }

module.exports = function (api) {
  api.loadSource(async (store) => {
    store.addMetadata('skiplink', 'Skip to content')
  })

  api.createPages(async ({ graphql, createPage }) => {
    // initApi()
    //   .then((api) => {
    //     return api.query(Prismic.Predicates.at('document.type', 'video'), {
    //       pageSize: 100,
    //     })
    //   })
    //   .then((videos) => {
    //     videos.results.forEach((video) => {
    //       createPage({
    //         path: `/videos/${video.uid}`,
    //         component: './src/templates/video.vue',
    //         context: {
    //           uid: video.uid,
    //         },
    //       })
    //     })
    //   })

    // initApi()
    //   .then((api) => {
    //     return api.query(Prismic.Predicates.at('document.type', 'writing'), {
    //       pageSize: 100,
    //     })
    //   })
    //   .then((writings) => {
    //     writings.results.forEach((writing) => {
    //       createPage({
    //         path: `/writing/${writing.uid}`,
    //         component: './src/templates/writing.vue',
    //         context: {
    //           uid: writing.uid,
    //         },
    //       })
    //     })
    //   })

  //   const { data } = await graphql(`
  //     {
  //       Prismic {
  //         allWritings {
  //           pageInfo {
  //             hasNextPage
  //             endCursor
  //           }
  //           edges {
  //             node {
  //               _meta {
  //                 uid
  //               }
  //             }
  //             cursor
  //           }
  //         }
  //         allVideos {
  //           pageInfo {
  //             hasNextPage
  //             endCursor
  //           }
  //           edges {
  //             node {
  //               _meta {
  //                 uid
  //               }
  //             }
  //             cursor
  //           }
  //         }
  //       }
  //     }
  //   `)

  //   data.Prismic.allWritings.edges.forEach((writing) => {
  //     createPage({
  //       path: `/writings/${writing.node._meta.uid}`,
  //       component: './src/templates/writing.vue',
  //       context: {
  //         uid: writing.node._meta.uid,
  //       },
  //     })
  //   })

  //   data.Prismic.allVideos.edges.forEach((video) => {
  //     createPage({
  //       path: `/videos/${video.node._meta.uid}`,
  //       component: './src/templates/video.vue',
  //       context: {
  //         uid: video.node._meta.uid,
  //       },
  //     })
  //   })
  })
}
