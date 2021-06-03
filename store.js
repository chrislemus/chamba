import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const history = createBrowserHistory();

export default createStore(rootReducer(), compose(applyMiddleware(thunk)));

// import { createBrowserHistory } from 'history';
// import { routerMiddleware } from 'connected-react-router';
// import rootReducer from './reducers/index';
// import thunk from 'redux-thunk';
// import { configureStore } from '@reduxjs/toolkit';

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const history = createBrowserHistory();

// export default configureStore({
//   reducer: rootReducer(history),
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(routerMiddleware(history)),
