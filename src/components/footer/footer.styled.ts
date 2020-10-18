import styled from "styled-components"

export const StyledFooter = styled.footer`
  flex-shrink: 0;
  padding: 0rem 1rem;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: auto;
    margin-left: auto;
  

    .meta {
      display: flex;
      flex-direction: row;
      padding-left: 0;
      list-style: none;

      small {
        margin-left: 1rem;
      }

      ${p => p.theme.breakpoints.down("md")} {
        svg {
          margin: auto;
        }

        small {
          margin-top 1rem;
          margin-left: 0;
        }

        flex-direction: column;
      }
    }

    ol {
      display: flex;
      flex-direction: row;
      padding-left: 0;
      list-style: none;

      a {
        color: var(--text);
        -webkit-text-decoration: none;
        text-decoration: none;
        background-color: transparent;
        display: block;
        padding: 0.5rem;
      }
    }

    ${p => p.theme.breakpoints.down("md")} {
      flex-direction: column;
    }
  }

  svg {
    width: 1.5rem;
    fill: var(--primaryTheme);
  }
`
