import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AppNavBar from '../components/NavBars/AppNavBar';
import AlertModal from '../components/AlertModal';
import { useSelector } from 'react-redux';

export default function MainLayout({ children }) {
  const user = useSelector((state) => state.user);
  const navigationBar = user?.id ? <AppNavBar /> : <DefaultNavbar />;
  return (
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      <AlertModal />
      {navigationBar}
      <div className="container px-3 pb-6">{children}</div>
    </div>
  );
}
