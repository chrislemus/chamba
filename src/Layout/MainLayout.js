// import React, { useEffect, useState } from 'react';
import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AccountNavBar from '../components/NavBars/AccountNavBar';
import SidePanel from '../components/SidePanel';
import { Layout } from 'antd';
import { connect } from 'react-redux';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { indigo } from '@material-ui/core/colors';
const { Footer, Content } = Layout;
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: indigo,
    primaryBackground: '#fff',
  },
});

function MainLayout({ authenticatedUser, children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ThemeProvider theme={theme}>
        {!!authenticatedUser ? <AccountNavBar /> : <DefaultNavbar />}
        <Layout className="site-layout">
          {!!authenticatedUser && <SidePanel />}
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>{children}</Content>
            <Footer style={{ textAlign: 'center' }}>
              Service Field CRM ©2021 Created by Chris Lemus
            </Footer>
          </Layout>
        </Layout>
      </ThemeProvider>
    </Layout>
  );
}

const mapStateToProps = ({ account }) => {
  return { ...account };
};

export default connect(mapStateToProps)(MainLayout);
