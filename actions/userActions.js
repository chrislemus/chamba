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

const signUp = (user) => {
  return (dispatch) => {
    axiosApi
      .post('/users', { user })
      .then(({ data }) => {
        const user = data?.user;
        const token = data?.token;
        dispatch({ type: 'USER_ADD_USER', payload: user });
        const cookieOptions = {
          secure: true,
        };
        Cookies.set('authToken', JSON.stringify(token), cookieOptions);

        history.push('/dashboard');
      })
      .catch(({ validationErrors }) => {
        dispatch({
          type: 'ALERT_MODAL_DANGER',
          payload: validationErrors && validationErrors.join(', '),
        });
      });
  };
};
export { addUser, userLogout, signUp };
