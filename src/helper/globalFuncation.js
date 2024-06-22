import React from 'react';
import {Linking} from 'react-native';
import {configData} from './config';
var SendIntentAndroid = require('react-native-send-intent');

import {TYPE_FOLLOW, TYPE_LIKE, TYPE_REEL} from './constants';
import {errorToast} from './global';

import {icons} from './iconsConstant';

export const getCompaignsIcon = type => {
  switch (type) {
    case TYPE_FOLLOW:
      return icons.blackPeople;
    case TYPE_LIKE:
      return icons.blackHeart;
    case TYPE_REEL:
      return icons.blackReels;
    default:
      break;
  }
};

export const earnTypeCoin = (type, config) => {
  switch (type) {
    case TYPE_FOLLOW:
      return config?.efc;
    case TYPE_LIKE:
      return config?.elc;
    case TYPE_REEL:
      return config?.erc;
    default:
      return 0;
  }
};

export const tyepIcon = type => {
  switch (type) {
    case TYPE_FOLLOW:
      return icons.peoplePink;
    case TYPE_LIKE:
      return icons.heart;
    case TYPE_REEL:
      return icons.reels;
    default:
      return icons.peoplePink;
  }
};

export const redirectToInstgram = userName => {
  SendIntentAndroid.isAppInstalled('com.instagram.android').then(
    isInstalled => {
      if (isInstalled === true) {
        SendIntentAndroid.openAppWithData(
          'com.instagram.android',
          `https://www.instagram.com/${userName}`,
        )
          .then(wasOpened => {
            if (wasOpened) {
            } else {
              errorToast();
            }
          })
          .catch(() => {
            errorToast();
          });
      } else {
        Linking.openURL('market://details?id=com.instagram.android');
      }
    },
  );
};

export const redirectToInstgramPost = code => {
  SendIntentAndroid.isAppInstalled('com.instagram.android').then(
    isInstalled => {
      if (isInstalled === true) {
        SendIntentAndroid.openAppWithData(
          'com.instagram.android',
          `https://www.instagram.com/p/${code}`,
        )
          .then(wasOpened => {
            if (wasOpened) {
            } else {
              errorToast();
            }
          })
          .catch(() => {
            errorToast();
          });
      } else {
        Linking.openURL('market://details?id=com.instagram.android');
      }
    },
  );
};

export const goToInstTags = () => {
  SendIntentAndroid.isAppInstalled('com.instagram.android').then(
    isInstalled => {
      if (isInstalled === true) {
        SendIntentAndroid.openAppWithData(
          'com.instagram.android',
          'https://www.instagram.com',
        )
          .then(wasOpened => {
            if (wasOpened) {
            } else {
              errorToast();
            }
          })
          .catch(() => {
            errorToast();
          });
      } else {
        Linking.openURL('market://details?id=com.instagram.android');
      }
    },
  );
};

export function secondsToHms(secs) {
  if (secs > 0) {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    // console.log('minutes', minutes, seconds, hours);
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return '00:00';
    } else {
      return [hours, minutes, seconds]
        .map(v => (v < 10 ? '0' + v : v))
        .filter((v, i) => v !== '00' || i > 0)
        .join(':');
    }
  } else {
    return '0';
  }
}
