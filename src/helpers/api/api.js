import Cookies from 'js-cookie';
import store from '../store';
import axios from 'axios';
import { useDispatch } from 'react-redux';
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
    // const dispatch = useDispatch();
    const unauthorizedUser = error?.response?.status === 401;
    error.validationErrors = error?.response?.data?.validationErrors || [];
    store.dispatch({
      type: 'ALERT_MODAL_DANGER',
      payload: error?.response?.status,
    });
    if (unauthorizedUser) requireLogin();
    // Do something with response error
    return Promise.reject(error);
  }
);
