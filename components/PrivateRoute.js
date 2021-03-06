import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { getUserData } from '../services/api';
import { addUser, userLogout } from '../actions/userActions';

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const authUserToken = Cookies.get('authToken');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { mutate: fetchUserData, status } = useMutation(getUserData, {
    onError: (error) => {
      dispatch(userLogout());
      router.push('/login');
    },
    onSuccess: (data) => dispatch(addUser(data.user)),
  });

  useEffect(() => {
    if (!user?.id && authUserToken) fetchUserData();
  }, [authUserToken, user]);

  useEffect(() => {
    if (router && !authUserToken && router.pathname.startsWith('/dashboard')) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
}
