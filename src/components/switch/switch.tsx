import React from "react"

import { useDarkTheme } from "@src/utils/hooks"

import { IconWrapper, MoonMask, MoonOrSun } from "./switch.styled"

function Switch() {
  const [theme, toggleColorMode] = useDarkTheme()

  return (
    <IconWrapper
      onClick={toggleColorMode}
      aria-label={
        theme === "dark" ? `Activate light mode` : `Activate dark mode`
      }
      title={theme === "dark" ? `Activate light mode` : `Activate dark mode`}
    >
      <MoonOrSun isDark={theme === "dark"} />
      <MoonMask isDark={theme === "dark"} />
    </IconWrapper>
  )
}

export default Switch
