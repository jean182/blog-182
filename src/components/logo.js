import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const GET_LOGO = graphql`
  query GetLogo {
    file(absolutePath: { regex: "/blog-icon.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

function Logo() {
  const data = useStaticQuery(GET_LOGO)
  return <Img fixed={data.file.childImageSharp.fixed} />
}

export default Logo
