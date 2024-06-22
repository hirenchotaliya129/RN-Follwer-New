import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import dashboardReducer from './dashboardReducer';
import commonReducer from './commonReducer';
import thunk from 'redux-thunk';
import {USER_LOGOUT} from '../actions/type';
import {configureStore} from '@reduxjs/toolkit';

const middleware = [thunk];

const appReducer = combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
  common: commonReducer,
});

const RootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      middleware: middleware,
      serializableCheck: false,
    }),
});

export default store;
