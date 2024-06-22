import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
// import * as RNIap from 'react-native-iap';

import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';
import {errorMsgToast, errorToast, successTost} from '../../helper/global';

import {
  hp,
  wp,
  status,
  hitSlop,
  TYPE_LIKE,
  messageText,
  shadowStyle,
  TYPE_FOLLOW,
  TYPE_REEL,
} from '../../helper/constants';
import {
  Header,
  UserViewItem,
  ActivityLoader,
  BuyItemView,
  UserViewPost,
} from '../../components';
import {
  buyCompaign,
  instUserDetailsByUn,
  instUserDetailsByUrlPost,
  setCoin,
} from '../../actions/dashboardAction';
import {tyepIcon} from '../../helper/globalFuncation';

const CricleView = ({icon, onPress}) => (
  <TouchableOpacity onPress={onPress} style={style.cricleContainer}>
    <Image resizeMode="contain" source={icon} style={style.iconStyle} />
  </TouchableOpacity>
);

const BuyFollowers = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {type, headerName, searchTitle, descText, data, listType} =
    route.params;

  const {dashboard, login} = useSelector(state => state);
  const {userDetails, currentUserInList, userDetailsByPost} = dashboard;
  const {deviceId, coin} = login;

  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleUserView, setIsVisibleUserView] = useState(false);

  // useEffect(() => {
  //   async function initIAP() {
  //     await RNIap.initConnection()
  //       .then(res => {
  //         // console.log('CONNET', res);
  //       })
  //       .catch(e => {
  //         // console.log('EEEE', e);
  //       });
  //   }
  //   return initIAP;
  // }, []);

  const inputSearch = string => {
    if (string?.trim()?.length) {
      let name = '';
      if (string.includes('https:')) {
        name = string?.split('?')?.[0].split('/')?.[3] || '';
      } else {
        name = string;
      }
      getInstUserDeatils(name);
    } else {
      errorMsgToast(messageText.INPUT_NULL_ERROR_FOLLOWER);
    }
  };

  const onPressPast = async () => {
    setIsVisibleUserView(false);
    const copyText = await Clipboard.getString();
    setText(copyText);
    if (type === TYPE_FOLLOW) {
      inputSearch(copyText);
    } else if (type === TYPE_LIKE || type === TYPE_REEL) {
      postAndReelsValidation(copyText);
    }
  };

  const onPressSearch = () => {
    setIsVisibleUserView(false);
    if (type === TYPE_FOLLOW) {
      inputSearch(text);
    } else if (type === TYPE_LIKE || type === TYPE_REEL) {
      postAndReelsValidation(text);
    }
  };

  const postAndReelsValidation = string => {
    if (string.length > 0) {
      if (string.includes('https:')) {
        getInstUserDeatilsByPost(string);
      } else {
        errorMsgToast(messageText.ENTER_VALID_URL);
      }
    } else {
      errorMsgToast(messageText.INPUT_NULL_ERROR_LIKE);
    }
  };

  const getInstUserDeatilsByPost = url => {
    setIsLoading(true);
    const request = {
      url: url,
      isPrivate: () => setIsLoading(false),
      loading: () => setIsLoading(false),
      onSuccess: () => {
        setIsLoading(false);
        setIsVisibleUserView(true);
      },
      onFail: () => {
        setIsLoading(false);
        errorToast();
        setIsVisibleUserView(false);
      },
    };
    dispatch(instUserDetailsByUrlPost(request));
  };

  const getInstUserDeatils = name => {
    setIsLoading(true);
    const request = {
      un: name.trim(),
      onSuccess: res => {
        setIsLoading(false);
        if (res?.graphql?.user?.is_private === true) {
          errorMsgToast(messageText.PRIVATE_USER);
        } else if (res?.graphql?.user?.is_private === false) {
          setIsVisibleUserView(true);
        } else {
          errorMsgToast(messageText.ENTER_VALID_URL);
        }
      },
      onFail: () => {
        setIsLoading(false);
        errorToast();
      },
    };
    dispatch(instUserDetailsByUn(request));
  };

  const onPressItem = async (item, index) => {
    console.log('item', item);
    if (type === TYPE_FOLLOW) {
      if (!isVisibleUserView) {
        errorMsgToast('Please enter username!');
      } else {
        // try {
        //   await RNIap.requestPurchase(item.s, false);
        // } catch (err) {
        //   console.warn(err.code, err.message);
        // }
      }
    } else if (type === TYPE_LIKE || type === TYPE_REEL) {
      if (!isVisibleUserView) {
        errorMsgToast('Please enter post url!');
      } else {
      }
    }
  };

  const buyCampaignApiCall = () => {
    let userData = userDetails?.graphql?.user;
    let userPostData = userDetailsByPost?.shortcode_media;
    let nm =
      type === TYPE_FOLLOW ? userData?.username : userPostData?.shortcode;
    let id = type === TYPE_FOLLOW ? userData?.id : userPostData?.id;
    let pc =
      type === TYPE_FOLLOW
        ? userData?.profile_pic_url
        : userPostData?.display_url;

    const data = new FormData();
    data.append('ty', type);
    data.append('nm', nm);
    data.append('id', id);
    data.append('pc', pc);
    data.append('tl', '');
    data.append('pi', '');
    data.append('tn', 'token');
    data.append('di', deviceId);
    data.append('api', api.appKey);

    const obj = {
      data: data,
      onSuccess: res => {
        if (res?.success === status.success) {
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
    dispatch(buyCompaign(obj));
  };

  return (
    <SafeAreaView style={style.container}>
      <ActivityLoader visible={isLoading} />
      <Header
        leftIcon={icons.back}
        centerTitle={headerName}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <View style={style.inputContainer}>
        <TextInput
          value={text}
          numberOfLines={1}
          style={style.inputStyle}
          onChangeText={t => setText(t)}
          placeholderTextColor={colors.black}
          placeholder={searchTitle}
        />
        <CricleView icon={icons.copy} onPress={onPressPast} />
        <CricleView icon={icons.serach} onPress={onPressSearch} />
      </View>

      <View style={style.grayLineStyle} />

      {isVisibleUserView && (
        <>
          {type === TYPE_FOLLOW && <UserViewItem />}
          {(type === TYPE_LIKE || type === TYPE_REEL) && <UserViewPost />}
        </>
      )}

      <Text style={style.descTextStyle}>{descText}</Text>
      <FlatList
        style={{marginTop: hp(2)}}
        data={data}
        renderItem={({item, index}) => {
          return (
            <BuyItemView
              coin={item.a}
              type={listType}
              typeNumber={item.n}
              wrongTypeNumber={item.o}
              onPressItem={() => onPressItem(item)}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  rowStyle: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(4),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coinIconStyle: {
    width: wp(5),
    height: wp(5),
    marginVertical: hp(0.5),
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    height: hp(6),
    fontSize: wp(3.5),
    borderRadius: wp(4.5),
    borderWidth: wp(0.5),
    paddingHorizontal: wp(4.5),
    borderColor: colors.primaryColor,
    backgroundColor: colors.whiteGray,
    fontFamily: fontFamily.saira_semiBold,
  },
  iconStyle: {
    width: wp(6),
    height: wp(6),
    tintColor: colors.white,
  },
  cricleContainer: {
    width: hp(5.6),
    height: hp(5.6),
    marginLeft: wp(1.5),
    alignItems: 'center',
    borderRadius: hp(2.8),
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
  },
  userNameTextStyle: {
    fontSize: wp(4),
    color: colors.black,
    marginBottom: hp(1),
    marginHorizontal: wp(4),
    fontFamily: fontFamily.saira_semiBold,
  },
  grayLineStyle: {
    height: wp(0.4),
    marginBottom: hp(1.2),
    backgroundColor: colors.whiteGray,
  },
  descTextStyle: {
    color: '#C0C0C0',
    fontSize: wp(4),
    lineHeight: hp(2.5),
    textAlign: 'center',
    marginHorizontal: wp(4),
    fontFamily: fontFamily.saira_semiBold,
  },
  postContainer: {
    width: wp(23),
    height: hp(3.5),
    borderRadius: wp(4),
    alignItems: 'center',
    marginBottom: hp(0.7),
    marginHorizontal: wp(4),
    justifyContent: 'center',
    paddingHorizontal: wp(3),
    backgroundColor: colors.whiteGray,
  },
  postText: {
    fontSize: wp(3.8),
    color: colors.primaryColor,
    fontFamily: fontFamily.saira_semiBold,
  },
  boxStyle: {
    ...shadowStyle,
    borderRadius: wp(4),
    marginVertical: hp(2),
    marginHorizontal: wp(3),
  },
  boxTextStyle: {
    fontSize: wp(4),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  coinContainer: {
    padding: wp(1),
    alignItems: 'center',
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    backgroundColor: colors.offWhite,
  },
  btnContainer: {
    padding: wp(4),
    marginTop: hp(1),
    flexDirection: 'row',
  },
});

export default BuyFollowers;
