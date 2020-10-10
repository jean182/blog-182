import React from "react"
import { lowerCase } from "lodash"
import SocialNetworks from "../social-networks/social-networks"
import { graphql, useStaticQuery } from "gatsby"
import { translate } from "../../utils/i18n"
import { FooterWrapper } from "./footer.styled"

const GET_FOOTER_DATA = graphql`
query GetFooterData {
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
`

function Footer({ currentLanguage }) {
  const data = useStaticQuery(GET_FOOTER_DATA)
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
