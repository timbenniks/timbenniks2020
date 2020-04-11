const path = require('path');

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/_packages.scss'),
        path.resolve(__dirname, './src/styles/_variables.scss'),
        path.resolve(__dirname, './src/styles/_mixins.scss')
      ]
    })
}

module.exports = {
  siteName: 'Tim Benniks',
  plugins: [{
    use: 'gridsome-source-graphql-prismic',
    options: {
      url: 'https://timbenniks.prismic.io',
      fieldName: 'Prismic',
      typeName: 'Prismic',

      headers: {
        'Prismic-Ref': `Xo8HbRAAAP-Xx7hm`, // useMasterRef will overload this line
        'Authorization': `Token MC5Yb2UxOWhBQUFBNEVweWpI.WO-_ve-_ve-_vUpcZE4j77-9DhTvv71H77-9A--_ve-_ve-_ve-_vVVXVe-_vXLvv71KHC7vv71NCg`,
      },

      useMasterRef: true // undefined by default
    }
  }],
  chainWebpack(config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('sass').oneOf(type))
    })

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  }
}