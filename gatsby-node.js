const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const { supportedLanguages } = require("./i18n")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.jsx")

    // Create index pages for all supported languages
    Object.keys(supportedLanguages).forEach(langKey => {
      createPage({
        path: langKey === "en" ? "/" : `/${langKey}/`,
        component: path.resolve("./src/templates/blog-index.jsx"),
        context: {
          langKey,
        },
      })
    })

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    langKey
                    directoryName
                    maybeAbsoluteLinks
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
          return
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges
        const allSlugs = _.reduce(
          posts,
          (result, post) => {
            result.add(post.node.fields.slug)
            return result
          },
          new Set()
        )

        const translationsByDirectory = _.reduce(
          posts,
          (result, post) => {
            const directoryName = _.get(post, "node.fields.directoryName")
            const langKey = _.get(post, "node.fields.langKey")

            if (directoryName && langKey && langKey !== "en") {
              ;(result[directoryName] || (result[directoryName] = [])).push(
                langKey
              )
            }

            return result
          },
          {}
        )

        const defaultLangPosts = posts.filter(
          ({ node }) => node.fields.langKey === "en"
        )
        _.each(defaultLangPosts, (post, index) => {
          const previous =
            index === defaultLangPosts.length - 1
              ? null
              : defaultLangPosts[index + 1].node
          const next = index === 0 ? null : defaultLangPosts[index - 1].node

          const translations =
            translationsByDirectory[_.get(post, "node.fields.directoryName")] ||
            []

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
              translations,
              translatedLinks: [],
            },
          })

          const otherLangPosts = posts.filter(
            ({ node }) => node.fields.langKey !== "en"
          )
          // Get all available languages
          const allLangAvailable = _.uniq(otherLangPosts.map(({ node }) => node.fields.langKey))
          // Iterate over each language key
          _.each(allLangAvailable, lang =>{
            // Filter all posts by language key
            const currentLangPosts = otherLangPosts.filter(({ node }) => node.fields.langKey === lang )
            // Iterate all the posts of the current lang key and create the pages.
            _.each(currentLangPosts, (post, index) => {
              const translations =
                translationsByDirectory[_.get(post, "node.fields.directoryName")]

              const previousLangPost =
                index === currentLangPosts.length - 1
                  ? null
                  : currentLangPosts[index + 1].node
              const nextLangPost = index === 0 ? null : currentLangPosts[index - 1].node
              // Record which links to internal posts have translated versions
              // into this language. We'll replace them before rendering HTML.
              let translatedLinks = []
              const { langKey, maybeAbsoluteLinks } = post.node.fields
              maybeAbsoluteLinks.forEach(link => {
                if (allSlugs.has(link)) {
                  if (allSlugs.has("/" + langKey + link)) {
                    // This is legit an internal post link,
                    // and it has been already translated.
                    translatedLinks.push(link)
                  } else if (link.startsWith("/" + langKey + "/")) {
                    console.log("-----------------")
                    console.error(
                      `It looks like "${langKey}" translation of "${post.node.frontmatter.title}" ` +
                        `is linking to a translated link: ${link}. Don't do this. Use the original link. ` +
                        `The blog post renderer will automatically use a translation if it is available.`
                    )
                    console.log("-----------------")
                  }
                }
              })

              createPage({
                path: post.node.fields.slug,
                component: blogPost,
                context: {
                  slug: post.node.fields.slug,
                  translations,
                  translatedLinks,
                  previous: previousLangPost,
                  next: nextLangPost
                },
              })
            })
          });
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (_.get(node, "internal.type") === `MarkdownRemark`) {
    createNodeField({
      node,
      name: "directoryName",
      value: path.basename(path.dirname(_.get(node, "fileAbsolutePath"))),
    })

    // Capture a list of what looks to be absolute internal links.
    // We'll later remember which of them have translations,
    // and use that to render localized internal links when available.

    // TODO: check against links with no trailing slashes
    // or that already link to translations.
    const markdown = node.internal.content
    let maybeAbsoluteLinks = []
    let linkRe = /\]\((\/[^\)]+\/)\)/g
    let match = linkRe.exec(markdown)
    while (match != null) {
      maybeAbsoluteLinks.push(match[1])
      match = linkRe.exec(markdown)
    }
    createNodeField({
      node,
      name: "maybeAbsoluteLinks",
      value: _.uniq(maybeAbsoluteLinks),
    })
  }
}
