import React from "react"
import { ThemeProvider } from "emotion-theming"

import Header from "../header/header"
import Footer from "../footer/footer"
import { LayoutWrapper } from "./layout.styled"
import theme from "../../theme"

function Layout(props) {
  const { title, children, currentLanguage } = props
  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper>
        <Header title={title} />
        <main>{children}</main>
        <Footer currentLanguage={currentLanguage} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}

export default Layout
