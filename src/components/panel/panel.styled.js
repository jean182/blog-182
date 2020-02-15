import styled from "@emotion/styled"
import { systemFont } from "../../utils/helpers"

export const PanelWrapper = styled.div`
  color: var(--panelText);
  background-color: var(--panelBg);
  border-color: var(--panelBorder);
  font-size: 0.9em;
  border-radius: 0.75em;
  padding: 0.75em;
  word-break: keep-all;
  margin-bottom: 1rem;
  border: 1px solid var(--panelBorder);
  font-family: ${systemFont};
`

/*
 TODO
 use theme UI mode...
 ${p => p.theme.colors.primaryTheme}
*/
