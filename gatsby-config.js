const activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)
require("dotenv").config({
  path: `.env.${activeEnv}`,
})
var proxy = require("http-proxy-middleware")

module.exports = {
  pathPrefix: `bookrides`,
  siteMetadata: {
    title: `VIP rides`,
    description: `VIP Rides is your exclusive ride share experience.  Unlike traditional transport services we operate to your needs, available when you want us. Bookings can be made for as short as 15 minutes for a one way trip or up to a whole day.`,
    author: `Lavon Global`,
    menuLinks: [
      {
        "name": "home",
        "link": "/",
      }, {
        "name": "services",
        "link": "/services",
      }, {
        "name": "company",
        "link": "/services",
      }, {
        "name": "book-ride",
        "link": "/book-ride",
      }, {
        "name": "contact",
        "link": "/contact",
      }],
  },
  developMiddleware: app => {
    app.use(
      "/api/",
      // proxy({
      //   target: "http://localhost:4242"
      // })
      proxy({
        target: "https://viprides.com"
      })
    )
  },
  proxy: {
    prefix: "/api",
    url: "https://viprides.com",
  },
  // proxy: {
  //   prefix: "/api",
  //   url: "http://localhost:4242",
  // },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#31e1eb`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
