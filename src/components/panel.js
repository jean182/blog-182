import React from "react"

function Panel({ children, style = {} }) {
  return (
    <div
      style={{
        fontSize: "0.9em",
        border: "1px solid var(--primaryBorderBg)",
        borderRadius: "0.75em",
        padding: "0.75em",
        background: "var(--inlineCode-bg)",
        wordBreak: "keep-all",
        marginBottom: "1rem",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Panel
