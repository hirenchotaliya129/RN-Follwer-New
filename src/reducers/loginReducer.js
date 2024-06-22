import {
  GET_DEVICE_ID,
  CURRENT_USER_INFO,
  COIN,
  COUNTRY_ID,
} from '../actions/type';

const INITIAL_STATE = {
  deviceId: '',
  userInfo: {},
  coin: 0,
  countryId: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DEVICE_ID:
      return {...state, deviceId: action.payload};
    case COUNTRY_ID:
      return {...state, countryId: action.payload};
    case CURRENT_USER_INFO:
      return {...state, userInfo: action.payload};
    case COIN:
      return {...state, coin: action.payload};
    default:
      return state;
  }
};
