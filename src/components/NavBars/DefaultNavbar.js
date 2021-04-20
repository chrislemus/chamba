import { Menu } from 'antd';
import { Link } from 'react-router-dom';

// const { SubMenu } = Menu;
export default function DefaultNavbar(props) {
  // console.log(props);
  return (
    <nav className="main-navbar">
      <p className="navbar-logo">Service Field CRM</p>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/login">Log In</Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}
