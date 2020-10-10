import styled from "@emotion/styled"
// import { UnstyledGatsbyLink } from "../shared/links.styled"

export const StyledHeader = styled.header`
  font-weight: 400;
  line-height: 32px;

  &&& .fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
  }

  & .navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background-color: var(--primaryBg);
    transition: background 0.5s ease;
  }

  ${p => p.theme.breakpoints.up("md")} {
    && .expand {
      flex-flow: row nowrap;
      justify-content: flex-start;
    }
  }

  .navbar .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  & .navbar-collapse {
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;
  }

  .collapsing {
    position: relative;
    height: 0;
    overflow: hidden;
    transition: height 0.35s ease;
  }

  .navbar-nav {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    margin-right: auto;
  }

  dl,
  ol,
  ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  ${p => p.theme.breakpoints.up("md")} {
    && .expand > .container {
      flex-wrap: nowrap;
    }

    .expand .navbar-nav {
      flex-direction: row;
    }

    .expand .collapse {
      display: -ms-flexbox !important;
      display: flex !important;
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
    }

    .expand .navbar-nav .nav-link {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
      text-decoration: none;
    }
  }

  ${p => p.theme.breakpoints.down("md")} {
    && .expand > .container {
      padding-right: 0;
      padding-left: 0;
    }

    .collapse:not(.show) {
      display: none;
    }
  }

  a {
    color: var(--primaryText);
    text-decoration: none;
    background-color: transparent;
    display: block;
    padding: 0.5rem 1rem;

    ${p => p.theme.breakpoints.down("md")} {
      padding: 0.5rem 0rem;
    }
  }

  li,
  a.active {
    color: var(--primaryTheme);
  }
`

/*
 TODO
 use theme UI mode...
 ${p => p.theme.colors.primaryTheme}
*/
