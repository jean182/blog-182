import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "emotion-theming"

import Header from "../header/header"
import Footer from "../footer/footer"
import { Main } from "./layout.styled"
import theme from "../../theme"
import Container from "../container/container"

function Layout(props) {
  const { title, children, currentLanguage } = props
  return (
    <ThemeProvider theme={theme}>
      <Header title={title} />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer currentLanguage={currentLanguage} />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  title: PropTypes.string.isRequired,
}

export default Layout
