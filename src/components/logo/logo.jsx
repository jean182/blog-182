import { Link } from "gatsby"
import React from "react"
import PropTypes from "prop-types"

import SVG from "../../styles/assets/flash.svg"

import { Title } from "./logo.styled"

function Logo({ closeSidebar }) {
  return (
    <Title onClick={closeSidebar}>
      <Link to="/">
        <span>Lo</span>
        <SVG />
        <span>erkid</span>
      </Link>
    </Title>
  )
}

Logo.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
}

export default Logo
