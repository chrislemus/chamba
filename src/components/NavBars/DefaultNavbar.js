import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  AppBar: {
    background: '#fff',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        bgcolor="background.paper"
        className={classes.AppBar}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="primary">
            Service Field CRM
          </Typography>
          <Button color="primary">
            <Link to="/">Home</Link>
          </Button>
          <Button color="primary">
            <Link to="/login">Log In</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// import { Menu } from 'antd';
// import { Link } from 'react-router-dom';

// // const { SubMenu } = Menu;
// export default function DefaultNavbar(props) {
//   // console.log(props);
//   return (
//     <nav className="main-navbar">
//       <p className="navbar-logo">Service Field CRM</p>
//       <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
//         <Menu.Item key="1">
//           <Link to="/">Home</Link>
//         </Menu.Item>
//         <Menu.Item key="2">
//           <Link to="/login">Log In</Link>
//         </Menu.Item>
//       </Menu>
//     </nav>
//   );
// }
