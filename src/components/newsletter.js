import React, { Component } from "react"
import PropTypes from "prop-types"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { IoMdMailOpen } from "react-icons/io"
import { translate } from "../utils/i18n"
import { ToastContainer, toast } from "react-toastify"
import { first, isEmpty } from "lodash"
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
        <div className="row newsletter px-sm-4 py-4 mb-3 mr-sm-0 ml-sm-0">
          <div className="col-sm">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="m-0">
                {translate(currentLanguage, "newsletter.title")}
              </h3>
              <IoMdMailOpen
                style={{ color: "var(--primaryTheme)", fontSize: "2.5rem" }}
              />
            </div>
            <div className="mt-4">
              <p>
                {translate(currentLanguage, "newsletter.description")}{" "}
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
                  placeholder={translate(currentLanguage, "newsletter.name")}
                  onChange={this.onNameChange}
                  type="text"
                  value={name}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder={translate(currentLanguage, "newsletter.email")}
                  onChange={this.onEmailChange}
                  type="email"
                  value={email}
                />
              </div>
              <div className="form-group">
                <input
                  className="btn btn-block"
                  type="submit"
                  value={translate(currentLanguage, "newsletter.submit")}
                />
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  }
}

Newsletter.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
}

export default Newsletter
