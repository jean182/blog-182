import React, { Component } from "react"
import PropTypes from "prop-types"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { translate } from "../../utils/i18n"
import { ToastContainer, toast } from "react-toastify"
import { first, isEmpty } from "lodash"
import { Column, Input, InputBtn, InputWrapper, MailIcon, MarginDiv, Title, NewsletterTitleWrapper, NewsletterWrapper } from "./newsletter.styled"
import "react-toastify/dist/ReactToastify.css"

const htmlRegex = /<\s*a[^>]*>(.*?)<\s*\/\s*a>/g

class Newsletter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      response: {},
    }
  }

  onNameChange = e => {
    const name = e.target.value
    this.setState(() => ({ name }))
  }

  onEmailChange = e => {
    const email = e.target.value
    this.setState(() => ({ email }))
  }

  _handleSubmit = async e => {
    e.preventDefault()
    const { name, email } = this.state
    if (name !== "" || email !== "") {
      const response = await addToMailchimp(email, { name: name })
      const { result, msg } = response
      this.setState(() => ({ response: { result, msg } }))
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
  }

  render() {
    const { name, email } = this.state
    const { currentLanguage } = this.props
    return (
      <div>
        <NewsletterWrapper>
          <Column>
            <NewsletterTitleWrapper>
              <Title>
                {translate(currentLanguage, "newsletter.title")}
              </Title>
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
            <form onSubmit={this._handleSubmit}>
              <InputWrapper>
                <Input
                  placeholder={translate(currentLanguage, "newsletter.name")}
                  onChange={this.onNameChange}
                  type="text"
                  value={name}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  placeholder={translate(currentLanguage, "newsletter.email")}
                  onChange={this.onEmailChange}
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
      </div>
    )
  }
}

Newsletter.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
}

export default Newsletter