import React, { useEffect, useState } from 'react';
import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AccountNavBar from '../components/NavBars/AccountNavBar';
import SidePanel from '../components/SidePanel';
import { Layout } from 'antd';
import { connect } from 'react-redux';
const { Footer, Content } = Layout;

function MainLayout(props) {
  console.log(props.account);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(props.account.username.length > 0);
  }, [props.account.username]);

  const NavBar = loggedIn ? <AccountNavBar /> : <DefaultNavbar />;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {NavBar}
      <Layout className="site-layout">
        {loggedIn && <SidePanel />}
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>{props.children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(MainLayout);
