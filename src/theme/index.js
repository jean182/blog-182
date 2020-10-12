import {
  colors as c,
  fontSizes as s,
  space as sp,
  transition as t,
} from "gatsby-design-tokens"
import { breakpoints } from "./breakpoints"

const spaceTokens = sp.map(token => `${token / 16}rem`)

const col = {
  ...c,
  navigation: {
    socialLink: c.grey[40],
  },
  primaryTheme: "#e66992",
  sunOrMoon: c.yellow[40],
  modes: {
    light: {
      sunOrMoon: c.yellow[40],
    },
    dark: {
      primaryTheme: "#ffa7c4",
      sunOrMoon: c.yellow[60],
    },
  },
}

const si = {
  ...s,
  headerHeight: `4rem`,
  logo: spaceTokens[6],
  pluginsSidebarWidthDefault: `21rem`,
  pluginsSidebarWidthLarge: `24rem`,
  showcaseSidebarMaxWidth: `15rem`,
  sidebarItemMinHeight: spaceTokens[8],
  mainContentWidth: {
    default: `54rem`,
    withSidebar: `42rem`,
  },
  sidebarWidth: {
    default: `16.5rem`,
    large: `18rem`,
    mobile: `320px`,
  },
  tocWidth: `18rem`,
}

export const colors = col
export const sizes = si
export const transition = t

const config = {
  colors: col,
  sizes: si,
  transition: t,
  breakpoints,
}

export default config
