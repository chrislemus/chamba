import { useState, useEffect } from 'react';
import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AccountNavBar from '../components/NavBars/AccountNavBar';
import { Container } from '@material-ui/core';
import Alert from '../components/Alert';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { indigo } from '@material-ui/core/colors';
import { authUserToken } from '../actions/userActions';
import { connect } from 'react-redux';
// const theme = createMuiTheme({
//   palette: {
//     primary: indigo,
//     secondary: indigo,
//     primaryBackground: '#fff',
//   },
// });

function MainLayout(props) {
  const navigationBar = !!authUserToken() ? (
    <AccountNavBar />
  ) : (
    <DefaultNavbar />
  );
  return (
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      {/* <ThemeProvider theme={theme}> */}
      <Alert />
      {navigationBar}

      <div className="container">{props.children}</div>
      {/* </ThemeProvider> */}
    </div>
    //{' '}
  );
}

export default connect((state) => ({ user: state.user }))(MainLayout);
