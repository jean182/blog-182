import styled from "styled-components"

export const StyledFooter = styled.footer`
  padding: 0rem 1rem;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: self-start;
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

        a {
          margin-left: 0;
          text-align: center;
        }

        margin: auto;
        flex-direction: column;
      }
    }
  
    .rss {
      flex-grow: 1 0;
      margin-left: auto;

      ${p => p.theme.breakpoints.down("md")} {
          margin-right: auto;
          margin-left: auto;
          text-align: center;
      }
    }

    ol {
      margin-left: 1rem;
      display: flex;
      flex-direction: row;
      padding-left: 0;
      list-style: none;

      margin-top: 0em;
      margin-bottom: 0.5em;

      a {
        color: var(--text);
        -webkit-text-decoration: none;
        text-decoration: none;
        background-color: transparent;
        display: block;
        padding: 0.5rem;
      }

      ${p => p.theme.breakpoints.down("md")} {
        margin: auto;
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
