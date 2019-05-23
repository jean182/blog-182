import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GiUfo } from "react-icons/gi"
import "../styles/void.css"

class NotFoundPage extends React.Component {
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
                textAlign: "center",
                fontSize: "16rem",
              }}
            >
              <GiUfo />
            </h1>
            <h1
              className="m-0"
              style={{
                fontFamily: `Montserrat, sans-serif`,
                textAlign: "center",
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
              }}
            >
              You've entered the void
            </h3>
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
