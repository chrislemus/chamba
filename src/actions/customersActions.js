import { axiosApi } from '../helpers/api';
import { history } from '../store';
// import { useSelector } from 'react-redux';

export const fetchAllCustomers = () => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOMERS_FETCH' });

    axiosApi
      .get(`/customers`)
      .then(({ data }) => {
        const { customers } = data;
        console.log(customers);
        dispatch({
          type: 'CUSTOMERS_FETCH_ALL_SUCCESS',
          payload: customers,
        });
      })
      .catch((error) => {
        dispatch({ type: 'CUSTOMERS_FETCH_FAILED' });
      });
  };
};

export const newCustomer = (customer) => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOMERS_FETCH' });
    axiosApi
      .post('/customers', { customer })
      .then(({ data }) => {
        const customerId = data?.customer?.id;
        dispatch({ type: 'CUSTOMERS_CUSTOMER_ADDED' });
        history.push(`/customers/${customerId}`);
      })
      .catch((error) => {
        // const errors = apiFetchErrors(error);
        dispatch({ type: 'CUSTOMERS_FETCH_FAILED', payload: error });
      });
  };
};

export const fetchCustomerById = (customerId) => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOMERS_FETCH' });
    axiosApi
      .get(`/customers/${customerId}`)
      .then(({ data }) => {
        const customer = data?.customer;
        dispatch({ type: 'CUSTOMERS_FETCH_BY_ID_SUCCESS', payload: customer });
      })
      .catch((error) => {
        // const errors = apiFetchErrors(error);
        dispatch({ type: 'CUSTOMERS_FETCH_FAILED', payload: error });
      });
  };
};
