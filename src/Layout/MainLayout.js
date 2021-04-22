import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AccountNavBar from '../components/NavBars/AccountNavBar';
import { Container } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { indigo } from '@material-ui/core/colors';
import Cookies from 'js-cookie';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: indigo,
    primaryBackground: '#fff',
  },
});

export default function MainLayout(props) {
  const authUser = !!Cookies.get('authToken');
  const navigationBar = authUser ? <AccountNavBar /> : <DefaultNavbar />;
  return (
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      <ThemeProvider theme={theme}>
        {navigationBar}
        <Container>{props.children}</Container>
      </ThemeProvider>
    </div>
    //{' '}
  );
}
