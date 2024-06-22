import {GET_COMPAIGN} from './type';
import {errorToast, makeAPIRequest} from '../helper/global';
import {api, GET, POST} from '../helper/apiConstants';
import {status} from '../helper/constants';

export const getCompaign = request => dispatch => {
  return makeAPIRequest({
    method: POST,
    url: api.getCampaign,
    data: request.data,
  })
    .then(response => {
      if (response.status === 200) {
        if (request.onSuccess) request.onSuccess(response.data);
        if (response?.data?.success === status.success) {
          dispatch({type: GET_COMPAIGN, payload: response?.data?.data});
        } else {
          errorToast();
        }
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const checkFollowUser = request => dispatch => {
  return makeAPIRequest({
    method: GET,
    url: 'https://www.instagram.com/' + request.userName,
  })
    .then(response => {
      if (response.status === 200) {
        if (response.data.includes('window._sharedData')) {
          let newData = response?.data
            ?.split('window._sharedData = ')[1]
            .split(';')[0];
          console.log('newData', JSON.parse(newData));
          if (JSON.parse(newData)?.entry_data?.ProfilePage) {
            let user =
              JSON.parse(newData)?.entry_data?.ProfilePage?.[0]?.graphql?.user;
            let isFollowed = user?.followed_by_viewer;
            if (request.onSuccess) request.onSuccess(isFollowed);
          } else {
            if (request.loading) request.loading();
          }
        }
      }
    })
    .catch(err => {
      if (request.onFail) request.onFail(err);
    });
};

export const setMiniStore = request => dispatch => {
  return makeAPIRequest({
    method: POST,
    url: api.miniStore,
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
