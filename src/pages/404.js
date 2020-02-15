import React, { Component } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { GiUfo, GiPerson } from "react-icons/gi"

class NotFoundPage extends Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <div className="void">
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="404: Not Found" />
          <div>
            <h1
              className="m-0"
              style={{
                fontFamily: `Montserrat, sans-serif`,
                textAlign: "center",
                color: "var(--primaryText)",
              }}
            >
              404
            </h1>
            <h3
              className="mt-0"
              style={{
                fontFamily: `Montserrat, sans-serif`,
                fontWeight: "bold",
                textAlign: "center",
                color: "var(--primaryText)",
              }}
            >
              You've entered the void
            </h3>
            <h1
              className="m-0"
              style={{
                textAlign: "center",
                fontSize: "10rem",
                color: "var(--aliensExists)",
              }}
            >
              <GiUfo />
            </h1>
            <h1
              className="m-0"
              style={{
                textAlign: "center",
                fontSize: "5rem",
                color: "var(--primarytext)",
              }}
            >
              <GiPerson />
            </h1>
            <span>Believe</span>
          </div>
        </Layout>
      </div>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
