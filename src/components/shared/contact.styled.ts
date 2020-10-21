import styled from "styled-components"

export const ContactStyled = styled.div`
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

  svg {
    width: 1.5rem;
    fill: var(--primaryTheme);
  }
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: initial;
  justify-content: space-between;
`
