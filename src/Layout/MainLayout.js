import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AppNavBar from '../components/NavBars/AppNavBar';
import AlertModal from '../components/AlertModal';
import Cookies from 'js-cookie';

export default function MainLayout({ children }) {
  const authUserToken = Cookies.get('authToken');
  const navigationBar = !!authUserToken ? <AppNavBar /> : <DefaultNavbar />;
  return (
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      <AlertModal />
      {navigationBar}
      <div className="container px-3">{children}</div>
    </div>
  );
}
