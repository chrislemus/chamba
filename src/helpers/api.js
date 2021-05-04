import Cookies from 'js-cookie';
import store from '../store';
import axios from 'axios';
export const apiUrl = 'http://localhost:3005/api';

const requireLogin = () => {
  Cookies.remove('authToken');
  store.dispatch({ type: 'USER_LOGOUT' });
  store.state.history.push('/login');
};

//=================
//custom axios api instance
//=================
export const axiosApi = axios.create({
  baseURL: apiUrl,
});

//auth Header

axiosApi.interceptors.request.use(function (config) {
  const authToken = Cookies.get('authToken');
  if (authToken) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(authToken)}`;
  }
  return config;
});

// Add a response interceptor
axiosApi.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    const unauthorizedUser = error?.response?.status === 401;
    error.errorMessages = error?.response?.data?.errors || [];
    if (unauthorizedUser) requireLogin();
    // Do something with response error
    return Promise.reject(error);
  }
);
