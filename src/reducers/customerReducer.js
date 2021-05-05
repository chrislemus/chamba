const initialState = {
  status: 'idle',
  validationErrors: null,
  error: null,
  data: null, //object data
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case 'CUSTOMER_RESET_STORE':
      return { ...initialState };
    case 'CUSTOMER_FETCH':
      return {
        ...state,
        status: 'fetching',
      };
    case 'CUSTOMER_FETCH_FAILED':
      return {
        ...state,
        status: 'failed',
        validationErrors: action.payload,
      };
    case 'CUSTOMER_ADD_NEW_SUCCESS':
      return {
        ...state,
        status: 'success',
        data: action.payload,
        validationErrors: null,
      };
    case 'CUSTOMER_EDIT_SUCCESS':
      return {
        ...state,
        status: 'success',
        data: action.payload,
        validationErrors: null,
      };
    case 'CUSTOMER_FETCH_BY_ID_SUCCESS':
      return {
        ...state,
        status: 'success',
        data: action.payload,
        validationErrors: null,
      };
    default:
      return { ...state };
  }
}
