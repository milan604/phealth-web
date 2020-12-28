import React, {Component} from 'react';
import {Menu} from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import "../css/layout.css";

export default class Sidebar extends Component {
  render () {
    return (
      <div>
        <div className="logo" />
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
