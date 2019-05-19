import React from "react"
import SocialNetworks from "./social-networks"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
          social {
            instagram
            github
            linkedIn
          }
        }
      }
    }
  `)
  const { social, author } = data.site.siteMetadata
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        © {new Date().getFullYear()},{` `}
        {author}
      </div>
      <SocialNetworks
        iconSize={1}
        instagram={social.instagram}
        linkedIn={social.linkedIn}
        github={social.github}
      />
    </footer>
  )
}

export default Footer
