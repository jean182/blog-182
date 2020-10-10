import styled from "@emotion/styled"

export const Title = styled.div`
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 2rem;
  line-height: inherit;
  white-space: nowrap;
  font-family: "Bangers", cursive;

  &&& a {
    color: var(--primaryTheme);
    text-decoration: none;
  }

  ${p => p.theme.breakpoints.down("md")} {
    span {
      display: none;
    }
  }

  span:first-of-type {
    margin-right: -2px;
  }

  span:last-child {
    margin-left: -8px;
  }

  svg {
    width: 0.8em;
    fill: var(--primaryTheme);

    ${p => p.theme.breakpoints.down("md")} {
      width: 2rem;
    }
  }
`
