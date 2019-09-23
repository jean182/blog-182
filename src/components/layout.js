import React from "react"

import { rhythm } from "../utils/typography"
import { isRunningInBrowser } from "../utils/helpers"
import Header from "./header"
import Footer from "./footer"

class Layout extends React.Component {
  constructor(props) {
    let theme = "light"
    if (isRunningInBrowser()) {
      theme = JSON.parse(localStorage.getItem("theme")) || "light"
      if (theme !== null) {
        document.documentElement.setAttribute("data-theme", theme)
        const metaThemeColor = document.querySelector("meta[name=theme-color]")
        metaThemeColor.setAttribute(
          "content",
          theme === "light" ? "#d23669" : "#ffa7c4"
        )
      }
    }
    super(props)
    this.state = {
      theme,
      isOn: theme !== "light" ? true : false,
    }
  }

  toggleTheme = () => {
    const theme = this.state.theme === "light" ? "dark" : "light"
    this.setState({ theme, isOn: theme !== "light" ? true : false })
    document.documentElement.setAttribute("data-theme", theme)
    isRunningInBrowser() && localStorage.setItem("theme", JSON.stringify(theme))
    if (isRunningInBrowser) {
      const metaThemeColor = document.querySelector("meta[name=theme-color]")
      metaThemeColor.setAttribute(
        "content",
        theme === "light" ? "#d23669" : "#ffa7c4"
      )
    }
  }

  render() {
    const { location, title, children, currentLanguage } = this.props
    const { isOn } = this.state
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(0)} ${rhythm(3 / 4)}`,
        }}
        className="app"
      >
        <Header
          title={title}
          location={location}
          isOn={isOn}
          toggleTheme={this.toggleTheme}
        />
        <main>{children}</main>
        <Footer currentLanguage={currentLanguage} />
      </div>
    )
  }
}

export default Layout
