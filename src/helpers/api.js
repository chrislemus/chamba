import Cookies from 'js-cookie';
import { version } from 'react-dom';
import store from '../store';

export const apiAuthHeader = () => {
  const authToken = Cookies.get('authToken');
  if (authToken) {
    return { Authorization: `Bearer ${JSON.parse(authToken)}` };
  } else {
    return {};
  }
};

export const apiFetchErrors = (error) => {
  const defaultFaultFetchError = [
    "We've encountered some issues,  please try again at a later time",
  ];
  const errors = error?.response?.data?.errors || defaultFaultFetchError;

  const loginRequired = 'Please log in';
  if (errors.includes(loginRequired)) {
    Cookies.remove('authToken');
    store.dispatch({ type: 'USER_LOGOUT' });
    console.log(store);
    // store.state.history.push('/login');
  }
  return errors;
};

export const apiUrl = 'http://localhost:3005/api';
