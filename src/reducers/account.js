const initialState = {
  authenticatedUser: null,
};
export default function account(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authenticatedUser: action.accountInfo,
      };
    case 'LOGOUT':
      return {
        ...state,
        authenticatedUser: null,
      };
    default:
      return { ...state };
  }
}
