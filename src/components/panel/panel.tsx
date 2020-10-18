import React from "react"
import PropTypes from "prop-types"

import { Props } from "./panel.props"
import { PanelWrapper } from "./panel.styled"

function Panel({ children }: Props) {
  return <PanelWrapper>{children}</PanelWrapper>
}

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default Panel
