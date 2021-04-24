import axios from 'axios';
import { apiUrl, apiAuthHeader } from '../helpers/api';
import Cookies from 'js-cookie';

export const authUserToken = () => Cookies.get('authToken');

export const login = (user, authUserRedirect) => {
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
        let errors = error?.response?.data?.errors;
        if (!errors)
          errors = [
            'There were some issues login in, please try again at a later time',
          ];
        dispatch({ type: 'AUTH_USER_FAILURE', payload: { errors } });
      });
  };
};
export const signUp = (user, authUserRedirect) => {
  console.log('action triggered');
  return (dispatch) => {
    console.log('action return before request');
    dispatch({ type: 'AUTH_USER_REQUEST' });
    axios
      .post(apiUrl + '/users', { user })
      .then(({ data }) => {
        console.log('action success');
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
        console.log('action fail');
        let errors = error?.response?.data?.errors;
        if (!errors)
          errors = [
            'There were some issues login in, please try again at a later time',
          ];
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
