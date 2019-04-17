import React from "react"

import { rhythm } from "../utils/typography"
import Header from "./header"
import Footer from "./footer"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(27),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header title={title} location={location} />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
