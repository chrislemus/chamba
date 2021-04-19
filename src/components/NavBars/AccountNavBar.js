import { Layout, Menu, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// const { SubMenu } = Menu;
function AccountNavbar(props) {
  const onLogout = () => {
    props.dispatch({ type: 'LOGOUT' });
  };
  return (
    <nav className="main-navbar">
      <p className="navbar-logo">Service Field CRM</p>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" onClick={onLogout}>
          Log Out
        </Menu.Item>
      </Menu>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return { ...state };
};
export default connect(mapStateToProps)(AccountNavbar);
