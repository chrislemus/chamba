import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faFileAlt,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

export default function AppDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  const closeDrawer = () => setIsDrawerOpen(false);
  const handleClick = (e) => e.target === e.currentTarget && closeDrawer();

  return (
    <div
      className={`drawer-wrapper ${isDrawerOpen ? 'is-open' : ''}`}
      onClick={handleClick}
    >
      <div className="drawer">
        <aside className="menu p-3 ">
          <p className="menu-label">General</p>

          <ul className="menu-list">
            <li>
              <Link
                href="/dashboard"
                className="has-text-grey"
                onClick={closeDrawer}
              >
                <span className="icon-text has-text-grey	">
                  <span className="icon">
                    <FontAwesomeIcon icon={faChartLine} />
                  </span>
                  <span>Dashboard</span>
                </span>
              </Link>
            </li>
          </ul>
          <p className="menu-label">Management</p>
          <ul className="menu-list">
            <li>
              <Link href="/dashboard/customers" onClick={closeDrawer}>
                <span className="icon-text has-text-grey	">
                  <span className="icon">
                    <FontAwesomeIcon icon={faUserFriends} />
                  </span>
                  <span>Customers</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/invoices" onClick={closeDrawer}>
                <span className="icon-text has-text-grey	">
                  <span className="icon">
                    <FontAwesomeIcon icon={faFileAlt} />
                  </span>
                  <span>Invoices</span>
                </span>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
