import React from "react"
import PropTypes from "prop-types"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { ToastContainer, toast } from "react-toastify"
import { first, isEmpty } from "lodash"
import { useForm } from "react-hook-form"

import { HTML_REGEX } from "@utils/constants"
import { translate } from "@utils/i18n"

import { Props } from "./newsletter.props"
import { FormValues, MessageProps } from "./newsletter.interfaces"
import {
  Input,
  InputBtn,
  InputWrapper,
  MailIcon,
  MarginDiv,
  Title,
  NewsletterTitleWrapper,
  NewsletterWrapper,
  Column,
  MessageStyled,
} from "./newsletter.styled"

import "react-toastify/dist/ReactToastify.css"

const Message = ({ message, link }: MessageProps) => {
  return (
    <MessageStyled>
      <p>{message}</p>
      <div dangerouslySetInnerHTML={{ __html: first(link) }} />
    </MessageStyled>
  )
}

function Newsletter({ currentLanguage }: Props) {
  const { register, reset, handleSubmit, errors } = useForm<FormValues>()

  // Reset if user switches page.
  React.useEffect(() => reset(), [currentLanguage, reset])

  const onSubmit = async data => {
    const { name, email } = data
    const { result, msg } = await addToMailchimp(email, { name })
    if (result === "success") {
      toast.success(msg, { autoClose: 2000 })
      return
    }

    const link = msg.match(HTML_REGEX)
    const message = msg.replace(HTML_REGEX, "")

    if (!isEmpty(link) && first(link)) {
      toast.error(<Message message={message} link={link} />)
    } else {
      toast.error(msg, {
        autoClose: 2000,
      })
    }
  }

  const inputValidClass = (errorKey: string) => {
    if (isEmpty(errors)) {
      return ""
    }
    if (errors[errorKey]) {
      return "is-invalid"
    }
    return "is-valid"
  }

  return (
    <>
      <NewsletterWrapper>
        <Column>
          <NewsletterTitleWrapper>
            <Title>{translate(currentLanguage, "newsletter.title")}</Title>
            <MailIcon />
          </NewsletterTitleWrapper>
          <MarginDiv>
            <p>
              {translate(currentLanguage, "newsletter.description")}{" "}
              <span role="img" aria-label="slightly-smiling-face">
                🙂
              </span>
            </p>
          </MarginDiv>
        </Column>
        <Column>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputWrapper>
              <Input
                name="name"
                ref={register({
                  required: translate(currentLanguage, "newsletter.required"),
                })}
                className={`form-control ${inputValidClass("name")} `}
                placeholder={translate(currentLanguage, "newsletter.name")}
                type="text"
                required
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </InputWrapper>
            <InputWrapper>
              <Input
                className={`form-control ${inputValidClass("email")}`}
                name="email"
                ref={register({
                  required: translate(currentLanguage, "newsletter.required"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: translate(
                      currentLanguage,
                      "newsletter.invalidEmail"
                    ),
                  },
                })}
                placeholder={translate(currentLanguage, "newsletter.email")}
                type="email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </InputWrapper>
            <InputWrapper>
              <InputBtn
                type="submit"
                value={translate(currentLanguage, "newsletter.submit")}
              />
            </InputWrapper>
          </form>
        </Column>
      </NewsletterWrapper>
      <ToastContainer />
    </>
  )
}

Newsletter.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
}

export default Newsletter
