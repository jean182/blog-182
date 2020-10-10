import styled from "@emotion/styled"
import { UnstyledGatsbyLink } from "../shared/links.styled"

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const Title = styled.h1`
  margin-top: 0;
  color: var(--primaryTheme);

  ${p => p.theme.breakpoints.down("sm")} {
    display: none;
  }
`

export const TitleLink = styled(UnstyledGatsbyLink)`
  text-transform: lowercase;
`

export const SwitchWrapper = styled.div`
  display: flex;
  alignitems: center;
`

/*
 TODO
 use theme UI mode...
 ${p => p.theme.colors.primaryTheme}
*/
