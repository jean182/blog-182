import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"

import Header from "@components/header/header"
import Footer from "@components/footer/footer"
import Container from "@components/container/container"

import theme from "@theme/index"

import { Main } from "./layout.styled"

import { Props } from "./layout.props"

function Layout({ children, currentLanguage }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
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
}

export default Layout
