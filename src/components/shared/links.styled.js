import styled from "styled-components"
import { Link } from "gatsby"

export const UnstyledGatsbyLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

export const RegularGatsbyLink = styled(Link)`
  box-shadow: none;
  color: var(--primaryLink);
  text-decoration: none;
`

export const FallbackGatsbyLink = styled(RegularGatsbyLink)`
  color: var(--fallBackLink);
`

export const RegularLink = styled.a`
  box-shadow: none;
  color: var(--primaryLink);
  text-decoration: none;
`

export const FallbackLink = styled(RegularLink)`
  color: var(--fallBackLink);
`
