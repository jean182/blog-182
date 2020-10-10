import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { GiUfo, GiPerson } from "react-icons/gi"
import {
  Believe,
  HumanContainer,
  NotFound,
  UFOContainer,
  VoidText,
  VoidWrapper,
} from "../components/shared/404.styled"

function NotFoundPage(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <VoidWrapper>
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <div>
          <NotFound>404</NotFound>
          <VoidText>You've entered the void</VoidText>
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

export default NotFoundPage
