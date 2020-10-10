/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react"
import { consoleWarning, isBrowser } from "../../utils/helpers"
import { IconWrapper, MoonMask, MoonOrSun } from "./switch.styled"

function Switch() {
  let windowTheme = "dark"
  if (isBrowser()) {
    windowTheme = window.__theme
  }
  const [colorMode, setColorMode] = useState(windowTheme)

  useEffect(() => {
    try {
      window.__onThemeChange = () => {
        setColorMode(window.__theme)
      }
      const metaThemeColor = document.querySelector("meta[name=theme-color]")
      metaThemeColor.setAttribute(
        "content",
        colorMode === "light" ? "#e66992" : "#ffa7c4"
      )
    } catch (error) {
      consoleWarning(error)
    }
  }, [colorMode])

  const isDark = colorMode === `dark`
  function toggleColorMode(event) {
    event.preventDefault()
    if (isBrowser()) {
      window.__setPreferredTheme(isDark ? "light" : "dark")
    }
  }
  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      aria-label={isDark ? `Activate light mode` : `Activate dark mode`}
      title={isDark ? `Activate light mode` : `Activate dark mode`}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  )
}

export default Switch
