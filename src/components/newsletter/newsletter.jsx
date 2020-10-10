import React from "react"
import PropTypes from "prop-types"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { ToastContainer, toast } from "react-toastify"
import { first, isEmpty } from "lodash"
import { translate } from "../../utils/i18n"
import {
  Column,
  Input,
  InputBtn,
  InputWrapper,
  MailIcon,
  MarginDiv,
  Title,
  NewsletterTitleWrapper,
  NewsletterWrapper,
} from "./newsletter.styled"
import "react-toastify/dist/ReactToastify.css"

const htmlRegex = /<\s*a[^>]*>(.*?)<\s*\/\s*a>/g

function Newsletter({ currentLanguage }) {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")

  const onNameChange = e => {
    const nameInput = e.target.value
    setName(nameInput)
  }

  const onEmailChange = e => {
    const emailInput = e.target.value
    setEmail(emailInput)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (name !== "" || email !== "") {
      const response = await addToMailchimp(email, { name })
      const { result, msg } = response
      if (result === "success") return toast.success(msg, { autoClose: 2000 })

      const link = msg.match(htmlRegex)
      const message = msg.replace(htmlRegex, "")

      if (!isEmpty(link) && first(link)) {
        const Message = () => {
          return (
            <div>
              <p>{message}</p>
              <div dangerouslySetInnerHTML={{ __html: first(link) }} />
            </div>
          )
        }
        toast.error(<Message />, {
          autoClose: 2000,
        })
      } else {
        toast.error(msg, {
          autoClose: 2000,
        })
      }
    } else {
      toast.warn("Please complete all the fields", {
        autoClose: 2000,
      })
    }
    return null
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
          <form onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                placeholder={translate(currentLanguage, "newsletter.name")}
                onChange={onNameChange}
                type="text"
                value={name}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder={translate(currentLanguage, "newsletter.email")}
                onChange={onEmailChange}
                type="email"
                value={email}
              />
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
