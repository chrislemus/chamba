// const tempUser = { username: 'me', password: '123' };

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_ADD_USER':
      return { ...action.payload };
    case 'USER_LOGOUT':
      return {};
    default:
      return { ...state };
  }
}
