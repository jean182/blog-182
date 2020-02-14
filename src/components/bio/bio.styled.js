import styled from "@emotion/styled"
import Image from "gatsby-image"
import { rhythm } from "../../utils/typography"

export const DivWrapper = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1.5)};
  margin-top: ${rhythm(1)};
`

export const ImageWrapper = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 50;
  border-radius: 100%;
`
