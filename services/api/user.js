import { axiosApi } from './axiosApi';

const authUser = async (user) => {
  const res = await axiosApi.post('/login', { user });
  return res.data;
};
const getUserData = async () => {
  const res = await axiosApi.get('/profile');
  return res.data;
};

const userSignUp = async (user) => {
  const res = await axiosApi.post('/users', { user });
  return res.data;
};

export { authUser, getUserData, userSignUp };
