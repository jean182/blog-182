import React, { useEffect, useState } from "react"

import { rhythm } from "../utils/typography"
import { isRunningInBrowser } from "../utils/helpers"
import Header from "./header"
import Footer from "./footer"

function Layout(props) {
  let findTheme =  "light"
  if (isRunningInBrowser()) findTheme = JSON.parse(localStorage.getItem("theme")) || "light"
  const [theme, setTheme] = useState(findTheme);
  const [isOn, setIsOn] = useState(theme === "dark");

  useEffect(() => {
    if (isRunningInBrowser()) {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", JSON.stringify(theme))
      const metaThemeColor = document.querySelector("meta[name=theme-color]")
      metaThemeColor.setAttribute(
        "content",
        theme === "light" ? "#d23669" : "#ffa7c4"
      )
    }
  });

  function toggleTheme() {
    setTheme(prevState => prevState === "light" ? "dark" : "light")
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
