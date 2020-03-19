import {
  colors as c,
  sizes as s,
  space as sp,
  transition as t,
} from "gatsby-design-tokens"

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

// export const borders = b
export const colors = col
export const sizes = si
export const transition = t
export const mediaQueries = {
  smMin: "@media (min-width: 576px)",
  mdMin: "@media (min-width: 768px)",
  lgMin: "@media (min-width: 992px)",
  xlMin: "@media (min-width: 1200px)",
  xsMax: "@media (max-width: 575.98px)",
  smMax: "@media (max-width: 767.98px)",
  mdMax: "@media (max-width: 991.98px)",
  lgMax: " @media (max-width: 1199.98px)",
}

const config = {
  colors: col,
  mediaQueries,
  sizes: si,
  transition: t,
  breakpoints: [576, 768, 992, 1200],
}

export default config
