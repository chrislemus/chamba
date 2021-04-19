import React, { useEffect, useState } from 'react';
import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AccountNavBar from '../components/NavBars/AccountNavBar';
import SidePanel from '../components/SidePanel';
import { Layout } from 'antd';
import { connect } from 'react-redux';
const { Footer, Content } = Layout;

function MainLayout({ authenticatedUser, children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!!authenticatedUser ? <AccountNavBar /> : <DefaultNavbar />}
      <Layout className="site-layout">
        {!!authenticatedUser && <SidePanel />}
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>{children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = ({ account }) => {
  return { ...account };
};

export default connect(mapStateToProps)(MainLayout);
