import React from "react"
import PropTypes from "prop-types"
import Switch from "./switch"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import { FiMoon, FiSun } from "react-icons/fi"
import "../styles/header.css"

const Header = props => {
  const rootPath = `${__PATH_PREFIX__}/`
  const { location, title, isOn, toggleTheme } = props
  return (
    <header className="header">
      <nav>
        {location.pathname === rootPath ? (
          <h1
            className="header__logo"
            style={{
              marginBottom: rhythm(1.5),
              marginTop: 0,
            }}
          >
            <Link className="link-unstyled" to={`/`}>
              {`<${title} />`}
            </Link>
          </h1>
        ) : (
          <h1
            className="header__logo"
            style={{
              fontFamily: `Montserrat, sans-serif`,
              marginTop: 0,
            }}
          >
            <Link className="link-unstyled" to={`/`}>
              {title}
            </Link>
          </h1>
        )}
      </nav>
      <nav style={{ display: "flex", justifyContent: "spaceBetween" }}>
        <div style={{ marginTop: "-0.5px", paddingRight: "0.5rem" }}>
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
