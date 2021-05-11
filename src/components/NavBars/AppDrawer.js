import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';

export default function AppDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  return (
    <Drawer
      anchor={'left'}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
    >
      <aside className="menu p-3 ">
        <p className="menu-label">General</p>

        <ul className="menu-list">
          <li>
            <Link to="/overview" className="has-text-grey">
              Overview
            </Link>
          </li>
        </ul>
        <p className="menu-label">Management</p>
        <ul className="menu-list">
          <li>
            <Link to="/customers">
              <span className="icon-text has-text-grey	">
                <span className="icon">
                  <i className="fas fa-user-friends"></i>
                </span>
                <span>Customers</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/invoices">
              <span className="icon-text has-text-grey	">
                <span className="icon">
                  <i className="fas fa-file-alt"></i>
                </span>
                <span>Invoices</span>
              </span>
            </Link>
          </li>
        </ul>
      </aside>
    </Drawer>
  );
}
