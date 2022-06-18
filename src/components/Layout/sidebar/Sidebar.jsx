import React, {Component} from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import {userActions} from '../../../actions/UserActions';
import {
  UserOutlined,
  VideoCameraOutlined,
  WindowsOutlined,
  BookOutlined,
  PicLeftOutlined,
  AlignLeftOutlined,
  DropboxOutlined,
  AuditOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import '../css/layout.css';

const { SubMenu } = Menu;

export default class Sidebar extends Component {
  render () {
    return (
      <div>
        <div className="logo" />
        <Menu mode="inline" defaultSelectedKeys={[this.props.selectedKey]}>
          <Menu.Item key="home" icon={<UserOutlined />}>
            <Link to="/" style={{textDecoration: 'none'}}>
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="vacancy" icon={<AuditOutlined />}>
            <Link to="/vacancies" style={{textDecoration: 'none'}}>
              <span>Vacancy</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="scholarship" icon={<TrophyOutlined />}>
            <Link to="/scholarships" style={{textDecoration: 'none'}}>
              <span>Scholarship</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="book" icon={<BookOutlined />}>
            <Link to="/books" style={{textDecoration: 'none'}}>
              <span>Books</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="video" icon={<VideoCameraOutlined />}>
            <Link to="/videos" style={{textDecoration: 'none'}}>
              <span>Videos</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="slide" icon={<PicLeftOutlined />}>
            <Link to="/slides" style={{textDecoration: 'none'}}>
              <span>Slides</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="article" icon={<AlignLeftOutlined />}>
            <Link to="/articles" style={{textDecoration: 'none'}}>
              <span>Articles</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="material" icon={<DropboxOutlined />}>
            <Link to="/materials" style={{textDecoration: 'none'}}>
              <span>Materials</span>
            </Link>
          </Menu.Item>
          <SubMenu key="extra" icon={<WindowsOutlined />} title="Milan">
          <Menu.Item key="profile">Profile</Menu.Item>
          <Menu.Item key="logout" onClick={userActions.logout}>Logout</Menu.Item>
        </SubMenu>
        </Menu>
      </div>
    );
  }
}
