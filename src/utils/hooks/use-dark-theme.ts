/* eslint-disable no-underscore-dangle */
import React from "react"

import { consoleWarning, isBrowser } from "@utils/helpers"

type ThemeValue = "light" | "dark"

declare global {
  interface Window {
    __theme: ThemeValue
    __onThemeChange: () => void
    __setPreferredTheme: (theme: ThemeValue) => void
  }
}

export function useDarkTheme(): [ThemeValue, () => void] {
  const initialValue = isBrowser() ? window.__theme : "light"
  const [theme, setTheme] = React.useState<ThemeValue>(initialValue)

  React.useEffect(() => {
    try {
      setTheme(window.__theme)

      window.__onThemeChange = () => {
        setTheme(window.__theme)
      }
    } catch (error) {
      consoleWarning(error)
    }
  }, [])

  const setPreferredTheme = () => {
    try {
      setTheme(theme === "dark" ? "light" : "dark")
      window.__setPreferredTheme(theme === "dark" ? "light" : "dark")
    } catch (error) {
      consoleWarning(error)
    }
  }

  return [theme, setPreferredTheme]
}
