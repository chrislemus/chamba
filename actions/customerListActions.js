// import { axiosApi } from '../helpers/api';

// export const fetchCustomers = (query, pageLimit, page) => {
//   return (dispatch) => {
//     dispatch({ type: 'CUSTOMER_LIST_FETCH' });
//     axiosApi
//       .get(`/customers?query=${query}&limit=${pageLimit}&page=${page}`)
//       .then(({ data }) => {
//         const { customers, queryData } = data;
//         dispatch({
//           type: 'CUSTOMER_LIST_FETCH_CUSTOMERS_SUCCESS',
//           payload: { customers, queryData },
//         });
//       })
//       .catch((error) => {
//         dispatch({ type: 'CUSTOMER_LIST_FETCH_FAILED' });
//       });
//   };
// };
