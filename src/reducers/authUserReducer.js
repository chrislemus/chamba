const initialState = {
  fetching: false,
  validationErrors: [],
};
export default function authUserReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER_REQUEST':
      return {
        ...state,
        fetching: true,
        validationErrors: [],
      };
    case 'AUTH_USER_SUCCESS':
      return {
        ...state,
        fetching: false,
        validationErrors: [],
      };
    case 'AUTH_USER_FAILURE':
      return {
        ...state,
        fetching: false,
        validationErrors: action.payload,
      };
    default:
      return { ...state };
  }
}
// const tempUser = { username: 'me', password: '123' };
//import { createAction, createReducer } from '@reduxjs/toolkit';

// const initialState = {
//   fetching: false,
//   errors: [],
// };

// const request = createAction('counter/request');
// const success = createAction('counter/success');
// const failure = createAction('counter/failure');

// export const authUserReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(request, (state, action) => {
//       state.fetching = true;
//       state.errors = false;
//     })
//     .addCase(success, (state, action) => {
//       state.fetching = false;
//       state.errors = [];
//     })
//     .addCase(failure, (state, action) => {
//       state.fetching = false;
//       state.errors = action.payload.errors;
//     });
// });
