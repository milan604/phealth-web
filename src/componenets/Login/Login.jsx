import React, { Component } from 'react';
import '../../index.css';
import axios from "axios";
import { Form, Icon, Input, Button, Checkbox, message, Spin, Space } from "antd";
import loginImg from './login.png';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { sha256 } from 'js-sha256';
import { success, error } from "../../helpers/Notification";
import Cookie from 'js.cookie';
import { userActions } from "../../actions/UserActions";
import { getByDisplayValue } from '@testing-library/react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false
    };
  }
  isLoggedIn = () => {
    // window.loggedUsername should be defined by UI page / jelly script
    // if it's 'guest' that means there is no active user session
    if (window.loggedUsername==='guest') {
      return false;
    } else {
      return false; // set it to false for local development to prevent passing through
    }
  }

  handleSubmit = async (values) => {
    this.setState({
      isLoading: true
    })
    var passWordHash = sha256(values.password);
    values.password = passWordHash;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", values.userName),where("password", "==", passWordHash));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty){
      error("Invalid Credentials. Please try with correct credential");
      this.setState({
        isLoading: false
      })
      return
    }
    querySnapshot.forEach((doc) => {
      var data = doc.data();
        if(!data.isAdmin){
          error("Sorry! You don't have permission to login to app");
          this.setState({
            isLoading: false
          })
          return
        } else {
         
          userActions.fetchToken(values).then((response) => {
            if (response.status === 401) {
              Cookie.remove('accesstoken', { path: '/' })
              Cookie.remove('expiry', { path: '/' })
              Cookie.remove('role', { path: '/' })
              Cookie.remove('uid', { path: '/' })
              if (window.location.href.match(/\/login/)){
                  error('Invalid Credentials. Please try again.')
              }else{
                  window.location.href = '/login'
              }
            }
            Cookie.set("accesstoken", response.data["token"], {
              expires: 7,
              path: "/"
            });
            Cookie.set("expiry", response.headers["expiry"], {
              expires: 7,
              path: "/"
            });
            Cookie.set("uid", response.data["user_id"], { expires: 7, path: "/" });
            success("Logged In Successfully")
            this.setState({
              isLoading: false
            })
            this.props.history.push("/");
          });
        }

    });
  };

  // async componentDidMount() {
  //   const usersRef = collection(db, "users");
  //   const q = query(usersRef, where("Email", "==", "test@gmail.com"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }

  render() {
    if (this.isLoggedIn()) {
      window.location = window.mainAppPage;
    }
    return (
      <div>
      <div className={"lContainer"+(this.isLoggedIn() ? ' hidden' : ' ')}>
      <div className="lItem">
          <div className="loginImage">
            <img src={loginImg} width="300" style={{position: 'relative'}} alt="login"/>
            {this.state.isLoading ? <div style={{display: 'flex',alignItems: 'center',justifyContent:'center',zIndex:9999}}><Space size="middle">
            <Spin size="large" />
          </Space></div> : null}
          </div>
          <div className="loginForm">
            <h2>Login</h2>
              <Form onFinish={this.handleSubmit} className="login-form">
              <Form.Item name="userName" rules={[{ required: true, message: "Please enter your username" }]}>
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: "Please enter your Password" }]}>
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
      </div>
      <div className="footer">
        <a href="" target="_blank" rel="noopener noreferrer" className="footerLink">Powered by React</a>
      </div>
      </div>
      </div>
    );
  }
}


export default Login;