import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { formatPostDate, formatReadingTime } from "../utils/helpers"
import "bootstrap-4-grid/css/grid.min.css"
import "../styles/main.css"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const langKey = this.props.pageContext.langKey
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout
        currentLanguage={langKey}
        location={this.props.location}
        title={siteTitle}
      >
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
          lang={langKey}
        />
        <Bio currentLanguage={langKey} />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link className="article__link" to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {formatPostDate(node.frontmatter.date, langKey)} -{" "}
                {formatReadingTime(node.fields.readingTime.minutes, langKey)}
              </small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            langKey
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          fields {
            readingTime {
              minutes
            }
          }
        }
      }
    }
  }
`
