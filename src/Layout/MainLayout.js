// import { useState, useEffect } from 'react';
import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AccountNavBar from '../components/NavBars/AccountNavBar';
// import { Container } from '@material-ui/core';
import Alert from '../components/Alert';
// import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
// import { indigo } from '@material-ui/core/colors';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
// const theme = createMuiTheme({
//   palette: {
//     primary: indigo,
//     secondary: indigo,
//     primaryBackground: '#fff',
//   },
// });

function MainLayout(props) {
  const authUserToken = Cookies.get('authToken');
  const navigationBar = !!authUserToken ? <AccountNavBar /> : <DefaultNavbar />;
  return (
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      {/* <ThemeProvider theme={theme}> */}
      <Alert />
      {navigationBar}

      <div className="container px-3">{props.children}</div>
      {/* </ThemeProvider> */}
    </div>
    //{' '}
  );
}

export default connect((state) => ({ user: state.user }))(MainLayout);
