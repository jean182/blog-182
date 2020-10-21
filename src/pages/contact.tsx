import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "@components/layout/layout"
import { PageLayout } from "@components/layout/layout.styled"
import SocialNetworks from "@components/social-networks/social-networks"
import { ContactStyled } from "@components/shared/contact.styled"

export const CONTACT_INFO = graphql`
  query ContactQuery {
    site {
      siteMetadata {
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

function Contact({ pageContext }) {
  const { site } = useStaticQuery(CONTACT_INFO)
  const { langKey } = pageContext
  const { siteMetadata } = site
  const { social } = siteMetadata
  return (
    <Layout currentLanguage={langKey}>
      <PageLayout>
        <ContactStyled>
          <h1>Contact</h1>
          <p>
            If for some reason you want to get in touch this is my{" "}
            <a href="mailto:jean-marco-10@hotmail.com">email</a> or you can
            follow me on my social networks:
          </p>
          <SocialNetworks
            devTo={social.devTo}
            instagram={social.instagram}
            linkedIn={social.linkedIn}
            github={social.github}
            twitter={social.twitter}
          />
        </ContactStyled>
      </PageLayout>
    </Layout>
  )
}

Contact.propTypes = {
  pageContext: PropTypes.shape({
    langKey: PropTypes.string,
  }).isRequired,
}

export default Contact
