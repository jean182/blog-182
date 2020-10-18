import { Link } from "gatsby"
import React from "react"
import PropTypes from "prop-types"

import SVG from "@styles/assets/flash.svg"

import { Props } from "./logo.props"
import { Title } from "./logo.styled"

function Logo({ closeSidebar }: Props) {
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

/*
  Icons made by:
  <a 
    href="https://smashicons.com/" 
    title="Smashicons">Smashicons
  </a> from 
  <a 
    href="https://www.flaticon.com/" 
    title="Flaticon"
  > 
    www.flaticon.com
  </a>
*/
