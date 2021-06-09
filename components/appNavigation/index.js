import { useState } from 'react';
import AppDrawer from './AppDrawer';
import AppNavBar from './AppNavBar';

export default function AppNavigation() {
  const [drawerIsActive, setDrawerIsActive] = useState(false);
  return (
    <>
      <AppNavBar
        drawerIsActive={drawerIsActive}
        setDrawerIsActive={setDrawerIsActive}
      />
      <AppDrawer
        drawerIsActive={drawerIsActive}
        setDrawerIsActive={setDrawerIsActive}
      />
    </>
  );
}
