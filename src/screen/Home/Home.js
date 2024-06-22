import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  NativeModules,
} from 'react-native';
import CookieManager from 'react-native-cookies';
import {useDispatch, useSelector} from 'react-redux';
import DeviceCountry from 'react-native-device-country';

import {api} from '../../helper/apiConstants';
import {colors, fontFamily} from '../../helper/utils';
import {icons, images} from '../../helper/iconsConstant';
import {ActivityLoader, InstagramModal, TagButton} from '../../components';
import {hp, localStorageKeys, status, wp} from '../../helper/constants';
import {errorToast, getLocalItem, setLocalItem} from '../../helper/global';
import {
  getDeviceId,
  setCountryId,
  loginLikeFlw,
  instLoginByUserID,
  setCurrentUserInUserList,
} from '../../actions';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {login} = useSelector(state => state);
  const {deviceId, countryId} = login;

  const [isInstModal, setIsInstModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onPressBios = () => navigation.navigate('Bios');
  const onPressHashtag = () => navigation.navigate('Hashtag');

  useEffect(() => {
    // const {DeviceInfoModule} = NativeModules;
    // DeviceInfoModule.getPhoneID().then(res => {
    //   dispatch(getDeviceId(res));
    // });
    DeviceCountry.getCountryCode()
      .then(result => {
        dispatch(setCountryId(result?.code || ''));
      })
      .catch(e => {});
  }, []);

  const onNavigationStateChange = webViewState => {
    const {url} = webViewState;
    if (url) {
      const match = url.match(/(#|\?)(.*)/);
      if (match !== null) {
        CookieManager.get(url).then(cookie => {
          setIsInstModal(false);
          setLocalItem(localStorageKeys.currentUserId, JSON.stringify(cookie));
          setLocalItem(
            localStorageKeys.userData,
            JSON.stringify([cookie]),
          ).then(() => {
            instLoginApiCall(cookie, 'login');
          });
        });
      }
    }
  };

  const likeFlwLogin = (user, currentUserObj, type) => {
    const data = new FormData();
    data.append('api', api.appKey);
    data.append('di', deviceId);
    data.append('cn', countryId);
    data.append('ty', type);
    data.append('pk', user.pk.toString());
    data.append('un', user?.username);
    data.append('pc', user?.profile_pic_url);
    data.append(
      'ck',
      `ds_user_id=${currentUserObj?.ds_user_id};sessionid=${currentUserObj?.sessionid};`,
    );
    data.append('tk', currentUserObj?.csrftoken);

    const obj = {
      data: data,
      onSuccess: res => {
        setIsLoading(false);
        if (res?.success === status.success) {
          let userData = res?.data?.user;
          let item = userData.filter(i => i.pk === user.pk.toString());
          dispatch(setCurrentUserInUserList(item?.[0]));
          navigation.navigate('Compaigns');
          CookieManager.clearAll().then(res => {});
        } else {
          errorToast();
        }
      },
      onFail: err => {
        setIsLoading(false);
        errorToast();
      },
    };
    dispatch(loginLikeFlw(obj));
  };

  const instLoginApiCall = (currentUserObj, type) => {
    let id = currentUserObj?.ds_user_id;
    setIsLoading(true);
    const obj = {
      ds_user_id: id,
      onSuccess: res => {
        if (res?.status === 'ok') {
          likeFlwLogin(res?.user, currentUserObj, type);
        } else {
          setIsLoading(false);
          errorToast();
        }
      },
      onFail: () => {
        setIsLoading(false);
        errorToast();
      },
    };
    dispatch(instLoginByUserID(obj));
  };

  const loginFLNonly = (userData, type) => {
    setIsLoading(true);
    const data = new FormData();
    data.append('api', api.appKey);
    data.append('di', deviceId);
    data.append('cn', countryId);
    data.append('ty', type);
    data.append('pk', userData.pk);

    const obj = {
      data: data,
      onSuccess: res => {
        setIsLoading(false);
        if (res?.success === status.success) {
          navigation.navigate('Compaigns');
          dispatch(setCurrentUserInUserList(userData));
          CookieManager.clearAll().then(res => {});
        } else {
          errorToast();
        }
      },
      onFail: err => {
        setIsLoading(false);
        errorToast();
      },
    };
    dispatch(loginLikeFlw(obj));
  };

  const directLogin = async () => {
    const currentUserObjCookies = await getLocalItem(
      localStorageKeys.currentUserId,
    );
    const data = await getLocalItem(localStorageKeys.userData);
    let userData = await getLocalItem(localStorageKeys.currentUserData);

    if (currentUserObjCookies !== null) {
      if (userData !== null) {
        loginFLNonly(JSON.parse(userData), 'only');
      }
    } else {
      loginFLNonly(JSON.parse(data?.[0]), 'only');
    }
  };

  const onPressFollowers = async () => {
    // const data = await getLocalItem(localStorageKeys.userData);
    // if (data === null) {
    //   setIsInstModal(true);
    // } else {
    //   directLogin();
    // }
    navigation.navigate('Compaigns');
  };

  return (
    <SafeAreaView style={style.container}>
      <ActivityLoader visible={isLoading} />
      <ScrollView>
        <Image
          resizeMode={'contain'}
          style={style.imgStyle}
          source={images.banner}
        />
        <Text style={style.titleTextStyle}>{'LIKES & FOLLOWERS'}</Text>
        <TagButton
          btnTitle={'HASHTAG'}
          icon={icons.hashTag}
          onPressButton={onPressHashtag}
        />
        <TagButton
          btnTitle={'BIOS'}
          icon={icons.bios}
          onPressButton={onPressBios}
        />
        <TagButton
          btnTitle={'FOLLOWERS'}
          icon={icons.followers}
          onPressButton={onPressFollowers}
        />
        <View style={{height: hp(3)}} />
        {/* {instagram Modal} */}
        <InstagramModal
          isVisible={isInstModal}
          closeModal={() => setIsInstModal(false)}
          onNavigationStateChange={onNavigationStateChange}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgStyle: {
    width: wp(98),
    height: hp(32),
    marginTop: hp(2),
    alignSelf: 'center',
  },
  titleTextStyle: {
    fontSize: wp(8),
    textAlign: 'center',
    marginBottom: hp(2),
    marginVertical: hp(1),
    color: colors.darkGray,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default Home;
