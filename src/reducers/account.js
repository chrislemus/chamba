const initialState = {
  username: false,
};
export default function account(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        ...action.accountInfo,
      };
    default:
      return { ...state };
  }
}
