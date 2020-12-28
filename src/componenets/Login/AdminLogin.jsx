import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import { userActions } from "../../actions/UserActions";
let deferredPrompt;
window.addEventListener("beforeinstallprompt", e => {
  document.getElementById("home-button").style.visibility = "visible";
  e.preventDefault();
  deferredPrompt = e;
});

class AdminLogin extends Component {
  constructor() {
    super();
    this.addToHomeScreen = this.addToHomeScreen.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        userActions.login(values, this.props.history);
      }
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  addToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          document.getElementById("home-button").style.visibility = "hidden";
        } else {
          document.getElementById("home-button").style.visibility = "visible";
        }
        deferredPrompt = null;
      });
    }
  };

  addToHomeScreenButton = () => {
    return (
      <Button
        style={{ visibility: "hidden" }}
        id="home-button"
        onClick={this.addToHomeScreen}
      >
        Download
      </Button>
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <article
        class="mw6 center bg-white br3 pa4 pa4-ns mv6 ba b--black-10"
        style={{ height: "23rem" }}
      >
        {this.addToHomeScreenButton()}
        <h4 style={{ textAlign: "center" }}>Login</h4>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Please input your email!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </article>
    );
  }
}
export default Form.create({})(AdminLogin);
