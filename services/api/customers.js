import { axiosApi } from './axiosApi';

const fetchCustomers = async (query, pageLimit, page) => {
  const res = await axiosApi.get(
    `/customers?query=${query}&limit=${pageLimit}&page=${page}`
  );
  return res.data;
};

const addNewCustomer = async (customer) => {
  const res = await axiosApi.post('/customers', { customer });
  return res?.data;
};

const editCustomer = async (customerId, customer) => {
  const res = await axiosApi.patch(`/customers/${customerId}`, { customer });
  return res?.data;
};

const fetchCustomerById = async (customerId) => {
  const res = await axiosApi.get(`/customers/${customerId}`);
  return res.data;
};

const deleteCustomer = async (customerId) => {
  const res = await axiosApi.delete(`/customers/${customerId}`);
  return res?.data;
};

export {
  fetchCustomers,
  fetchCustomerById,
  addNewCustomer,
  editCustomer,
  deleteCustomer,
};
