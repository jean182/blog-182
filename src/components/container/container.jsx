import React from "react"
import PropTypes from "prop-types"

import { StyledContainer } from "./container.styled"

function Container({ children }) {
  return <StyledContainer className="container">{children}</StyledContainer>
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default Container
