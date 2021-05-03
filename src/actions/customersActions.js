import axios from 'axios';
import { apiAuthHeader, apiFetchErrors } from '../helpers/api';

const apiUrl = 'http://localhost:3005/api';

export const fetchAllCustomers = () => {
  return (dispatch) => {
    dispatch({ type: 'CUSTOMERS_FETCH_ALL' });
    const header = apiAuthHeader();
    axios
      .get(`${apiUrl}/customers`, { headers: { ...header } })
      .then(({ data }) => {
        // console.log(data.customers);
        dispatch({
          type: 'CUSTOMERS_FETCH_ALL_SUCCESS',
          payload: data.customers,
        });
      })
      .catch((error) => {
        const errors = apiFetchErrors(error);
        dispatch({ type: 'CUSTOMERS_FAILED', payload: errors });
      });
  };
};
// export const fetchCustomers = createAsyncThunk(
//   'customers/fetchCustomers',
//   async () => {
//     const header = apiAuthHeader();
//     let has_error = false;
//     const res = await axios
//       .get(`${apiUrl}/custsomers`, {
//         headers: { ...header },
//       })
//       .then((response) => {
//         const customers = response?.data?.customers;
//         if (customers) {
//           return customers;
//         } else {
//           throw new Error(response.statusText);
//         }
//       })
//       .catch((error) => {
//         has_error = true;
//         const errorMessage = error?.message && error.message.length > 0;
//         const defaultMessage =
//           "We've encountered some issues, please try again at a later time";
//         const defaultFaultFetchErrors = [];
//         defaultFaultFetchErrors.push(errorMessage || defaultMessage);

//         const errors = error?.response?.data?.errors || defaultFaultFetchErrors;

//         return errors;
//       });
//     return has_error ? Promise.reject(res) : res;
//   }
// );
