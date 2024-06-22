import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  AppState,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {
  Header,
  AdsButton,
  MainButton,
  AlertModal,
  DesignTitle,
  BuyItemView,
  ActivityLoader,
} from '../../components';
import {configData} from '../../helper/config';
import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';
import {redirectToInstgram, secondsToHms} from '../../helper/globalFuncation';
import {
  hp,
  wp,
  typeBuy,
  STATUS_VIDEO,
  STATUS_FOLLOW,
  localStorageKeys,
} from '../../helper/constants';
import {
  errorToast,
  getLocalItem,
  setLocalItem,
  successTost,
} from '../../helper/global';
import {useDispatch, useSelector} from 'react-redux';
import {checkFollowUser, setMiniStore} from '../../actions/commonAction';
import {api} from '../../helper/apiConstants';
import {setCoin} from '../../actions/dashboardAction';

const Store = ({navigation}) => {
  const dispatch = useDispatch();
  const {login, dashboard} = useSelector(state => state);
  const {deviceId} = login;
  const {currentUserInList} = dashboard;

  const [alertMsg, setAlertMsg] = useState('');
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertModal, setIsAlertModal] = useState(false);

  // const {adLoaded, adDismissed, show, reward} = useRewardedAd(TestIds.REWARDED);

  const getClickFollowValue = async () => {
    let is_click_follow = await getLocalItem(localStorageKeys.isClickFollow);
    if (JSON.parse(is_click_follow)) {
      checkFollowOrNot();
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log('nextAppState', nextAppState);
      if (nextAppState === 'active') {
        getAdsTime();
        getClickFollowValue();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  async function getAdsTime() {
    let time = await getLocalItem(localStorageKeys.adsTime);
    let current = moment().format();
    let diffr = moment.duration(moment(time).diff(moment(current)));
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    if (d > 0) {
      setRunTimer(true);
      setCountDown(d);
    } else {
      setCountDown(0);
      setRunTimer(false);
    }
  }

  useEffect(() => {
    getAdsTime();
  }, []);

  useEffect(() => {
    let timerId;
    if (runTimer) {
      timerId = setInterval(() => {
        setCountDown(countDown => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log('expired');
      setRunTimer(false);
      setCountDown(0);
      setLocalItem(localStorageKeys.adsTime, '0');
    }
  }, [countDown, runTimer]);

  // useEffect(() => {
  //   // rewar={"amount": 10, "type": "coins"}
  //   if (reward !== undefined) {
  //     let current = moment().format();
  //     let adsEnd = moment().add(configData.config.vt, 'seconds').format();
  //     let diffr = moment.duration(moment(adsEnd).diff(moment(current)));
  //     var hours = parseInt(diffr.asHours());
  //     var minutes = parseInt(diffr.minutes());
  //     var seconds = parseInt(diffr.seconds());
  //     var d = hours * 60 * 60 + minutes * 60 + seconds;
  //     setCountDown(d);
  //     setLocalItem(localStorageKeys.adsTime, adsEnd);
  //     setRunTimer(true);
  //     setTimeout(() => {
  //       miniStoreApiCall(STATUS_VIDEO);
  //     }, 200);
  //   }
  // }, [reward]);

  const onPressWatch = () => {
    if (adLoaded) {
      show();
    } else {
      errorToast();
    }
  };

  const miniStoreApiCall = type => {
    setIsLoading(true);
    const data = new FormData();
    data.append('api', api.appKey);
    data.append('di', deviceId);
    data.append('pk', currentUserInList.pk);
    data.append('st', type);

    console.log('data', data);

    const obj = {
      data: data,
      onSuccess: res => {
        setIsLoading(false);
        if (res?.success === 1) {
          dispatch(setCoin(res?.data?.coin));
          successTost(res?.msg || 'Updated');
        } else if (res?.success === 0) {
          setAlertMsg(res?.msg);
          setIsAlertModal(true);
        }
      },
      onFail: () => {
        setIsLoading(false);
      },
    };
    dispatch(setMiniStore(obj));
  };

  const checkFollowOrNot = () => {
    setIsLoading(true);
    const obj = {
      userName: configData.config.fn,
      loading: () => setIsLoading(false),
      onSuccess: isFollow => {
        setLocalItem(localStorageKeys.isClickFollow, 'false');
        console.log('isFollow', isFollow);
        if (isFollow) {
          miniStoreApiCall(STATUS_FOLLOW);
        } else {
          setIsLoading(false);
          setAlertMsg(
            `Please follow this account form ${configData.config.fn} to get free coins.`,
          );
          setIsAlertModal(true);
        }
      },
      onFail: () => {
        setIsLoading(false);
        errorToast();
        setLocalItem(localStorageKeys.isClickFollow, 'false');
      },
    };
    dispatch(checkFollowUser(obj));
  };

  const onPressFollow = () => {
    setLocalItem(localStorageKeys.isClickFollow, 'true');
    redirectToInstgram(configData.config.fn);
  };

  const onPressItem = item => {};

  return (
    <SafeAreaView style={style.container}>
      <ActivityLoader visible={isLoading} />
      <AlertModal
        msg={alertMsg}
        isVisible={isAlertModal}
        onPressOK={() => setIsAlertModal(false)}
      />
      <Header
        disabled={true}
        leftIcon={icons.back}
        centerTitle={'Store'}
        onPressLeftIcon={() => navigation.goBack()}
        containerStyle={{borderBottomWidth: wp(0.4)}}
      />
      <ScrollView>
        <View style={style.addButtonCotainer}>
          <AdsButton
            source={icons.ads}
            title={'WATCH AD'}
            disabled={runTimer}
            onPressBtn={onPressWatch}
            coins={configData.config.vc}
            btnTitle={runTimer ? `${secondsToHms(countDown)}` : 'Watch'}
          />
          <AdsButton
            title={'FOLLOW US'}
            btnTitle={'FOLLOW'}
            source={icons.instagram}
            onPressBtn={onPressFollow}
            coins={configData.config.fc}
          />
        </View>
        <Text style={style.descText}>
          {
            'You can create an instant campaign by purchasing advantages packages.'
          }
        </Text>
        <View style={style.rowStyle}>
          <MainButton
            title={'BUY\nFOLLOWERS'}
            icon={icons.people}
            onPress={() => navigation.navigate('BuyFollowers', typeBuy.follow)}
          />
          <MainButton
            onPress={() => navigation.navigate('BuyFollowers', typeBuy.like)}
            icon={icons.heart}
            title={'BUY\nLIKES'}
            containerStyle={{borderColor: colors.whiteGray}}
          />
          <MainButton
            onPress={() => navigation.navigate('BuyFollowers', typeBuy.reel)}
            title={'BUY REELS\nVIEW & LIKES'}
            icon={icons.reels}
          />
        </View>
        <DesignTitle title={'Buy Coins'} />
        <FlatList
          scrollEnabled={true}
          style={{marginTop: hp(1)}}
          data={configData.coin}
          renderItem={({item, index}) => {
            return (
              <BuyItemView
                coin={item.a}
                type={'Coins'}
                source={icons.coin}
                coinNumber={item.n}
                onPressItem={() => onPressItem(item, index)}
              />
            );
          }}
        />
        <DesignTitle title={'Remove Ads'} />
        <BuyItemView
          coin={'200'}
          type={'Remove Ads'}
          source={icons.noAds}
          onPressItem={() => {}}
          iconStyle={style.noAdsIconStyle}
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
  addButtonCotainer: {
    margin: wp(4),
    borderRadius: wp(4),
    flexDirection: 'row',
    paddingVertical: hp(2),
    justifyContent: 'space-around',
    backgroundColor: colors.whiteGray,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descText: {
    marginTop: hp(2),
    marginBottom: hp(1),
    textAlign: 'center',
    marginHorizontal: wp(4),
    fontFamily: fontFamily.saira_semiBold,
  },
  noAdsIconStyle: {
    width: wp(8),
    height: wp(8),
  },
});

export default Store;
