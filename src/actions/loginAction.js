import {userAgent} from '../helper/constants';
import {makeAPIRequest} from '../helper/global';
import {api, GET, POST} from '../helper/apiConstants';
import {
  USER_LIST,
  GET_DEVICE_ID,
  CURRENT_USER_INFO,
  COIN,
  COUNTRY_ID,
} from './type';

export const instLoginByUserID = request => dispatch => {
  const header = {
    'User-Agent': userAgent,
  };

  return makeAPIRequest({
    method: GET,
    url: `https://i.instagram.com/api/v1/users/${request.ds_user_id}/info/`,
    headers: header,
  })
    .then(response => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response.data);
        dispatch({type: CURRENT_USER_INFO, payload: response?.data});
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const loginLikeFlw = request => dispatch => {
  return makeAPIRequest({
    method: POST,
    url: api.loginUrl,
    data: request.data,
  })
    .then(response => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response.data);
        dispatch({type: USER_LIST, payload: response?.data?.data?.user || []});
        dispatch({type: COIN, payload: response?.data?.data?.cc || 0});
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const getLocation = request => () => {
  return makeAPIRequest({
    method: GET,
    url: api.getLocation,
  })
    .then(response => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response);
      }
    })
    .catch(error => {
      if (request.onFail) request.onFail(error.response);
    });
};

export const getDeviceId = id => dispatch => {
  dispatch({type: GET_DEVICE_ID, payload: id});
};

export const setCurrentUserSelected = data => dispatch => {
  dispatch({type: USER_LIST, payload: data});
};

export const setCountryId = id => dispatch => {
  dispatch({type: COUNTRY_ID, payload: id});
};
