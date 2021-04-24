import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});
export default function AppDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  const classes = useStyles();
  return (
    <Drawer
      anchor={'left'}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <aside class="menu p-3 ">
        <p class="menu-label">General</p>

        <ul class="menu-list">
          <li>
            <Link to="/overview" className="has-text-grey">
              Overview
            </Link>
          </li>
        </ul>
        <p class="menu-label">Management</p>
        <ul class="menu-list">
          <li>
            <Link to="/clients">
              <span class="icon-text has-text-grey	">
                <span class="icon">
                  <i class="fas fa-user-friends"></i>
                </span>
                <span>Clients</span>
              </span>
            </Link>
          </li>
          <li>
            <a>
              <span class="icon-text has-text-grey">
                <span class="icon">
                  <i class="fas fa-file-alt"></i>
                </span>
                <span>Invoices</span>
                <span class="icon">
                  <i class="fas fa-angle-down"></i>
                </span>
              </span>
            </a>
            <ul>
              <li>
                <a className="has-text-grey">Pending</a>
              </li>
              <li>
                <a className="has-text-grey">Paid</a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </Drawer>
  );
}
