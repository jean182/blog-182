import React from "react"
import styled from "@emotion/styled"
import { mediaQueries } from "../gatsby-plugin-theme-ui"
import { isBrowser } from "../utils/helpers"

const IconWrapper = styled.button`
  padding: 0;
  appearance: none;
  align-items: center;
  background: transparent;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 40px;
  justify-content: center;
  opacity: 0.75;
  overflow: hidden;
  position: relative;
  transform: scale(0.75);
  transition: opacity 0.3s ease;
  vertical-align: middle;
  z-index: 9999;
  width: 40px;
  &:hover {
    opacity: 1;
  }
`

const MoonOrSun = styled.div`
  border: ${p => (p.isDark ? `4px` : `2px`)} solid
    ${p => p.theme.colors.navigation.socialLink};
  background: ${p => p.theme.colors.navigation.socialLink};
  border-radius: 50%;
  height: 24px;
  overflow: ${p => (p.isDark ? `visible` : `hidden`)};
  position: relative;
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  width: 24px;
  z-index: -10;
  &::before {
    border-radius: 50%;
    border: 2px solid ${p => p.theme.colors.navigation.socialLink};
    content: "";
    height: 24px;
    opacity: ${p => (p.isDark ? 0 : 1)};
    position: absolute;
    right: -9px;
    top: -9px;
    transform: translate(${p => (p.isDark ? `14px, -14px` : `0, 0`)});
    transition: transform 0.45s ease;
    width: 24px;
  }
  &::after {
    border-radius: 50%;
    box-shadow: 0 -23px 0 ${p => p.theme.colors.navigation.socialLink},
      0 23px 0 ${p => p.theme.colors.navigation.socialLink},
      23px 0 0 ${p => p.theme.colors.navigation.socialLink},
      -23px 0 0 ${p => p.theme.colors.navigation.socialLink},
      15px 15px 0 ${p => p.theme.colors.navigation.socialLink},
      -15px 15px 0 ${p => p.theme.colors.navigation.socialLink},
      15px -15px 0 ${p => p.theme.colors.navigation.socialLink},
      -15px -15px 0 ${p => p.theme.colors.navigation.socialLink};
    content: "";
    height: 8px;
    left: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    width: 8px;
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${mediaQueries.md} {
      transform: scale(${p => (p.isDark ? 0.92 : 0)});
    }
  }
`

const MoonMask = styled.div`
  background: ${p => p.theme.colors.white};
  border-radius: 50%;
  border: 0;
  height: 24px;
  opacity: ${p => (p.isDark ? 0 : 1)};
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(${p => (p.isDark ? `14px, -14px` : `0, 0`)});
  transition: background 0.25s ease, transform 0.45s ease;
  width: 24px;
  z-index: -10;
`

class Switch extends React.Component {
  state = {
    theme: null,
  }
  componentDidMount() {
    this.setState({ theme: window.__theme })
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }

  toggleColorMode = event => {
    console.log(event.target.title)
    if (isBrowser()) {
      window.__setPreferredTheme(
        event.target.title === "Dark" ? "light" : "dark"
      )
    }
  }
  render() {
    const { theme } = this.state
    const isDark = theme === `dark`
    return (
      <IconWrapper
        isDark={isDark}
        onClick={this.toggleColorMode}
        aria-label={isDark ? `Activate light mode` : `Activate dark mode`}
        title={isDark ? `Dark` : `Light`}
      >
        <MoonOrSun isDark={isDark} />
        <MoonMask isDark={isDark} />
      </IconWrapper>
    )
  }
}

export default Switch
