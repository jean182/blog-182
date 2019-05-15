import React from "react"
import SocialNetworks from "./socialNetworks"
import { useStaticQuery, graphql } from "gatsby"
import i18n from "../locales/i18n"

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
        © {new Date().getFullYear()}, {i18n.t("footer.description")}
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        {` `} by {author}
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
