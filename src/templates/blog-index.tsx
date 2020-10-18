import React from "react"
import { graphql } from "gatsby"

import { BlogIndexPropTypes, Props } from "./blog-index.props"
import Bio from "../components/bio/bio"
import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import { formatPostDate, formatReadingTime } from "../utils/helpers"
import { PostTitle } from "./blog-index.styled"
import { RegularGatsbyLink } from "../components/shared/links.styled"
import "../styles/main.css"
import { PageLayout } from "../components/layout/layout.styled"

function BlogIndex({ data, pageContext }: Props) {
  const { langKey } = pageContext
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout currentLanguage={langKey}>
      <PageLayout>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
          lang={langKey}
        />
        <Bio currentLanguage={langKey} />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const htmlFragment = node.frontmatter.description || node.excerpt

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
              <p dangerouslySetInnerHTML={{ __html: htmlFragment }} />
            </div>
          )
        })}
      </PageLayout>
    </Layout>
  )
}

BlogIndex.propTypes = BlogIndexPropTypes

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
