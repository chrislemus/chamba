import axios from 'axios';
import { apiUrl, apiAuthHeader } from '../helpers/api';
import Cookies from 'js-cookie';

export const authUserToken = () => Cookies.get('authToken');

export const login = (user, authUserRedirect) => {
  console.log(authUserRedirect);
  return (dispatch) => {
    dispatch({ type: 'AUTH_USER_REQUEST' });
    axios
      .post(apiUrl + '/login', { user })
      .then(({ data }) => {
        dispatch({ type: 'AUTH_USER_SUCCESS' });
        dispatch({ type: 'USER_ADD_USER', payload: { user: data.user } });
        const cookieOptions = {
          expires: 1,
          secure: true,
        };
        Cookies.set('authToken', JSON.stringify(data.token), cookieOptions);

        authUserRedirect();
      })
      .catch((error) => {
        console.log(error);
        const errors = error?.response?.data?.errors;
        if (errors)
          dispatch({ type: 'AUTH_USER_FAILURE', payload: { errors } });
      });
  };
};
export const getUserData = () => {
  return (dispatch) => {
    const header = apiAuthHeader();

    axios
      .get(apiUrl + '/profile', { headers: { ...header } })
      .then(({ data }) => {
        dispatch({ type: 'AUTH_USER_SUCCESS' });
        dispatch({ type: 'USER_ADD_USER', payload: { user: data.user } });
      })
      .catch((error) => {
        console.log(error);
        const errors = error?.response?.data?.errors;
        if (errors) {
          const message = errors.join(', ');
          dispatch({ type: 'ALERT_DANGER', payload: { message } });
        }
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    console.log('logout triggered!');
    Cookies.remove('authToken');
    dispatch({ type: 'USER_LOGOUT' });
  };
};
