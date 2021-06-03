import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import AppNavBar from '../components/NavBars/AppNavBar';
import AlertModal from '../components/AlertModal';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppDrawer from '../components/NavBars/AppDrawer';
import Cookies from 'js-cookie';
import { getUserData } from '../services/api';
import { addUser } from '../actions/userActions';

import { useMutation } from 'react-query';
export default function MainLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const authUserToken = Cookies.get('authToken');
  const dispatch = useDispatch();

  const { mutate: fetchUserData, status } = useMutation(getUserData, {
    onError: (error) => {
      if (error?.response?.status === 401) Cookies.remove('authToken');
    },
    onSuccess: (data) => dispatch(addUser(data.user)),
  });

  useEffect(() => {
    if (!user?.id && authUserToken) fetchUserData();
  }, [authUserToken, user]);
  const state = useSelector((state) => state);
  const authUser = user?.id;
  console.log(state);
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
