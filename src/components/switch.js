import React from "react"
import Toggle from "react-toggle"
import { FiSun, FiMoon } from "react-icons/fi"
import "react-toggle/style.css"
import "../styles/switch.css"

const Switch = props => {
  const { isOn, handleToggle } = props
  return (
    <Toggle
      className="custom-switchness"
      defaultChecked={isOn}
      icons={{
        checked: <FiMoon style={{ color: "#f5f3ce" }} />,
        unchecked: <FiSun style={{ color: "#ecbd2c" }} />,
      }}
      onChange={handleToggle}
    />
  )
}

export default Switch
