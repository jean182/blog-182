module.exports = {
  siteMetadata: {
    title: `Loserkid`,
    author: `Jean Aguilar`,
    description: `The most awesome blog.`,
    siteUrl: `https://www.loserkid.io/`,
    social: {
      devTo: `jean182`,
      instagram: `jeanm182`,
      github: `jean182`,
      linkedIn: `jean182`,
      twitter: `jeanm182`,
    },
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, // Optional: Disable insertion of <style> border: 0
            },
          },
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              username: "jean182",
              includeDefaultCss: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              inlineCodeMarker: "÷",
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-reading-time`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const { siteUrl } = site.siteMetadata
                const postText = `
              <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog at loserkid.io. You can read it online by <a href="${siteUrl +
                edge.node.fields.slug}">clicking here</a>.)</div>
            `

                let { html } = edge.node
                // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)

                return {
                  ...edge.node.frontmatter,
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": html + postText }],
                }
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: {fields: { langKey: {eq: "en"}}}
              ) {
                edges {
                  node {
                    excerpt(pruneLength: 250)
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      description
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "Loser Kid RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Loser Kid`,
        short_name: `Loserkid`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffa7c4`,
        display: `minimal-ui`,
        icon: `content/assets/blog-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: "en",
        useLangKeyLayout: false,
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://hotmail.us20.list-manage.com/subscribe/post?u=99a0004437c27dd67681c3dcb&amp;id=395ed69915",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Bangers", "Open Sans"],
        },
      },
    },
    "gatsby-plugin-typescript",
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@theme": "src/theme",
          "@utils": "src/utils",
        },
        extensions: ["js", "jsx", "ts", "tsx"],
      },
    },
  ],
}
