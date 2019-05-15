import React, { Component } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { IoMdMailOpen } from "react-icons/io"
import i18n from "../locales/i18n"
import MailChimpHandler from "./mailChimpHandler"

export default class Newsletter extends Component {
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
    const response = await addToMailchimp(email, { name: name })
    const { result, msg } = response
    this.setState(() => ({ response: { result, msg }, name: "", email: "" }))
  }
  render() {
    const { name, email, response } = this.state
    return (
      <div>
        {response.msg !== undefined && (
          <MailChimpHandler result={response.result} msg={response.msg} />
        )}
        <div className="row newsletter px-sm-4 py-4 mb-3 mr-sm-0 ml-sm-0">
          <div className="col-sm">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="m-0">{i18n.t("newsletter.title")}</h3>
              <IoMdMailOpen
                style={{ color: "var(--primaryTheme)", fontSize: "2.5rem" }}
              />
            </div>
            <div className="mt-4">
              <p>
                {i18n.t("newsletter.description")}{" "}
                <span role="img" aria-label="slightly-smiling-face">
                  🙂
                </span>
              </p>
            </div>
          </div>
          <div className="col-sm">
            <form onSubmit={this._handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder={i18n.t("newsletter.name")}
                  onChange={this.onNameChange}
                  type="text"
                  value={name}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder={i18n.t("newsletter.email")}
                  onChange={this.onEmailChange}
                  type="email"
                  value={email}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className="btn btn-block"
                  type="submit"
                  value={i18n.t("newsletter.submit")}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
