import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Switch from "./switch"
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
      <Switch isOn={isOn} handleToggle={toggleTheme} />
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
