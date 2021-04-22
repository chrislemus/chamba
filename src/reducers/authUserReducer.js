// const tempUser = { username: 'me', password: '123' };
const initialState = {
  fetching: false,
  errors: [],
};
export default function authUserReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER_REQUEST':
      return {
        ...state,
        fetching: true,
        errors: [],
      };
    case 'AUTH_USER_SUCCESS':
      return {
        ...state,
        fetching: false,
        errors: [],
      };
    case 'AUTH_USER_FAILURE':
      return {
        ...state,
        fetching: false,
        errors: action.payload.errors,
      };
    default:
      return { ...state };
  }
}
