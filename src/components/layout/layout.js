import React from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import { LayoutWrapper } from "./layout.styled"

function Layout(props) {
  const { title, children, currentLanguage } = props
  return (
    <LayoutWrapper>
      <Header title={title} />
      <main>{children}</main>
      <Footer currentLanguage={currentLanguage} />
    </LayoutWrapper>
  )
}

export default Layout
