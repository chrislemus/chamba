// 'idle' | 'loading' | 'succeeded' | 'failed',
const initialState = {
  status: 'idle',
  errors: null,
  customersList: [],
};

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case ' CUSTOMERS_FETCH_ALL':
      return {
        ...state,
        status: 'fetching',
      };
    case ' CUSTOMERS_FETCH_ALL_SUCCESS':
      return {
        ...state,
        status: 'succeeded',
        customersList: action.payload,
        errors: null,
      };
    case ' CUSTOMERS_FETCH_ALL_FAILED':
      return {
        ...state,
        status: 'failed',
        errors: action.payload,
      };
    default:
      return { ...state };
  }
}
