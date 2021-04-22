const tempUser = { username: 'me', password: '123' };
// const initialState = {
//   user: null,
//   authentication: {
//     fetching: false,
//     errors: [],
//   },
// };
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_ADD_USER':
      return { ...action.payload.user };
    case 'USER_LOGOUT':
      return {};
    default:
      return { ...state };
  }
}
