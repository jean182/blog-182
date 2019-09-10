import React from "react"

import { rhythm } from "../utils/typography"
import { isRunningInBrowser } from "../utils/helpers"
import Header from "./header"
import Footer from "./footer"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: "light",
      isOn: false,
    }
  }

  componentWillMount() {
    if (isRunningInBrowser()) {
      let theme = JSON.parse(localStorage.getItem("theme"))
      if (theme !== null) {
        this.setState({ theme, isOn: theme !== "light" ? true : false })
        document.documentElement.setAttribute("data-theme", theme)
      }
    }
  }
  toggleTheme = () => {
    const theme = this.state.theme === "light" ? "dark" : "light"
    this.setState({ theme, isOn: theme !== "light" ? true : false })
    document.documentElement.setAttribute("data-theme", theme)
    isRunningInBrowser() && localStorage.setItem("theme", JSON.stringify(theme))
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
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
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
