import axios from 'axios';
import { apiUrl, apiAuthHeader } from '../helpers/api';
import Cookies from 'js-cookie';
import { apiFetchErrors } from '../helpers/api';

//Shared variables
export const authUserToken = () => Cookies.get('authToken');
//Shared functions

export const login = (user, authUserRedirect) => {
  return (dispatch) => {
    dispatch({ type: 'AUTH_USER_REQUEST' });
    axios
      .post(apiUrl + '/login', { user })
      .then(({ data }) => {
        dispatch({
          type: 'AUTH_USER_SUCCESS',
          token: JSON.stringify(data.token),
        });
        dispatch({ type: 'USER_ADD_USER', payload: data.user });
        const cookieOptions = {
          expires: 1,
          secure: true,
        };
        Cookies.set('authToken', JSON.stringify(data.token), cookieOptions);

        authUserRedirect();
      })
      .catch((error) => {
        const errors = apiFetchErrors(error);
        dispatch({ type: 'AUTH_USER_FAILURE', payload: { errors } });
      });
  };
};
export const signUp = (user, authUserRedirect) => {
  return (dispatch) => {
    dispatch({ type: 'AUTH_USER_REQUEST' });
    axios
      .post(apiUrl + '/users', { user })
      .then(({ data }) => {
        const user = data?.user;
        const token = data?.token;
        if (!user || !token) throw 'failed auth';
        dispatch({ type: 'AUTH_USER_SUCCESS' });
        dispatch({ type: 'USER_ADD_USER', payload: user });
        const cookieOptions = {
          secure: true,
        };
        Cookies.set('authToken', JSON.stringify(token), cookieOptions);

        authUserRedirect();
      })
      .catch((error) => {
        const errors = apiFetchErrors(error);
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
        dispatch({ type: 'USER_ADD_USER', payload: data.user });
      })
      .catch((error) => {
        const errors = apiFetchErrors(error);
        dispatch({ type: 'AUTH_USER_FAILURE', payload: { errors } });
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    Cookies.remove('authToken');
    dispatch({ type: 'USER_LOGOUT' });
  };
};
