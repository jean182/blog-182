import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

const Header = props => {
  const rootPath = `${__PATH_PREFIX__}/`
  const { location, title } = props
  return (
    <header
      style={{
        display: "flex",
        borderBottom: "1px solid black",
        justifyContent: "space-between",
      }}
    >
      <nav>
        {location.pathname === rootPath ? (
          <h1
            style={{
              marginBottom: rhythm(1.5),
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
        ) : (
          <h1
            style={{
              fontFamily: `Montserrat, sans-serif`,
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              Blog
            </Link>
          </h1>
        )}
      </nav>
      <nav>
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            justifyContent: "flex-end",
          }}
        >
          {location.pathname !== "/about" && (
            <li style={{ paddingRight: "8px" }}>
              <Link
                to={`/about`}
                style={{
                  ...scale(0.5),
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                  fontWeight: "bold",
                }}
              >
                About
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header
