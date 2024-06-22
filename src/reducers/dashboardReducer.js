import {
  USER_LIST,
  USER_POST,
  USER_DETAILS,
  GET_COMPAIGNS_LIST,
  CURRENT_USER_INFO_IN_USER_LIST,
  USER_DETAILS_BY_POST_REELS,
} from '../actions/type';

const INITIAL_STATE = {
  userPost: [],
  usersList: [],
  userDetails: {},
  compaignsList: [],
  currentUserInList: {},
  userDetailsByPost: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMPAIGNS_LIST:
      return {...state, compaignsList: action.payload};
    case USER_LIST:
      return {...state, usersList: action.payload};
    case USER_DETAILS:
      return {...state, userDetails: action.payload};
    case USER_DETAILS_BY_POST_REELS:
      return {...state, userDetailsByPost: action.payload};
    case CURRENT_USER_INFO_IN_USER_LIST:
      return {...state, currentUserInList: action.payload};
    case USER_POST:
      if (action.payload?.isNextPageId === '') {
        return {
          ...state,
          userPost:
            action.payload?.data?.user?.edge_owner_to_timeline_media?.edges,
        };
      } else {
        return {
          ...state,
          userPost: [
            ...state.userPost,
            ...action.payload?.data?.user?.edge_owner_to_timeline_media?.edges,
          ],
        };
      }
    default:
      return state;
  }
};
