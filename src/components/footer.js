import React from "react"
import _ from "lodash"
import SocialNetworks from "./social-networks"
import { useStaticQuery, graphql } from "gatsby"
import { translate } from "../utils/i18n"

const Footer = ({ currentLanguage }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          title
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
  const { social, title } = data.site.siteMetadata
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        © {new Date().getFullYear()}, {` `}
        {_.lowerCase(title)}
        {` `}
        {translate(currentLanguage, "footer.copyright")}
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
