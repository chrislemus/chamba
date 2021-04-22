import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authUserReducer from './authUserReducer';
import alertReducer from './alertReducer';
export default combineReducers({
  user: userReducer,
  authUser: authUserReducer,
  alert: alertReducer,
});
