// import { axiosApi } from '../helpers/api';
// import Cookies from 'js-cookie';

// export const login = (user, authUserRedirect) => {
//   return (dispatch) => {
//     dispatch({ type: 'AUTH_USER_REQUEST' });
//     axiosApi
//       .post('/login', { user })
//       .then(({ data }) => {
//         dispatch({
//           type: 'AUTH_USER_SUCCESS',
//           token: JSON.stringify(data.token),
//         });
//         dispatch({ type: 'USER_ADD_USER', payload: data.user });
//         const cookieOptions = {
//           expires: 1,
//           secure: true,
//         };
//         Cookies.set('authToken', JSON.stringify(data.token), cookieOptions);

//         authUserRedirect();
//       })
//       .catch(({ validationErrors }) => {
//         // const errors = apiFetchErrors(error);
//         dispatch({
//           type: 'AUTH_USER_FAILURE',
//           payload: validationErrors,
//         });
//       });
//   };
// };

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

// export const logout = () => {
//   return (dispatch) => {
//     Cookies.remove('authToken');
//     dispatch({ type: 'USER_LOGOUT' });
//   };
// };
