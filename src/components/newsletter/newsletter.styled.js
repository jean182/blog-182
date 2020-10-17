import styled from "@emotion/styled"
import { withPrefix } from "gatsby"
import { IoMdMailOpen } from "react-icons/io"

export const NewsletterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  border-radius: 0.5rem;
  background-color: var(--subscriptionBg);
  box-shadow: 0 2px 15px 0 var(--primaryTheme);
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  margin-bottom: 1rem;

  padding-left: 1.5rem;
  padding-right: 1.5rem;

  p {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, Montserrat,
      sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  .form-control.is-invalid ~ .invalid-feedback,
  .form-control.is-invalid ~ .invalid-tooltip,
  .was-validated .form-control:invalid ~ .invalid-feedback,
  .was-validated .form-control:invalid ~ .invalid-tooltip {
    display: block;
  }

  .form-control.is-valid ~ .valid-feedback,
  .form-control.is-valid ~ .valid-tooltip,
  .was-validated .form-control:valid ~ .valid-feedback,
  .was-validated .form-control:valid ~ .valid-tooltip {
    display: block;
  }

  .valid-feedback {
    display: none;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.8rem;
    line-height: 1.5;
    color: #28a745;
  }

  .invalid-feedback {
    display: none;
    width: 100%;
    margin-top: 0.25rem;
    line-height: 1.5;
    font-size: 0.8rem;
    color: #dc3545;
  }

  .form-control.is-valid,
  .was-validated .form-control:valid {
    border-color: #28a745;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url(${withPrefix("/img/success.svg")});
    background-repeat: no-repeat;
    background-position: center right calc(0.375em + 0.1875rem);
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);

    & :focus {
      outline: none !important;
      border: 1px solid #28a745;
      box-shadow: 0 0 10px #28a745;
    }
  }

  .form-control.is-invalid,
  .was-validated .form-control:invalid {
    border-color: #dc3545;
    padding-right: calc(1.5em + 0.75rem);
    background-image: url(${withPrefix("/img/error.svg")});
    background-repeat: no-repeat;
    background-position: center right calc(0.375em + 0.1875rem);
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);

    & :focus {
      outline: none !important;
      border: 1px solid #dc3545;
      box-shadow: 0 0 10px #dc3545;
    }
  }

  ${p => p.theme.breakpoints.down("md")} {
    padding-left: 0;
    padding-right: 0;
  }
`

export const Column = styled.div`
  position: relative;
  width: 100%;
  min-height: 1px;
  padding: 15px;
  ${p => p.theme.breakpoints.up("md")} {
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
  -webkit-transition: border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
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
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  background-color: var(--primaryTheme);
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  opacity: 1;
`

export const MessageStyled = styled.div`
  font-family: sans-serif;
  font-size: 1rem;

  a {
    color: var(--primaryLink);
    text-decoration: none;
    background-color: transparent;
    display: block;
    padding: 0.5rem 1rem;
  }
`
