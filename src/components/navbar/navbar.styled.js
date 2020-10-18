import styled from "styled-components"

export const StyledNav = styled.nav`
  width: 100%;
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;

  ${p => p.theme.breakpoints.up("md")} {
    display: flex;
    flex-basis: auto;
  }

  ul {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    list-style: none;
    margin-right: auto;

    ${p => p.theme.breakpoints.up("md")} {
      flex-direction: row;
    }
  }

  li {
    padding-right: 0;
    padding-left: 0;
    margin-bottom: 0 !important;
  }
`

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 1rem;

  ${p => p.theme.breakpoints.down("md")} {
    margin-right: 1rem;
    padding: 0.5rem 0rem;
  }
`
