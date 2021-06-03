import Link from 'next/link';

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
                    <i className="fas fa-chart-line"></i>
                  </span>
                  <span>Overview</span>
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
                    <i className="fas fa-user-friends"></i>
                  </span>
                  <span>Customers</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/invoices" onClick={closeDrawer}>
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
      </div>
    </div>
  );
}
