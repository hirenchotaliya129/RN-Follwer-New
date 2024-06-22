import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import dashboardReducer from './dashboardReducer';
import commonReducer from './commonReducer';

const appReducer = combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
  common: commonReducer,
});

export default appReducer;
