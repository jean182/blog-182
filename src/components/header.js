import React from "react"
import PropTypes from "prop-types"
import Switch from "./switch"
import { Link } from "gatsby"
import { FiMoon, FiSun } from "react-icons/fi"
import "../styles/header.css"

const Header = props => {
  const { title, isOn, toggleTheme } = props
  return (
    <header className="d-flex align-items-center align-items-center justify-content-between">
      <nav className="d-flex align-items-center">
        <h1 className="mx-0 px-0">
          <Link className="link-unstyled" to={`/`}>
            {title}
          </Link>
        </h1>
      </nav>
      <nav className="d-flex align-items-center justify-content-between">
        <div className="mt-2 pr-2">
          {isOn ? (
            <FiMoon style={{ color: "#f5f3ce", fontSize: "1.5rem" }} />
          ) : (
            <FiSun style={{ color: "#ecbd2c", fontSize: "1.5rem" }} />
          )}
        </div>
        <div>
          <Switch isOn={isOn} handleToggle={toggleTheme} />
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default Header
