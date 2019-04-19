import React from "react"

import { rhythm } from "../utils/typography"
import Header from "./header"
import Footer from "./footer"

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: "light",
    }
  }

  componentWillMount() {
    let theme = JSON.parse(localStorage.getItem("theme"))
    this.setState({ theme })
    document.documentElement.setAttribute("data-theme", theme)
  }
  toggleTheme = () => {
    const theme = this.state.theme === "light" ? "dark" : "light"
    this.setState({ theme })
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", JSON.stringify(theme))
  }

  render() {
    const { location, title, children } = this.props
    const { theme } = this.state
    const isOn = theme !== "light" ? true : false
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(27),
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
        <Footer />
      </div>
    )
  }
}

export default Layout
