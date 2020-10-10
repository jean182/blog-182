import styled from "@emotion/styled"

export const FlashWrapper = styled.svg`
  fill: var(--primaryTheme);
  width: 50px;
  margin-right: -10px;
  margin-left: -10px;
  margin-bottom: -10px;
`

export const FlashMobileWrapper = styled.svg`
  fill: var(--primaryTheme);

  ${p => p.theme.breakpoints.up("md")} {
    display: none;
  }

  ${p => p.theme.breakpoints.down("md")} {
    width: 10%;
  }
`
