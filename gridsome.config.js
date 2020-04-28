const path = require('path')

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/_packages.scss'),
        path.resolve(__dirname, './src/styles/_variables.scss'),
        path.resolve(__dirname, './src/styles/_mixins.scss'),
      ],
    })
}

module.exports = {
  siteName: 'Tim Benniks',
  siteUrl: 'https://reverent-lichterman-7d23b1.netlify.app',
  icon: './src/icon.png',
  plugins: [
    {
      use: 'gridsome-source-graphql-prismic',
      options: {
        url: 'https://timbenniks.prismic.io',
        fieldName: 'Prismic',
        typeName: 'Prismic',

        headers: {
          'Prismic-Ref': process.env.PRISMIC_REF,
          Authorization: process.env.PRISMIC_TOKEN,
        },

        useMasterRef: true,
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-6797812-3',
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        config: {
          '/writings/*': {
            changefreq: 'weekly',
          },
          '/speaking/': {
            changefreq: 'weekly',
          },
        },
      },
    },
    {
      use: 'gridsome-plugin-pwa',
      options: {
        title: 'Tim Benniks',
        disableServiceWorker: false,
        shortName: 'TimBenniks',
        themeColor: '#3590d5',
        backgroundColor: '#3590d5',
        icon: './src/icon.png',
        msTileColor: '#3590d5',
      },
    },
    {
      use: 'gridsome-plugin-purgecss',
    },
  ],
  chainWebpack(config) {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach((type) => {
      addStyleResource(config.module.rule('sass').oneOf(type))
    })

    types.forEach((type) => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
}
