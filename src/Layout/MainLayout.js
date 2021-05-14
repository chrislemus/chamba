import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AppNavBar from '../components/NavBars/AppNavBar';
import AlertModal from '../components/AlertModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AppDrawer from '../components/NavBars/AppDrawer';

export default function MainLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const authUser = user?.id;
  const navigationBar = authUser ? (
    <AppNavBar setIsDrawerOpen={setIsDrawerOpen} user={user} />
  ) : (
    <DefaultNavbar />
  );
  return (
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      <AlertModal />
      {navigationBar}
      <div className="columns">
        {authUser && (
          <div className="column is-narrow p-0">
            <AppDrawer
              user={user}
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </div>
        )}
        <div className="column px-5 py-6">{children}</div>
      </div>
    </div>
  );
}
