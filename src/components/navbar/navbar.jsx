import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"
import Switch from "../switch/switch"
import { SwitchWrapper } from "./navbar.styled"

function Navbar({ closeSidebar, collapseStatus, isOpen }) {
  const sidebarRef = React.useRef(null)
  const styleAnimation =
    sidebarRef !== null && sidebarRef.current
      ? {
          height: sidebarRef.current.getBoundingClientRect().height,
        }
      : null

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      closeSidebar()
    }
  }

  return (
    <div
      ref={sidebarRef}
      id="navbar"
      className={`${"navbar-collapse ".concat(
        collapseStatus,
        isOpen ? " show" : ""
      )}`}
      {...(collapseStatus === "collapsing" &&
        sidebarRef !== null && { style: styleAnimation })}
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
  )
}

Navbar.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
  collapseStatus: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default Navbar
