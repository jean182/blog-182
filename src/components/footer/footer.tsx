import React from "react"
import PropTypes from "prop-types"
import { lowerCase } from "lodash"
import { graphql, useStaticQuery } from "gatsby"

import Container from "@components/container/container"
import SocialNetworks from "@components/social-networks/social-networks"
import SVG from "@styles/assets/flash.svg"
import { translate } from "@utils/i18n"

import { Props } from "./footer.props"
import { StyledFooter } from "./footer.styled"

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

function Footer({ currentLanguage }: Props) {
  const data = useStaticQuery(GET_FOOTER_DATA)
  const { social, title } = data.site.siteMetadata
  return (
    <StyledFooter>
      <Container>
        <nav aria-labelledby="footer-navigation">
          <div className="meta">
            <SVG />
            <small>
              © {new Date().getFullYear()},{lowerCase(title)}
              {translate(currentLanguage, "footer.copyright")}
            </small>
          </div>
          <SocialNetworks
            devTo={social.devTo}
            github={social.github}
            instagram={social.instagram}
            linkedIn={social.linkedIn}
            twitter={social.twitter}
          />
        </nav>
      </Container>
    </StyledFooter>
  )
}

Footer.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
}

export default Footer
