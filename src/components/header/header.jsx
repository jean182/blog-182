import React from "react"
import { StyledHeader } from "./header.styled"
import { useOutsideHandler } from "../../utils/hooks/use-outside-handler"
import Container from "../container/container"
import Burger from "../burger/burger"
import Navbar from "../navbar/navbar"
import Logo from "../logo/logo"

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
          <Burger onClick={handleClick} type="button" open={open} />
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
