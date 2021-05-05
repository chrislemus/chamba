import { axiosApi } from '../helpers/api';

export const fetchCustomers = () => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOMER_LIST_FETCH' });

    axiosApi
      .get(`/customers`)
      .then(({ data }) => {
        const { customers } = data;
        dispatch({
          type: 'CUSTOMER_LIST_FETCH_CUSTOMERS_SUCCESS',
          payload: customers,
        });
      })
      .catch((error) => {
        dispatch({ type: 'CUSTOMER_LIST_FETCH_FAILED' });
      });
  };
};
