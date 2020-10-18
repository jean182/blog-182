import styled from "styled-components"
import Image from "gatsby-image"

import { rhythm } from "@utils/typography"

export const DivWrapper = styled.div`
  display: flex;
  align-items: center;

  a {
    box-shadow: none;
    color: var(--primaryLink);
    text-decoration: none;
  }
`

export const ImageWrapper = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 50;
  border-radius: 100%;
`
