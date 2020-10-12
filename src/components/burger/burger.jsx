import React from "react"
import PropTypes from "prop-types"

import { StyledBurger } from "./burger.styled"

const Burger = ({ onClick, type, open }) => {
  return (
    <StyledBurger
      type={type}
      className={`${!open ? "burger collapsed" : "burger"}`}
      onClick={onClick}
      isOpen={open}
      data-toggle="collapse"
      data-target="#navbar"
      aria-expanded={open}
      aria-label="Toggle navigation"
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

Burger.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

export default Burger
