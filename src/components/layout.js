import React, { useEffect, useState } from "react"
import { consoleWarning, isBrowser } from "../utils/helpers"
import { rhythm } from "../utils/typography"
import Header from "./header"
import Footer from "./footer"

function Layout(props) {
  let windowTheme = null
  if (isBrowser()) {
    windowTheme = window.__theme
  }
  const [theme, setTheme] = useState(windowTheme)

  useEffect(() => {
    try {
      window.__onThemeChange = () => {
        setTheme(window.__theme)
      }
      const metaThemeColor = document.querySelector("meta[name=theme-color]")
      metaThemeColor.setAttribute(
        "content",
        theme === "light" ? "#356CB5" : "#f76c6c"
      )
    } catch (error) {
      consoleWarning(error)
    }
  }, [theme])

  function toggleTheme(event) {
    event.preventDefault()
    if (isBrowser()) {
      window.__setPreferredTheme(
        event.target.title === "Activate dark mode" ? "dark" : "light"
      )
    }
  }

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
      <Header
        title={title}
        theme={theme}
        isOn={theme === "dark"}
        toggleTheme={toggleTheme}
      />
      <main>{children}</main>
      <Footer currentLanguage={currentLanguage} />
    </div>
  )
}

export default Layout
