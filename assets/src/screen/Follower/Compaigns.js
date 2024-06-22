import moment from 'moment';
import CookieManager from 'react-native-cookies';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, StyleSheet, SafeAreaView} from 'react-native';

import {api} from '../../helper/apiConstants';
import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';

import {
  hp,
  wp,
  status,
  typeCampaign,
  localStorageKeys,
} from '../../helper/constants';

import {errorToast, getLocalItem, setLocalItem} from '../../helper/global';
import {
  getCompaignsList,
  loginLikeFlw,
  instLoginByUserID,
  setCurrentUserSelected,
  setCurrentUserInUserList,
} from '../../actions';
import {
  Header,
  AlertModal,
  MainButton,
  AccountItem,
  DesignTitle,
  CompaignsItem,
  ActivityLoader,
  InstagramModal,
  AddAccountModal,
  EarnCoinsButton,
  CustomDrawerContent,
} from '../../components';
import {configData} from '../../helper/config';

const Compaigns = ({navigation}) => {
  const drawerRef = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [perPageData, setPerPageData] = useState(10);
  const [isInstModal, setIsInstModal] = useState(false);
  const [isRewardModal, setIsRewardModal] = useState(false);
  const [isAddAccountModal, setIsAddAccountModal] = useState(false);

  const {login, dashboard} = useSelector(state => state);
  const {compaignsList, usersList, currentUserInList} = dashboard;
  const {deviceId, countryId} = login;

  const onPressAddAccount = () => {
    setIsAddAccountModal(false);
    setTimeout(() => {
      setIsInstModal(true);
    }, 500);
  };

  useEffect(() => {
    async function rewardModalShow() {
      let asyncDate = await getLocalItem(localStorageKeys.currentDate);
      let currentDate = moment().format('DD-MM-YYYY');

      if (asyncDate === null) {
        setLocalItem(localStorageKeys.currentDate, JSON.stringify(currentDate));
      } else if (JSON.parse(asyncDate) !== currentDate) {
        setTimeout(() => {
          setIsRewardModal(true);
        }, 500);
        setLocalItem(localStorageKeys.currentDate, JSON.stringify(currentDate));
      }
    }
    rewardModalShow();
  }, []);

  useEffect(() => {
    let newData = [...usersList];
    newData.map(i => {
      if (i.pk === currentUserInList.pk) {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    dispatch(setCurrentUserSelected(newData));
  }, [isAddAccountModal]);

  useEffect(() => {
    const data = new FormData();
    data.append('api', api.appKey);
    data.append('di', deviceId);

    const obj = {
      data: data,
      onSuccess: ress => {
        setIsLoading(false);
      },
      onFail: () => {
        setIsLoading(false);
        errorToast();
      },
    };
    dispatch(getCompaignsList(obj));
  }, []);

  const onEndReached = () => {
    setPerPageData(perPageData + 10);
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

  const setUserData = async cookie => {
    setLocalItem(localStorageKeys.currentUserId, JSON.stringify(cookie));
    const data = await getLocalItem(localStorageKeys.userData);
    let newData = [...JSON.parse(data), cookie];
    setLocalItem(localStorageKeys.userData, JSON.stringify([...newData])).then(
      () => {
        instLoginApiCall(cookie, 'login');
      },
    );
  };
  // tester_hello
  // @Test123

  const onNavigationStateChange = webViewState => {
    const {url} = webViewState;
    if (url) {
      const match = url.match(/(#|\?)(.*)/);
      if (match !== null) {
        CookieManager.get(url).then(cookie => {
          setIsInstModal(false);
          setUserData(cookie);
        });
      }
    }
  };

  const setCurrentUserInfo = async (item, userListData) => {
    const allUserData = await getLocalItem(localStorageKeys.userData);
    let allUserTokenInfo = JSON.parse(allUserData);
    allUserTokenInfo.map(cookie => {
      if ((cookie.ds_user_id = item.pk)) {
        setLocalItem(localStorageKeys.currentUserId, JSON.stringify(cookie));
        let newData = [...userListData];
        newData.map(i => {
          if (i.pk === item.pk) {
            i.isSelected = true;
          } else {
            i.isSelected = false;
          }
        });
        dispatch(setCurrentUserSelected(newData));
      }
      setIsLoading(false);
      setIsAddAccountModal(false);
    });
  };

  const onPressUserName = item => {
    setIsLoading(true);
    const data = new FormData();
    data.append('api', api.appKey);
    data.append('di', deviceId);
    data.append('cn', countryId);
    data.append('ty', 'only');
    data.append('pk', item.pk);

    const obj = {
      data: data,
      onSuccess: res => {
        if (res?.success === status.success) {
          dispatch(setCurrentUserInUserList(item));
          setCurrentUserInfo(item, res?.data?.user);
        } else {
          setIsLoading(false);
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

  return (
    <SafeAreaView style={style.container}>
      <ActivityLoader visible={isLoading} />
      <AlertModal
        msg={`We have added ${configData.config.dc} coins in your account as daily reward coins!`}
        isVisible={isRewardModal}
        onPressOK={() => setIsRewardModal(false)}
      />
      <Header
        // onPressLeftIcon={() => navigation.openDrawer()} lydiahxude
        onPressLeftIcon={() => drawerRef.current.open()}
        onPressDownIcon={() => setIsAddAccountModal(true)}
      />
      <View style={style.btnContainer}>
        <MainButton
          title={'GET\nFOLLOWERS'}
          icon={icons.people}
          onPress={() =>
            navigation.navigate('GetFollower', typeCampaign.follow)
          }
        />
        <MainButton
          onPress={() => navigation.navigate('GetFollower', typeCampaign.like)}
          icon={icons.heart}
          title={'GET\nLIKES'}
          containerStyle={{borderColor: colors.whiteGray}}
        />
        <MainButton
          onPress={() => navigation.navigate('GetFollower', typeCampaign.reel)}
          title={'GET REELS\nVIEW & LIKES'}
          icon={icons.reels}
        />
      </View>
      <View style={{height: wp(0.4), backgroundColor: colors.whiteGray}} />
      <EarnCoinsButton />
      <View style={{flex: 1, backgroundColor: colors.secondaryGary}}>
        <DesignTitle title={'YOUR COMPAIGNS'} />
        <FlatList
          style={{marginTop: -hp(2)}}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          data={compaignsList?.active?.slice(0, perPageData) || []}
          renderItem={({item, index}) => {
            return <CompaignsItem data={item} icon={icons.blackHeart} />;
          }}
          keyExtractor={(item, index) => item?._id?.$id}
        />
      </View>
      {/* {Add Account Modal} */}
      <AddAccountModal
        onPressAddAccount={onPressAddAccount}
        children={
          <FlatList
            data={usersList || []}
            renderItem={({item, index}) => {
              return (
                <AccountItem
                  item={item}
                  onPressItem={() => onPressUserName(item)}
                />
              );
            }}
          />
        }
        isVisible={isAddAccountModal}
        onCloseModal={() => setIsAddAccountModal(false)}
      />
      {/* {Add Instgarm Modal} */}
      <InstagramModal
        isVisible={isInstModal}
        closeModal={() => setIsInstModal(false)}
        onNavigationStateChange={onNavigationStateChange}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleTextStyle: {
    fontSize: wp(4.5),
    color: colors.black,
    textAlign: 'center',
    marginBottom: hp(1),
    fontFamily: fontFamily.saira_semiBold,
  },
  bottomShadow: {
    elevation: 5,
    height: hp(2),
    bottom: -hp(1),
    shadowOpacity: 1,
    shadowRadius: wp(1),
    shadowColor: colors.gray,
    borderColor: colors.white,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Compaigns;
