import styled from "@emotion/styled"
import { IoMdMailOpen } from "react-icons/io"

export const NewsletterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Montserrat, sans-serif;
  border-radius: 0.5rem;
  background-color: var(--subscriptionBg);
  box-shadow: 0 2px 15px 0 var(--primaryTheme);
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: ${p => p.theme.breakpoints[0]}px) {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin-left: 0;
      margin-right: 0;
  }
`

export const Column = styled.div`
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  @media (min-width: ${p => p.theme.breakpoints[0]}px) {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
`

export const NewsletterTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.h3`
  margin: 0;
`

export const MailIcon = styled(IoMdMailOpen)`
  color: var(--primaryTheme);
  font-size: 2.5rem;
`

export const MarginDiv = styled.div`
  margin-top: 1.5rem;
`

export const InputWrapper = styled.div`
  margin-bottom: 1rem;
`

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--mutedText);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  :focus {
    outline: none !important;
    border: 1px solid var(--primaryTheme);
    box-shadow: 0 0 10px var(--primaryTheme);
  }
  ::placeholder {
    color: #999;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    color: #999;
  }

  ::-ms-input-placeholder {
    color: #999;
  }
`

export const InputBtn = styled.input`
  display: block;
  width: 100%;
  border-radius: 0.25rem;
  background-color: var(--primaryTheme);
  color: white;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
`

/*
 TODO
 use theme UI mode...
 ${p => p.theme.colors.primaryTheme}
*/
