import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';
import authUserReducer from './authUserReducer';
import alertReducer from './alertReducer';
import customersReducer from './customersReducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    authUser: authUserReducer,
    alert: alertReducer,
    customers: customersReducer,
  });

export default createRootReducer;
