import React from "react"
import Switch from "../switch/switch"
import { HeaderWrapper, Title, TitleLink, SwitchWrapper } from "./header.styled"
import { FlashLarge, FlashSmall } from "../flash/flash"



function Header() {
  return (
    <HeaderWrapper>
      <nav>
        <Title>
          <TitleLink to={`/`}>
            Lo
            <FlashLarge />
            erkid
          </TitleLink>
        </Title>
        <TitleLink to={`/`}>
          <FlashSmall />
        </TitleLink>
      </nav>
      <SwitchWrapper>
        <Switch />
      </SwitchWrapper>
    </HeaderWrapper>
  )
}

export default Header
