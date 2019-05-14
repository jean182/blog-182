import React from "react"
import PropTypes from "prop-types"
import Panel from "./panel"
import { systemFont } from "../utils/helpers"

const MailChimpHandler = ({ result, msg }) => {
  const customStyle =
    result === "success"
      ? { backgroundColor: "#d4edda", color: "#155724", borderColor: "#c3e6cb" }
      : { backgroundColor: "#f8d7da", color: "#721c24", borderColor: "#f5c6cb" }
  const { backgroundColor, color, borderColor } = customStyle
  return (
    <Panel
      style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: systemFont,
        marginBottom: "1rem",
        backgroundColor,
        borderColor,
      }}
    >
      {result === "success" ? (
        <p style={{ color }}>{msg}</p>
      ) : (
        <div>
          <p
            style={{ color }}
            dangerouslySetInnerHTML={{
              __html: msg,
            }}
          />
        </div>
      )}
    </Panel>
  )
}

MailChimpHandler.propTypes = {
  msg: PropTypes.string,
  result: PropTypes.string,
}

export default MailChimpHandler
