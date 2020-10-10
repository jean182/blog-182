import React from "react"
import PropTypes from "prop-types"
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

Layout.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  title: PropTypes.string.isRequired,
}

export default Layout
