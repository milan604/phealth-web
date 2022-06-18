import React, {Component} from 'react';
import {Layout} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import '../css/layout.css';

import Sidebar from '../sidebar/Sidebar';

const {Header, Sider, Content, Footer} = Layout;

export default class CustomLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState ({
      collapsed: !this.state.collapsed,
    });
  };

  render () {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{padding: '24px 0', background: '#fcfcfc'}}
        >

          <Sidebar selectedKey={this.props.sidebarSelectedKey} />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{background: '#fff', padding: 0}}
          >
            {React.createElement (
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              background: '#fff',
              minHeight: '50em',
              padding: 24,
            }}
          >
            {this.props.children}
          </Content>
          <Footer style={{textAlign: 'center'}}>
           M-LAN ©2021 Created by Er. Milan Adhikari
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
