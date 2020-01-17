import React from "react"
import SocialNetworks from "./social-networks"
import { useStaticQuery, graphql } from "gatsby"
import { translate } from "../utils/i18n"

const Footer = ({ currentLanguage }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
          social {
            devTo
            instagram
            github
            linkedIn
            twitter
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
        © {new Date().getFullYear()},{" "}
        {translate(currentLanguage, "footer.description")}
        {` `}
        {author}
        {` `}
        <span role="img" aria-label="red-heart">
          ❤️
        </span>
      </div>
      <SocialNetworks
        devTo={social.devTo}
        iconSize={1}
        instagram={social.instagram}
        linkedIn={social.linkedIn}
        github={social.github}
        twitter={social.twitter}
      />
    </footer>
  )
}

export default Footer
