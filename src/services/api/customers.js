import { axiosApi } from './axiosApi';
// export const fetchCustomers = (key, query, pageLimit, page) => {
//   console.log(key, query, pageLimit, page);
//   return axiosApi.get(
//     `/customers?query=${query}&limit=${pageLimit}&page=${page}`
//   );
// };
export const fetchCustomers = async (query, pageLimit, page) => {
  return axiosApi.get(
    `/customers?query=${query}&limit=${pageLimit}&page=${page}`
  );
};
