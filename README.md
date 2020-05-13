# timbenniks.nl
Thanks for checking out the source code!

This website uses [Prismic](https://prismic.io/) as headless CMS and [Gridsome](https://gridsome.org/) as framework to create the blog. The heart of it all is [Vue.js](https://vuejs.org/). It showcases my writing and my videos and it has a calendar of my public speaking engagements.

## Hosted on Netlify

This website uses the [JAMstack](https://jamstack.wtf/) and is hosted for free on [Netlify](https://netlify.com/). Each push to this repo and each publish action in Prismic creates a new release on the Netlify CDN Edge.

[![Netlify Status](https://api.netlify.com/api/v1/badges/bcd6e2bb-e73d-443d-ab4e-3b9e728132b1/deploy-status)](https://app.netlify.com/sites/timbenniks/deploys)

## How it connects

I'm using `gridsome-source-graphql-prismic` to connect to the Prismic GraphQL endpoint. This however does not create the proper collections in Gridsome. Please check [gridsome.server.js](gridsome.server.js) for the fix/hack.

Read this [blogpost](https://timbenniks.nl/writings/a-new-website/) for more info.

Reach out on Twitter if you have questions: [@timbenniks](https://twitter.com/timbenniks)

![Image of Tim Benniks](https://timbenniks.nl/assets/static/favicon-512.png)
