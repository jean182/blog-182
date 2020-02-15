import React, { Component } from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { formatPostDate, formatReadingTime } from "../utils/helpers"
import { PostTitle } from "./blog-index.styled"
import { RegularGatsbyLink } from "../components/shared/links.styled"
import "../styles/main.scss"

class BlogIndex extends Component {
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
              <PostTitle>
                <RegularGatsbyLink to={node.fields.slug}>
                  {title}
                </RegularGatsbyLink>
              </PostTitle>
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
