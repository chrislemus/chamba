import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faFileAlt,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    [theme.breakpoints.up('md')]: {
      width: theme.custom.appNav.drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const baseUrl = '/dashboard';
const drawerMenuItems = [
  {
    name: 'Dashboard',
    link: baseUrl,
    icon: faChartLine,
  },
  {
    name: 'Customers',
    link: `${baseUrl}/customers`,
    icon: faUserFriends,
  },
  {
    name: 'Invoices',
    link: `${baseUrl}/invoices`,
    icon: faFileAlt,
  },
];

export default function AppDrawer({ drawerIsActive, setDrawerIsActive }) {
  const classes = useStyles();
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const updateWindowSize = () => setIsMediumScreen(window.innerWidth < 960);

  useEffect(() => {
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isMediumScreen ? drawerIsActive : true}
      classes={{ paper: classes.drawerPaper }}
    >
      <Toolbar />
      <List>
        {drawerMenuItems.map((item) => (
          <Link href={item.link} key={item.name} passHref={true}>
            <ListItem button onClick={() => setDrawerIsActive(false)}>
              <ListItemIcon>
                <FontAwesomeIcon icon={item.icon} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
