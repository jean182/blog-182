import styled from "@emotion/styled"
import { rhythm } from "../../utils/typography"

export const LayoutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

  ${(p) => p.theme.breakpoints.down('md')} {
    padding: ${rhythm(0.5)} ${rhythm(1 / 2)};
  }
`
