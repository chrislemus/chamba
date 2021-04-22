import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authUserReducer from './authUserReducer';
export default combineReducers({
  user: userReducer,
  authUser: authUserReducer,
});
