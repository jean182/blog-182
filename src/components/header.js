import React from "react"
import PropTypes from "prop-types"
import Switch from "./switch"
import { Link } from "gatsby"
import { FiMoon, FiSun } from "react-icons/fi"

const Header = props => {
  const { isOn, title, theme, toggleTheme } = props
  return (
    <header className="header">
      <nav>
        <h1 className="header__logo">
          <Link className="link-unstyled title-header" to={`/`}>
            {title}
          </Link>
        </h1>
      </nav>
      <nav style={{ display: "flex", justifyContent: "spaceBetween" }}>
        <div style={{ marginTop: "-0.5px", paddingRight: "0.5rem" }}>
          {theme === "dark" ? (
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
  title: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default Header
