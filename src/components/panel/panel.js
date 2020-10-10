import React from "react"
import { PanelWrapper } from "./panel.styled"

function Panel({ children }) {
  return (
    <PanelWrapper>
      {children}
    </PanelWrapper>
  )
}

export default Panel
