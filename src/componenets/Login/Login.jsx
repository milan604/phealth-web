import React, { Component } from "react";
import { Form, Input, Button, Select } from "antd";
import { userActions } from "../../actions/UserActions";
import { success, error } from "../../helpers/Notification";
import ConfirmPhoneNumber from "../Confirmation/confirmationOtp";

const Option = {Select}
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  document.getElementById('home-button').style.visibility = 'visible'
  e.preventDefault();
  deferredPrompt = e;
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      phone_no: "",
      loginStatus: false,
      visible: false,
      otpButton: false,
      loginButton: false
    }
    this.addToHomeScreen = this.addToHomeScreen.bind(this)
    this.submitOtpForm = this.submitOtpForm.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      this.setState({ loginButton: true})
        userActions.confirmations(values, this.props.history).then(response =>{
          if(response.status === 200) {
            success(response.data.success)
            this.setState({ loginStatus: true, visible: true, phone_no: values.phone_no })
          }else{
            error(response.data.error)
          }
          this.setState({ loginButton: false})
        });
      }
    });
  };

  submitOtpForm = e => {
    e.preventDefault();
    this.formRef.validateFields((err, values) =>{
      if(!err) {
      this.setState({ otpButton: true})
        userActions.login(values, this.props.history).then(response => {
          if(response.status === 200) {
            success("Welcome here! To Park");
          }else{
            error(response.data.error)
          }
        this.setState({otpButton: false})
        })
      }
    })
  };

  addToHomeScreen=() => {
    if(deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice
      .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        document.getElementById('home-button').style.visibility = 'hidden'
      } else {
        document.getElementById('home-button').style.visibility = 'visible'
      }
      deferredPrompt = null;
      });
    }
  }

  addToHomeScreenButton = () => {
    return(
      <Button
        style = {{visibility: 'hidden'}}
        id ="home-button"
        onClick = {this.addToHomeScreen}
      >
        Download
      </Button>
    )
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  handleCancel() {
    this.setState({visible: false})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+977'
    })(
      <Select style={{ width: 80 }}>
        <Option value="977">+977</Option>
      </Select>,
    );
    return (
      <article  class="mw6 center bg-white br3 pa4 pa4-ns mv6 ba b--black-10" style={{height: '23rem'}}>
      {this.addToHomeScreenButton()}
      <h4 style={{ textAlign: "center" }}>Login</h4>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone_no', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
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
            disabled = {this.state.loginButton}
            block
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          Don't you have Account ?{" "}
          <a href="/register">Register Now!</a>
        </Form.Item>
      </Form>
      {
        this.state.loginStatus ?
        <ConfirmPhoneNumber
          wrappedComponentRef={this.saveFormRef}
          visible = {this.state.visible}
          handleCancel = {this.handleCancel.bind(this)}
          phone_no = {this.state.phone_no}
          status= "Login"
          otpButton = {this.state.otpButton}
          submitOtpForm = {this.submitOtpForm}
        />
        : 
        null 
      }
    </article>
    );
  }
}
export default Form.create({})(Login);
