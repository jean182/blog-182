import styled from "@emotion/styled"

export const StyledBurger = styled.button`
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1;
  outline: none;

  div {
    width: 2rem;
    height: 0.25rem;
    background: var(--primaryText);
    border-radius: 10px;
    transition: all 0.35s linear;
    position: relative;
    transform-origin: 1px;

    :first-of-type {
      transform: ${({ isOpen }) => (isOpen ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-of-type(2) {
      opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
      transform: ${({ isOpen }) =>
        isOpen ? "translateX(20px)" : "translateX(0)"};
    }

    :nth-of-type(3) {
      transform: ${({ isOpen }) => (isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }
  }

  ${p => p.theme.breakpoints.up("md")} {
    display: none;
  }
`
