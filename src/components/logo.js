import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

function Logo() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        return <Img fixed={data.file.childImageSharp.fixed} />
      }}
    />
  )
}

export default Logo

export const query = graphql`
  query {
    file(absolutePath: { regex: "/blog-icon.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
