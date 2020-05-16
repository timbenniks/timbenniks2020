module.exports = function (api) {
  api.loadSource(async (store) => {
    store.addMetadata('skiplink', 'Skip to content')
  })

  api.createPages(async ({ graphql, createPage }) => {})
}
