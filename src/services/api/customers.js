import { axiosApi } from './axiosApi';

const fetchCustomers = async (query, pageLimit, page) => {
  const res =  await axiosApi.get(
    `/customers?query=${query}&limit=${pageLimit}&page=${page}`
  );
  return res.data
};

const addNewCustomer = async(customer) => {
  const res  = await axiosApi.post('/customers', { customer })
  return res?.data
};
/*
  error {
    response {
      message: ''
    }
  }
  

  error {
    validationErrors: ['dwd', 'dwd'],
    response {
      message: ''
    }
  }
*/

const editCustomer = async (customerId, customer) => {
  const res  = await axiosApi.patch(`/customers/${customerId}`, { customer })
  return res?.data
  // return (dispatch) => {
  //   dispatch({ type: 'CUSTOMER_FETCH' });
  //   axiosApi
  //     .patch(`/customers/${customerId}`, { customer })
  //     .then(({ data }) => {
  //       const { customer } = data;
  //       dispatch({ type: 'CUSTOMER_EDIT_SUCCESS', payload: customer });
  //       // dispatch(alertModalSuccess('Successfully updated Customer'));
  //     })
  //     .catch(({ validationErrors }) => {
  //       dispatch({
  //         type: 'CUSTOMER_FETCH_FAILED',
  //         payload: validationErrors,
  //       });
  //     });
  // };
};

const fetchCustomerById = async (customerId) => {
  const res =  await axiosApi.get(`/customers/${customerId}`);
  return res.data
  // .then(({ data }) => {
  //   const customer = data?.customer;
  //   dispatch({ type: 'CUSTOMER_FETCH_BY_ID_SUCCESS', payload: customer });
  // })
  // .catch(({ validationErrors }) => {
  //   dispatch({ type: 'CUSTOMER_FETCH_FAILED', payload: validationErrors });
  // });
};

export { fetchCustomers, fetchCustomerById, addNewCustomer, editCustomer };
