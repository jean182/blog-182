import React from "react"
import { PanelWrapper } from "./panel.styled"

function Panel({ children, style = {} }) {
  return (
    <PanelWrapper>
      {children}
    </PanelWrapper>
  )
}

export default Panel
