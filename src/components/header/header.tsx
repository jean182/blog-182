import React from "react"

import Container from "@components/container/container"
import Burger from "@components/burger/burger"
import Navbar from "@components/navbar/navbar"
import Logo from "@components/logo/logo"
import { useOutsideHandler } from "@utils/hooks"

import { StyledHeader } from "./header.styled"

function Header() {
  const navRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  const [collapseStatus, setCollapseStatus] = React.useState("collapse")
  useOutsideHandler(navRef, () => setOpen(false))
  const closeSidebar = () => open && setOpen(false)

  const handleClick = () => {
    setCollapseStatus("collapse")
    setOpen(!open)
  }

  return (
    <StyledHeader>
      <nav className="navbar expand fixed" ref={navRef}>
        <Container>
          <Logo closeSidebar={closeSidebar} />
          <Burger onClick={handleClick} open={open} />
          <Navbar
            collapseStatus={collapseStatus}
            isOpen={open}
            closeSidebar={closeSidebar}
          />
        </Container>
      </nav>
    </StyledHeader>
  )
}

export default Header
