import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme();
const palette = {
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
};
theme.palette = { ...theme.palette, ...palette };
theme.custom = {
  appNav: {
    drawerWidth: 240,
  },
  infoBoxesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  infoBox: {
    background: '#fff',
    boxShadow: theme.shadows[2],
    borderRadius: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    width: '48%',
    marginBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      width: '98%',
    },
    height: 'min-content',
    '& div[aria-label=info-box-header]': {
      padding: '1rem',
      '& h6:first-child': {
        ...theme.typography.h6,
        fontWeight: 700,
        margin: 0,
      },
    },
  },
  appPageHeader: {
    display: 'flex',
    marginBottom: '3rem',
    '& div:first-child': {
      flexGrow: 1,
      '& div[aria-label=app-page-header-title]': {
        '& h1': {
          ...theme.typography.h4,
          fontWeight: 700,
          margin: 0,
        },
      },
    },
  },
};

export default theme;
