import React from "react"
import { rhythm } from "../utils/typography"
import Header from "./header/header"
import Footer from "./footer/footer"

function Layout(props) {
  const { title, children, currentLanguage } = props
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
      className="app"
    >
      <Header title={title} />
      <main>{children}</main>
      <Footer currentLanguage={currentLanguage} />
    </div>
  )
}

export default Layout
