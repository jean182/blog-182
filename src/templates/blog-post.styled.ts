import styled from "styled-components"
import { rhythm, scale } from "../utils/typography"

export const DateAndTime = styled.small`
  display: block;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-0.5)};
  ${scale(-1 / 5)};
`

export const LineBreak = styled.hr`
  margin-bottom: ${rhythm(1)};
`

export const PostTitle = styled.h1`
  text-align: initial;
`

export const Paginator = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`
