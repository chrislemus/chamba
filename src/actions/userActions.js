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
// export const signUp = (user, authUserRedirect) => {
//   return (dispatch) => {
//     dispatch({ type: 'AUTH_USER_REQUEST' });
//     axiosApi
//       .post('/users', { user })
//       .then(({ data }) => {
//         const user = data?.user;
//         const token = data?.token;
//         if (!user || !token) throw new Error('failed auth');
//         dispatch({ type: 'AUTH_USER_SUCCESS' });
//         dispatch({ type: 'USER_ADD_USER', payload: user });
//         const cookieOptions = {
//           secure: true,
//         };
//         Cookies.set('authToken', JSON.stringify(token), cookieOptions);

//         authUserRedirect();
//       })
//       .catch(({ validationErrors }) => {
//         dispatch({
//           type: 'AUTH_USER_FAILURE',
//           payload: validationErrors,
//         });
//       });
//   };
// };
// export const getUserData = () => {
//   return (dispatch) => {
//     axiosApi
//       .get('/profile')
//       .then(({ data }) => {
//         dispatch({ type: 'AUTH_USER_SUCCESS' });
//         dispatch({ type: 'USER_ADD_USER', payload: data.user });
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch({ type: 'AUTH_USER_FAILURE' });
//       });
//   };
// };
