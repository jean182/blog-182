import React, { Component } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { IoMdMail } from "react-icons/io"
import { getSubscriptioPreferenceUrl } from "../utils/helpers"

export default class Newsletter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      response: {},
    };
  }

  onNameChange = (e) => {
    const name = e.target.value
    this.setState(() => ({ name }));
  }

  onEmailChange = (e) => {
    const email = e.target.value
    this.setState(() => ({ email }));
  }

  _handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = this.state
    const response = await addToMailchimp(email, { name: name })
    const { result, msg } = response
    this.setState(() => ({ response: { result, msg }, name: '', email: '' }))
    console.log(this.state.response)

  }
  render() {
    const { name, email, response } = this.state
    return (
      <div style={{ padding: "1rem" }} className="newsletter">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ margin: "0" }}>Stay in touch</h3>
          <IoMdMail style={{ color: "var(--primaryTheme)", fontSize: "2.5rem" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
          {response.msg !== undefined && <div>
            <p dangerouslySetInnerHTML={{ __html: getSubscriptioPreferenceUrl(response.msg) }} />
          </div>}
        </div>
        <div>
          <form className="" onSubmit={this._handleSubmit}>
            <div className="form-group">
              <input className="form-control" placeholder="Name" onChange={this.onNameChange} type="text" value={name} />
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Email" onChange={this.onEmailChange} type="email" value={email} />
            </div>
            <div className="form-group">
              <input className="btn btn-block" type="submit" value="Subscribe" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}