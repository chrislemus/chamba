// const tempUser = { username: 'me', password: '123' };

const initialState = {
  user: null,
  status: 'idle',
  errors: null,
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_ADD_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'USER_LOGOUT':
      return {};
    default:
      return { ...state };
  }
}
