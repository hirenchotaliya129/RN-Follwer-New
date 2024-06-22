import {GET_COMPAIGN} from '../actions/type';

const INITIAL_STATE = {
  compaignObj: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMPAIGN:
      return {...state, compaignObj: action.payload};
    default:
      return state;
  }
};
