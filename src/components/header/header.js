import React from "react"
import PropTypes from "prop-types"
import Switch from "../switch"
import { HeaderWrapper, Title, TitleLink, SwitchWrapper } from "./header.styled"



const Header = props => {
  const { title } = props
  return (
    <HeaderWrapper>
      <nav>
        <Title>
          <TitleLink to={`/`}>
            {title}
          </TitleLink>
        </Title>
      </nav>
      <SwitchWrapper>
        <Switch />
      </SwitchWrapper>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
