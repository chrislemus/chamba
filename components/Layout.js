import AppNavigation from '../components/appNavigation';
import AlertModal from './AlertModal';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/router';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    width: '100vw',
    minHeight: '100vh',
    background: 'rgb(248, 248, 248)',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -theme.custom.appNav.drawerWidth,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
}));

export default function MainLayout({ children }) {
  const classes = useStyles();
  const router = useRouter();

  if (router.pathname.startsWith('/dashboard')) {
    return (
      <>
        <AlertModal />
        <div className={classes.root}>
          <CssBaseline />
          <AppNavigation />
          <main className={clsx(classes.content, classes.contentShift)}>
            <Toolbar />
            {children}
          </main>
        </div>
      </>
    );
  } else {
    return children;
  }
}
