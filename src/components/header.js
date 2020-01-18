/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import Switch from "./switch"
import { Link } from "gatsby"
import { mediaQueries } from "../gatsby-plugin-theme-ui"

const navItemTopOffset = `0.4rem`

const navItemHorizontalSpacing = [1, null, 2]

const overrideDefaultMdLineHeight = {
  [mediaQueries.md]: {
    lineHeight: t => t.sizes.headerHeight,
  },
}

const navItemStyles = {
  borderBottom: `2px solid transparent`,
  color: `navigation.linkDefault`,
  display: `block`,
  fontSize: 3,
  lineHeight: t => t.sizes.headerHeight,
  [mediaQueries.md]: {
    lineHeight: t => `calc(${t.sizes.headerHeight} - ${navItemTopOffset})`,
  },
  position: `relative`,
  textDecoration: `none`,
  zIndex: 1,
  "&:hover, &:focus": { color: `navigation.linkHover` },
}

const Header = props => {
  const { isOn, title, theme, toggleTheme } = props
  return (
    <header
      className="header"
      sx={{
        bg: `navigation.background`,
        height: `headerHeight`,
        left: 0,
        px: `env(safe-area-inset-left)`,
        right: 0,
        top: t => t.sizes.bannerHeight,
        zIndex: `navigation`,
      }}
    >
      <nav>
        <h1 className="header__logo">
          <Link className="link-unstyled title-header" to={`/`}>
            {title}
          </Link>
        </h1>
      </nav>
      <div
        sx={{
          ...navItemStyles,
          ...overrideDefaultMdLineHeight,
          color: `navigation.socialLink`,
          ml: navItemHorizontalSpacing,
          display: "flex",
          alignItems: "center",
          "&:hover": {
            color: `navigation.linkHover`,
          },
        }}
      >
        <Switch theme={theme} isOn={isOn} handleToggle={toggleTheme} />
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default Header
