import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authUserReducer from './authUserReducer';
import alertModalReducer from './alertModalReducer';
import customerListReducer from './customerListReducer';
import customerReducer from './customerReducer';

const createRootReducer = () =>
  combineReducers({
    user: userReducer,
    authUser: authUserReducer,
    alertModal: alertModalReducer,
    customerList: customerListReducer,
    customer: customerReducer,
  });

export default createRootReducer;
