import React from "react"
import { Toggle } from "react-toggle-component"
import PropTypes from "prop-types"

const Switch = props => {
  const { isOn, handleToggle } = props
  return (
    <Toggle
      name="switch"
      checked={isOn}
      onToggle={handleToggle}
      borderColor={`var(--primaryTheme)`}
      backgroundColor={`var(--primaryTheme)`}
      knobColor={`#fff`}
      knobHeight="22px"
      knobWidth="22px"
      knobGap="1px"
      width="53px"
      height="24px"
    />
  )
}

Switch.propTypes = {
  isOn: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
}

export default Switch
