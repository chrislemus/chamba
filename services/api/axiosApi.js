import Cookies from 'js-cookie';
import axios from 'axios';
export const apiUrl = 'http://localhost:3005/api';

//=================
//custom axios api instance
//=================
export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || apiUrl,
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
    error.validationErrors = error?.response?.data?.validationErrors;
    // store.dispatch({
    //   type: 'ALERT_MODAL_DANGER',
    //   payload: error?.response?.status,
    // });
    // Do something with response error
    return Promise.reject(error);
  }
);
