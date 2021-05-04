// 'idle' | 'loading' | 'succeeded' | 'failed',
const initialState = {
  status: 'idle',
  errors: null,
  customersList: [],
  customer: null,
};

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case 'CUSTOMERS_FETCH':
      return {
        ...state,
        status: 'fetching',
      };
    case 'CUSTOMERS_FETCH_ALL_SUCCESS':
      return {
        ...state,
        status: 'succeeded',
        customersList: action.payload,
        errors: null,
      };
    case 'CUSTOMERS_FETCH_BY_ID_SUCCESS':
      return {
        ...state,
        status: 'succeeded',
        customer: action.payload,
        errors: null,
      };
    case 'CUSTOMERS_CUSTOMER_ADDED':
      return {
        ...state,
        status: 'succeeded',
        errors: null,
      };
    case 'CUSTOMERS_FETCH_FAILED':
      return {
        ...state,
        status: 'failed',
        errors: action.payload,
      };
    default:
      return { ...state };
  }
}

// export default function userReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'USER_ADD_USER':
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case 'USER_LOGOUT':
//       return {};
//     default:
//       return { ...state };
//   }
// }
