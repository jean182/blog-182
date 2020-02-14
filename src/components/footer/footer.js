import React from "react"
import { lowerCase } from "lodash"
import SocialNetworks from "../social-networks/social-networks"
import { useStaticQuery, graphql } from "gatsby"
import { translate } from "../../utils/i18n"
import { FooterWrapper } from "./footer.styled"

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
    <FooterWrapper>
      <div>
        © {new Date().getFullYear()}, {` `}
        {lowerCase(title)}
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
    </FooterWrapper>
  )
}

export default Footer
