import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <p className="navbar-logo">Service Field CRM</p>
        </Link>

        <a
          role="button"
          className={`navbar-burger ${menuIsOpen && 'is-active'}`}
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${menuIsOpen && 'is-active'}`}>
        <div class="navbar-start ">
          <Link to="/" class="navbar-item ">
            Home
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/signup" className="button is-primary">
                <strong>Sign up</strong>
              </Link>
              <Link to="/login" className="button is-light">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
// return (
//   <div className={classes.root}>
//     <AppBar
//       position="static"
//       bgcolor="background.paper"
//       className={classes.AppBar}
//     >
//       <Toolbar>
//         <Typography variant="h6" className={classes.title} color="primary">
//           Service Field CRM
//         </Typography>
//         <Button color="primary">
//           <Link to="/">Home</Link>
//         </Button>
//         <Button color="primary">
//           <Link to="/login">Log In</Link>
//         </Button>
//       </Toolbar>
//     </AppBar>
//   </div>
// );

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
