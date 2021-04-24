import axios from 'axios';
import { apiUrl, apiAuthHeader } from '../helpers/api';
import Cookies from 'js-cookie';
import { apiFetchErrors } from '../helpers/api';

//Shared variables
export const authUserToken = () => Cookies.get('authToken');
//Shared functions

// converts object keys from camelCase to snake_case
// API will soon accept camelCase, Rails API will be substituted using JS
function toSnakeCase(o) {
  var newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toSnakeCase(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = origKey.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`
        );
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toSnakeCase(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

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
        dispatch({ type: 'USER_ADD_USER', payload: { user: data.user } });
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
  console.log('action triggered');
  return (dispatch) => {
    dispatch({ type: 'AUTH_USER_REQUEST' });
    axios
      .post(apiUrl + '/users', { user: toSnakeCase(user) })
      .then(({ data }) => {
        console.log('action success');
        dispatch({ type: 'AUTH_USER_SUCCESS' });
        dispatch({ type: 'USER_ADD_USER', payload: { user: data.user } });
        const cookieOptions = {
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
