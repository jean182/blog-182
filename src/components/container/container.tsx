import React from "react"
import PropTypes from "prop-types"

import { Props } from "./container.props"
import { StyledContainer } from "./container.styled"

function Container({ children }: Props) {
  return <StyledContainer className="container">{children}</StyledContainer>
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default Container
