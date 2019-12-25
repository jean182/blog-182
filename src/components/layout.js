import React, { useEffect, useState } from "react"

import { rhythm } from "../utils/typography"
import Header from "./header"
import Footer from "./footer"

function Layout(props) {
  let findTheme = "light"
  try {
    findTheme = JSON.parse(localStorage.getItem("theme")) || "light"
  } catch (error) {
    console.error(
      `${error.message}, you're probably not running this in the browser`
    )
  }
  const [theme, setTheme] = useState(findTheme)
  const [isOn, setIsOn] = useState(theme === "dark")

  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", JSON.stringify(theme))
      const metaThemeColor = document.querySelector("meta[name=theme-color]")
      metaThemeColor.setAttribute(
        "content",
        theme === "light" ? "#356CB5" : "#f76c6c"
      )
    } catch (error) {
      console.error(
        `${error.message}, you're probably not running this in the browser`
      )
    }
  })

  function toggleTheme() {
    setTheme(prevState => (prevState === "light" ? "dark" : "light"))
    setIsOn(prevState => !prevState)
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
        isOn={isOn}
        toggleTheme={toggleTheme}
      />
      <main>{children}</main>
      <Footer currentLanguage={currentLanguage} />
    </div>
  )
}

export default Layout
