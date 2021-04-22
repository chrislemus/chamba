import Cookies from 'js-cookie';
export const apiAuthHeader = () => {
  const authToken = Cookies.get('authToken');
  if (authToken) {
    return { Authorization: `Bearer ${JSON.parse(authToken)}` };
  } else {
    return {};
  }
};

export const apiUrl = 'http://localhost:3005/api';
