import AppDrawer from './AppDrawer';
import DefaultNavbar from './DefaultNavbar';
import AppNavBar from './AppNavBar';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function Navbar() {
  const user = useSelector((state) => state.user);

  if (authUser) {
    return (
      <>
        <AppDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <AppNavBar setIsDrawerOpen={setIsDrawerOpen} user={user} />
      </>
    );
  } else {
    return <DefaultNavbar />;
  }
}
