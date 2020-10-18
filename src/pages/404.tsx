import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import { GiUfo, GiPerson } from "react-icons/gi"

import Layout from "@components/layout/layout"
import SEO from "@components/seo/seo"
import {
  Believe,
  HumanContainer,
  NotFound,
  UFOContainer,
  VoidText,
  VoidWrapper,
} from "@components/shared/404.styled"

function NotFoundPage({ pageContext }) {
  return (
    <VoidWrapper>
      <Layout currentLanguage={pageContext.langKey}>
        <SEO title="404: Not Found" />
        <div>
          <NotFound>404</NotFound>
          <VoidText>You&apos;ve entered the void</VoidText>
          <UFOContainer>
            <GiUfo />
          </UFOContainer>
          <HumanContainer>
            <GiPerson />
          </HumanContainer>
          <Believe>Believe</Believe>
        </div>
      </Layout>
    </VoidWrapper>
  )
}

NotFoundPage.propTypes = {
  pageContext: PropTypes.shape({
    langKey: PropTypes.string,
  }).isRequired,
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark {
      fields {
        langKey
      }
    }
  }
`
