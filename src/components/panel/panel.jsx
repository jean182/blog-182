import React from "react"
import PropTypes from "prop-types"
import { PanelWrapper } from "./panel.styled"

function Panel({ children }) {
  return <PanelWrapper>{children}</PanelWrapper>
}

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default Panel
