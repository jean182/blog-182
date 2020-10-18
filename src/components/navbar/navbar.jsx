import React from "react"
import PropTypes from "prop-types"
import { useMedia } from "react-media"
import { Link } from "gatsby"
import { CSSTransition } from "react-transition-group"

import { useTheme } from "../../utils/hooks/use-styled-theme"
import Switch from "../switch/switch"
import { SwitchWrapper } from "./navbar.styled"

function Navbar({ closeSidebar, collapseStatus, isOpen }) {
  const theme = useTheme()
  const isSmallScreen = useMedia({
    query: `(max-width: ${theme.breakpoints.values.md}px)`,
  })
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      closeSidebar()
    }
  }

  return isSmallScreen ? (
    <CSSTransition in={isOpen} timeout={350} classNames="show" unmountOnExit>
      <div
        id="navbar"
        className={`${"navbar-collapse show".concat(collapseStatus)}`}
      >
        <ul className="navbar-nav">
          <li
            role="presentation"
            onClick={closeSidebar}
            onKeyPress={handleKeyPress}
          >
            <Link activeClassName="active" to="/">
              Home
            </Link>
          </li>
          <li
            role="presentation"
            onClick={closeSidebar}
            onKeyPress={handleKeyPress}
          >
            <Link activeClassName="active" to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
        <SwitchWrapper>
          <Switch />
        </SwitchWrapper>
      </div>
    </CSSTransition>
  ) : (
    <div id="navbar" className={`${"navbar-collapse ".concat(collapseStatus)}`}>
      <ul className="navbar-nav">
        <li
          role="presentation"
          onClick={closeSidebar}
          onKeyPress={handleKeyPress}
        >
          <Link activeClassName="active" to="/">
            Home
          </Link>
        </li>
        <li
          role="presentation"
          onClick={closeSidebar}
          onKeyPress={handleKeyPress}
        >
          <Link activeClassName="active" to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
      <SwitchWrapper>
        <Switch />
      </SwitchWrapper>
    </div>
  )
}

Navbar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  collapseStatus: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default Navbar
