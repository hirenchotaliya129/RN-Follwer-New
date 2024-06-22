import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

import {colors} from '../helper/utils';
import {configData} from './config';

export const wp = val => {
  return widthPercentageToDP(val);
};

export const hp = val => {
  return heightPercentageToDP(val);
};

export const STATUS_DAILY = 'dl';
export const STATUS_FOLLOW = 'fl';
export const STATUS_RATE = 'rt';
export const STATUS_VIDEO = 'vd';

export const TYPE_FOLLOW = 'follow';
export const TYPE_LIKE = 'like';
export const TYPE_REEL = 'reel';

export const hitSlop = {top: hp(1), bottom: hp(1), left: wp(2), right: wp(2)};

export const userAgent =
  'Instagram 9.5.2 (iPhone7,2; iPhone OS 9_3_3; en_US; en-US; scale=2.00; 750x1334) AppleWebKit/420+';

export const localStorageKeys = {
  userData: 'userData',
  currentUserId: 'currentUserId',
  currentUserData: 'currentUserData',
  adsTime: 'adsTime',
  isClickFollow: 'isClickFollow',
  currentDate: 'currentDate',
};

export const shadowStyle = {
  shadowOffset: {
    height: 2,
    width: 2,
  },
  elevation: 5,
  shadowOpacity: 0.5,
  shadowRadius: wp(1),
  shadowColor: colors.gray,
  backgroundColor: colors.white,
};

export const status = {
  success: 1,
  fail: 0,
};

export const messageText = {
  POST_FOUND_ERROR:
    'This post may be removed or not available, please check your url!',
  ENTER_VALID_URL: 'Enter valid url!',
  PRIVATE_POST: 'This is private post!',
  PRIVATE_USER: 'This is private account, please make it public!',
  INPUT_NULL_ERROR_FOLLOWER: 'Please enter username or past profile url',
  INPUT_NULL_ERROR_LIKE: 'Please enter or past url',
  ERROR: 'something went wrong please try again',
};

export const typeCampaign = {
  follow: {
    type: TYPE_FOLLOW,
    headerName: 'Get Follower',
    buyButtonTitle: 'Buy Followers',
    atleast: configData?.config.atf,
    type_coin: configData?.config.gfc,
    searchTitle: 'Enter Username or Profile URL...',
    descText:
      'Copy username,paste it or enter username into the field above,then click the search button to find the profile.',
  },
  like: {
    type: TYPE_LIKE,
    headerName: 'Get Like',
    buyButtonTitle: 'Buy Likes',
    atleast: configData?.config.atl,
    type_coin: configData?.config.glc,
    searchTitle: 'Enter or Post URL...',
    descText:
      'Copy post url,paste it or enter post url into the field above,then click the search button to find the post.',
  },
  reel: {
    type: TYPE_REEL,
    headerName: 'Get Reels',
    buyButtonTitle: 'Buy Views',
    atleast: configData?.config.atr,
    type_coin: configData?.config.grc,
    searchTitle: 'Enter or Reel URL...',
    descText:
      'Copy reel url,paste it or enter reel url into the field above,then click the search button to find the reel.',
  },
};

export const typeBuy = {
  follow: {
    type: TYPE_FOLLOW,
    headerName: 'Buy Followers',
    searchTitle: 'Enter Username or Profile URL...',
    descText:
      'Copy username,paste it or enter username into the field above,then click the search button to find the profile.',
    data: configData?.follower,
    listType: 'FOLLOWERS',
  },
  like: {
    type: TYPE_LIKE,
    headerName: 'Buy Likes',
    searchTitle: 'Enter or Post URL...',
    data: configData?.like,
    listType: 'LIKES',
    descText:
      'Copy post url,paste it or enter post url into the field above,then click the search button to find the post.',
  },
  reel: {
    type: TYPE_REEL,
    headerName: 'Buy Reels Views',
    searchTitle: 'Enter or Reel URL...',
    data: configData?.reel,
    listType: 'REEL VIEWS',
    descText:
      'Copy reel url,paste it or enter reel url into the field above,then click the search button to find the reel.',
  },
};
