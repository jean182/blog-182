import styled from "styled-components"

import { SYSTEM_FONT } from "@src/utils/constants"

export const PanelWrapper = styled.div`
  color: var(--panelText);
  background-color: var(--panelBg);
  border-color: var(--panelBorder);
  font-size: 0.8em;
  border-radius: 0.75em;
  padding: 0.75em;
  word-break: keep-all;
  margin-bottom: 1rem;
  border: 1px solid var(--panelBorder);
  font-family: ${SYSTEM_FONT};
`
