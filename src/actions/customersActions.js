import axios from 'axios';
import { apiAuthHeader, apiFetchErrors } from '../helpers/api';
import { history } from '../store';
import { useSelector } from 'react-redux';

const apiUrl = 'http://localhost:3005/api';
const authHeader = apiAuthHeader();

export const fetchAllCustomers = () => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOMERS_FETCH' });

    axios
      .get(`${apiUrl}/customers`, { headers: { ...authHeader } })
      .then(({ data }) => {
        const { customers } = data;
        console.log(customers);
        dispatch({
          type: 'CUSTOMERS_FETCH_ALL_SUCCESS',
          payload: customers,
        });
      })
      .catch((error) => {
        const errors = apiFetchErrors(error);
        dispatch({ type: 'CUSTOMERS_FETCH_FAILED', payload: errors });
      });
  };
};

export const newCustomer = (customer) => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOMERS_FETCH' });
    axios
      .post(apiUrl + '/customers', { customer }, { headers: { ...authHeader } })
      .then(({ data }) => {
        const customerId = data?.customer?.id;
        dispatch({ type: 'CUSTOMERS_CUSTOMER_ADDED' });
        history.push(`/customers/${customerId}`);
      })
      .catch((error) => {
        const errors = apiFetchErrors(error);
        dispatch({ type: 'CUSTOMERS_FETCH_FAILED', payload: errors });
      });
  };
};

export const fetchCustomerById = (customerId) => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOMERS_FETCH' });
    axios
      .get(`${apiUrl}/customers/${customerId}`, { headers: { ...authHeader } })
      .then(({ data }) => {
        const customer = data?.customer;
        dispatch({ type: 'CUSTOMERS_FETCH_BY_ID_SUCCESS', payload: customer });
      })
      .catch((error) => {
        const errors = apiFetchErrors(error);
        dispatch({ type: 'CUSTOMERS_FETCH_FAILED', payload: errors });
      });
  };
};
