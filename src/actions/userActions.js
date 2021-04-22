const axios = require('axios');

export const login = (user) => {
  return (dispatch) => {
    dispatch({ type: 'AUTH_USER_REQUEST' });
    axios
      .post('http://localhost:3005/api/login', { user })
      .then(({ data }) => {
        const { user } = data;
        user.token = data.token;
        dispatch({ type: 'AUTH_USER_SUCCESS' });
        dispatch({ type: 'USER_ADD_USER', payload: { user } });
      })
      .catch((error) => {
        console.log(error);
        const errors = error?.response?.data?.errors;
        if (errors)
          dispatch({ type: 'AUTH_USER_FAILURE', payload: { errors } });
      });
  };
  // return { type: 'LOGIN', accountInfo };
};
export const logout = () => {
  return (dispatch) => dispatch({ type: 'LOGOUT' });
};
