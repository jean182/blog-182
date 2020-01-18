import {
  colors as c,
  mediaQueries as mq,
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
  modes: {
    light: {
      navigation: {
        socialLink: c.grey[60],
      },
    },
    dark: {
      navigation: {
        socialLink: c.grey[60],
      },
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
export const mediaQueries = mq
export const sizes = si
export const transition = t

const config = {
  colors: col,
  mediaQueries: mq,
  sizes: si,
  transition: t,
}

export default config
