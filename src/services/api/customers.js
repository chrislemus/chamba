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
  // .then(({ data }) => {
  //   const customer = data?.customer;
  //   dispatch({ type: 'CUSTOMER_FETCH_BY_ID_SUCCESS', payload: customer });
  // })
  // .catch(({ validationErrors }) => {
  //   dispatch({ type: 'CUSTOMER_FETCH_FAILED', payload: validationErrors });
  // });
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
