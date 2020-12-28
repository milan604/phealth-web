import React, {useState} from 'react';
import '../../App.css';
import './css/Home.css';
import {CustomButton} from '../Button/Button';
import {Drawer, Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

const Home = () => {
  const [drawerVisible, setDrawerVisible] = useState (false);
  const [loginVisible, setLoginVisible] = useState (false);
  const [registerVisible, setRegisterVisible] = useState (false);

  const onClose = () => {
    setDrawerVisible (false);
    setLoginVisible (false);
    setRegisterVisible (false);
  };

  const onClickLogin = () => {
    setDrawerVisible (true);
    setLoginVisible (true);
  };

  const onClickRegister = () => {
    setDrawerVisible (true);
    setRegisterVisible (true);
  };

  const onFinish = values => {
    console.log ('Received values of form: ', values);
  };

  return (
    <div className="hero-container">
      <video src="/videos/video-2.mp4" autoPlay loop muted />
      <h1>Public Health</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        {/* <Link to='/login'> */}
        <CustomButton
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={() => onClickLogin ()}
        >
          SIGN IN
        </CustomButton>
        {/* </Link> */}
        <Link to="/register">
          <CustomButton
            className="btns"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
            onClick={console.log ('hey')}
          >
            SIGN UP <i className="far fa-play-circle" />
          </CustomButton>
        </Link>
      </div>
      <Drawer
        title=""
        width='40em'
        onClose={() => onClose ()}
        visible={drawerVisible}
        bodyStyle={{
          paddingBottom: 80,
          backgroundColor: 'green',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        style={{backgroundColor: 'purple', opacity: 0.8}}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
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

      </Drawer>
    </div>
  );
};

export default Home;
