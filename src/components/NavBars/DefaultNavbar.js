import { Layout, Menu, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/index';

// const { SubMenu } = Menu;
export default function DefaultNavbar(props) {
  console.log(props);
  return (
    <nav className="main-navbar">
      <p className="navbar-logo">Service Field CRM</p>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/overview">Overview</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/login">Log in</Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}
