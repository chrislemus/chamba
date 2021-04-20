// import React, { useEffect, useState } from 'react';
import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AccountNavBar from '../components/NavBars/AccountNavBar';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

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
    // <Layout style={{ minHeight: '100vh' }}>
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      <ThemeProvider theme={theme}>
        {!!authenticatedUser ? <AccountNavBar /> : <DefaultNavbar />}
        {children}
      </ThemeProvider>
    </div>
    //{' '}
  );
}

const mapStateToProps = ({ account }) => {
  return { ...account };
};

export default connect(mapStateToProps)(MainLayout);
