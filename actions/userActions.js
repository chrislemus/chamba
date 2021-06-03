import Cookies from 'js-cookie';

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
