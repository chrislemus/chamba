import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
export default function NavBar() {
  return (
    <nav className="main-navbar">
      <p className="navbar-logo">Service Field CRM</p>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/">Overview</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/">SignIn</Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}
