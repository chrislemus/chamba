// import React, { useEffect, useState } from 'react';
import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AccountNavBar from '../components/NavBars/AccountNavBar';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { indigo } from '@material-ui/core/colors';
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: indigo,
    primaryBackground: '#fff',
  },
});

function MainLayout({ authenticatedUser, children }) {
  return (
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      <ThemeProvider theme={theme}>
        {!!authenticatedUser ? <AccountNavBar /> : <DefaultNavbar />}
        <Container>{children}</Container>
      </ThemeProvider>
    </div>
    //{' '}
  );
}

const mapStateToProps = ({ account }) => {
  return { ...account };
};

export default connect(mapStateToProps)(MainLayout);
