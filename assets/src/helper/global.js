import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {api} from './apiConstants';

export const makeAPIRequest = ({method, url, data, headers, params}) =>
  new Promise((resolve, reject) => {
    const option = {
      method,
      baseURL: api.BASE_URL,
      url,
      data,
      headers,
      params,
    };
    axios(option)
      .then(response => {
        console.log('axios response ::: ', response);
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        console.log('axios Error ::: ', error);
        reject(error);
      });
  });

export const setLocalItem = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

export const getLocalItem = async key => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export const errorToast = () => {
  // ToastAndroid.show('something went wrong please try again', ToastAndroid.LONG);
  Toast.show({
    type: 'error',
    text1: 'something went wrong please try again',
  });
};

export const errorMsgToast = msg => {
  Toast.show({
    type: 'error',
    text1: msg,
  });
};

export const successTost = msg => {
  // ToastAndroid.show('something went wrong please try again', ToastAndroid.LONG);
  Toast.show({
    type: 'success',
    text1: msg,
  });
};
