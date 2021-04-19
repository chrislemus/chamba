import { Layout, Menu, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/index';

// const { SubMenu } = Menu;
export default function AccountNavbar(props) {
  console.log(props);
  return (
    <nav className="main-navbar">
      <p className="navbar-logo">Service Field CRM</p>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Log Out</Menu.Item>
      </Menu>
    </nav>
  );
}
