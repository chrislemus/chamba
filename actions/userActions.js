import Cookies from 'js-cookie';
import { axiosApi } from '../services/api';
import { history } from '../store';

const addUser = (user) => {
  return { type: 'USER_ADD_USER', payload: user };
};

const userLogout = () => {
  return (dispatch) => {
    Cookies.remove('authToken');
    dispatch({ type: 'USER_LOGOUT' });
  };
};

export { addUser, userLogout };
