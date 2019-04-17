import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { GiUfo } from "react-icons/gi"
import "../styles/void.css"

function transform(offset) {
  const cos = Math.cos(offset)
  const sin = Math.sin(offset)
  return {
    transform: `matrix3d(${sin}, ${-cos}, ${sin}, 0, ${-cos}, ${sin}, 0, 0, 0, ${cos}, ${cos}, ${sin}, 0, 0, 0, 1)`,
  }
}

class NotFoundPage extends React.Component {
  state = { styleOne: {}, styleTwo: {} }

  onMouseMove = event => {
    this.setState({
      styleOne: transform(-event.clientX / event.clientY),
      styleTwo: transform(event.clientX / event.clientY),
    })
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <div className="void-container" onMouseMove={this.onMouseMove}>
          <div className="void void-container" style={this.state.styleOne} />
          <div className="void void-container" style={this.state.styleTwo}>
            <h1
              style={{
                fontFamily: `Montserrat, sans-serif`,
                textAlign: "center",
              }}
            >
              404
            </h1>
            <h3
              style={{
                fontFamily: `Montserrat, sans-serif`,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              You've entered the void
            </h3>
            <h1
              style={{
                textAlign: "center",
                fontSize: "4rem",
              }}
            >
              <GiUfo />
            </h1>
          </div>
        </div>
      </Layout>
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
