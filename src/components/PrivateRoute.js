import { getUserData } from '../actions/userActions';
import { Route, Redirect } from 'react-router';
import Cookies from 'js-cookie';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../store';

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const authUserToken = Cookies.get('authToken');
  const noUserData = Object.keys(user).length === 0;
  if (noUserData) {
    dispatch(getUserData());
  }

  useLayoutEffect(() => {
    const unlistenHistory = history.listen((location, action) => {
      const { pathname } = location;
      console.log(action);
      if (pathname.startsWith('/customers')) {
        dispatch({ type: 'CUSTOMER_RESET_STORE' });
        dispatch({ type: 'CUSTOMER_LIST_RESET_STORE' });
      }
    });
    return () => {
      unlistenHistory();
    };
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        authUserToken ? (
          <Component {...rest} {...props} />
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
