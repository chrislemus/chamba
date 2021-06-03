const initialState = {
  status: 'idle',
  validationErrors: null,
  error: null,
  customers: null, //array data
};

export default function customerListReducer(state = initialState, action) {
  switch (action.type) {
    case 'CUSTOMER_LIST_RESET_STORE':
      return { ...initialState };
    case 'CUSTOMER_LIST_FETCH':
      return {
        ...state,
        status: 'fetching',
      };
    case 'CUSTOMER_LIST_FETCH_FAILED':
      return {
        ...state,
        status: 'failed',
        validationErrors: action.payload,
      };
    case 'CUSTOMER_LIST_FETCH_CUSTOMERS_SUCCESS':
      return {
        ...state,
        status: 'success',
        customers: action.payload.customers,
        queryData: action.payload.queryData,
        validationErrors: null,
      };
    default:
      return { ...state };
  }
}
