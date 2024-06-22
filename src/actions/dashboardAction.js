import {
  USER_DETAILS,
  GET_COMPAIGNS_LIST,
  CURRENT_USER_INFO_IN_USER_LIST,
  COIN,
  USER_POST,
  USER_DETAILS_BY_POST_REELS,
} from './type';
import {
  errorMsgToast,
  errorToast,
  makeAPIRequest,
  setLocalItem,
} from '../helper/global';
import {api, GET, POST} from '../helper/apiConstants';
import {localStorageKeys, messageText} from '../helper/constants';

export const getCompaignsList = request => dispatch => {
  return makeAPIRequest({
    method: POST,
    url: api.myCampaign,
    data: request.data,
  })
    .then(response => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response.data);
        dispatch({type: GET_COMPAIGNS_LIST, payload: response.data});
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const createCompaign = request => dispatch => {
  return makeAPIRequest({
    method: POST,
    url: api.createCampaign,
    data: request.data,
  })
    .then(response => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response.data);
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const instUserDetailsByUn = request => dispatch => {
  return makeAPIRequest({
    method: GET,
    url: `https://www.instagram.com/${request.un}/?__a=1`,
  })
    .then(response => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response.data);
        dispatch({type: USER_DETAILS, payload: response.data});
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const instUserDetailsByUrlPost = request => dispatch => {
  return makeAPIRequest({
    method: GET,
    url: request.url,
  })
    .then(response => {
      if (response.status === 200) {
        if (response.data.includes('window._sharedData')) {
          let newData = response?.data
            ?.split('window._sharedData = ')[1]
            .split(';')[0];
          if (JSON.parse(newData)?.entry_data?.ProfilePage) {
            let user =
              JSON.parse(newData)?.entry_data?.ProfilePage?.[0]?.graphql?.user;
            let isPrivate = user?.is_private;
            let isFollowed = user?.followed_by_viewer;
            if (isPrivate) {
              if (!isFollowed) {
                if (request.isPrivate) request.isPrivate();
                errorMsgToast(messageText.PRIVATE_POST);
              } else {
                errorToast();
                if (request.loading) request.loading();
              }
            } else {
              errorToast();
              if (request.loading) request.loading();
            }
          } else {
            if (JSON.parse(newData).entry_data?.PostPage) {
              let data = JSON.parse(newData).entry_data?.PostPage?.[0]?.graphql;
              if (request.onSuccess) request.onSuccess(data);
              dispatch({type: USER_DETAILS_BY_POST_REELS, payload: data});
            } else {
              errorToast();
              if (request.loading) request.loading();
            }
          }
        }
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const setCurrentUserInUserList = data => dispatch => {
  setLocalItem(localStorageKeys.currentUserData, JSON.stringify(data));
  dispatch({type: CURRENT_USER_INFO_IN_USER_LIST, payload: data});
};

export const setCoin = data => dispatch => {
  dispatch({type: COIN, payload: data});
};

export const getUserPost = request => dispatch => {
  return makeAPIRequest({
    method: GET,
    url: `https://instagram.com/graphql/query/?query_id=17888483320059182&variables=${JSON.stringify(
      request.userObj,
    )}`,
  })
    .then(response => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response.data);
        dispatch({
          type: USER_POST,
          payload: {...response.data, isNextPageId: request.userObj.after},
        });
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const buyCompaign = request => dispatch => {
  return makeAPIRequest({
    method: POST,
    url: api.buyCampaign,
    data: request.data,
  })
    .then(response => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response.data);
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};
