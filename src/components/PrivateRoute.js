import { Route, Redirect } from 'react-router';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { getUserData } from '../services/api';
import DataFetchWrapper from './DataFetchWrapper';
import { addUser } from '../actions/userActions';

export default function PrivateRoute({ component: Component, ...rest }) {
  const authUserToken = Cookies.get('authToken');
  const user = useSelector((state) => state.user);
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

  return (
    <Route
      {...rest}
      render={(props) =>
        authUserToken ? (
          <DataFetchWrapper status={status} dataName="User" hasData={user?.id}>
            <Component {...rest} {...props} />
          </DataFetchWrapper>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}
