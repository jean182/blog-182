import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Translations from "../components/translations"
import { rhythm, scale } from "../utils/typography"
import {
  codeToLanguage,
  createLanguageLink,
  loadFontsForCode,
} from "../utils/i18n"
import "../styles/article.css"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    let {
      previous,
      next,
      slug,
      translations,
      translatedLinks,
    } = this.props.pageContext
    const lang = post.fields.langKey

    let html = post.html
    translatedLinks.forEach(link => {
      function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      }
      let translatedLink = "/" + lang + link
      html = html.replace(
        new RegExp('"' + escapeRegExp(link) + '"', "g"),
        '"' + translatedLink + '"'
      )
    })

    translations = translations.slice()
    translations.sort((a, b) => {
      return codeToLanguage(a) < codeToLanguage(b) ? -1 : 1
    })

    loadFontsForCode(lang)
    const languageLink = createLanguageLink(slug, lang)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="article__content">
          <h1 className="article__content__title">{post.frontmatter.title}</h1>
          <p
            className="article-misc"
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {post.frontmatter.date} - {post.fields.readingTime.text}
          </p>
          {translations.length > 0 && (
            <Translations
              translations={translations}
              languageLink={languageLink}
              lang={lang}
            />
          )}
          <div
            className="article__content__text"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
        </div>
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        readingTime {
          text
        }
        slug
        langKey
      }
    }
  }
`
