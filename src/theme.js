import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    success: {
      lighter: green[50],
      light: green[300],
      main: green[500],
      dark: green[700],
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      lighter: red[50],
      light: red[300],
      main: red[500],
      dark: red[700],
      contrastText: '#fff',
    },
  },
  custom: {
    appNav: {
      drawerWidth: 240,
    },
  },
});
export default theme;
