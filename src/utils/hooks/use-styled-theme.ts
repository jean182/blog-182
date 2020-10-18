import { Theme } from "@theme/theme.props"
import { useContext } from "react"
import { ThemeContext } from "styled-components"

export function useTheme(): Theme {
  return useContext(ThemeContext)
}
