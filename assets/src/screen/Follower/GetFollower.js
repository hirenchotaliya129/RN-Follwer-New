import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
import {useDispatch, useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {api} from '../../helper/apiConstants';
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
  typeBuy,
} from '../../helper/constants';
import {
  Header,
  UserViewItem,
  PrimaryButton,
  ActivityLoader,
  UserViewPost,
} from '../../components';
import {
  setCoin,
  createCompaign,
  getCompaignsList,
  instUserDetailsByUn,
  instUserDetailsByUrlPost,
} from '../../actions/dashboardAction';

const CricleView = ({icon, onPress}) => (
  <TouchableOpacity onPress={onPress} style={style.cricleContainer}>
    <Image resizeMode="contain" source={icon} style={style.iconStyle} />
  </TouchableOpacity>
);

const GetFollower = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {
    type,
    type_coin,
    headerName,
    atleast,
    buyButtonTitle,
    descText,
    searchTitle,
  } = route.params;

  const {dashboard, login} = useSelector(state => state);
  const {userDetails, currentUserInList, userDetailsByPost} = dashboard;
  const {deviceId, coin} = login;

  const [text, setText] = useState('');
  const [value, setValue] = useState(0);
  const [numberOfFlw, setNumberOfFlw] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleUserView, setIsVisibleUserView] = useState(false);

  let isButtonEnble =
    isVisibleUserView && value !== 0 && numberOfFlw >= atleast;

  useEffect(() => {
    setValue(parseInt(coin / type_coin) * type_coin);
    setNumberOfFlw(parseInt(coin / type_coin));
  }, []);

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
      loading: () => setIsLoading(false),
      isPrivate: () => setIsLoading(false),
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

  const onPressName = () => {
    setIsVisibleUserView(false);
    setText(currentUserInList?.un);
    getInstUserDeatils(currentUserInList?.un);
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

  const getCompaignsApiCall = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('api', api.appKey);
    data.append('di', deviceId);

    const obj = {
      data: data,
      onSuccess: ress => {
        setIsLoading(false);
        successTost('Your compaigns successfully created.');
        navigation.goBack();
      },
      onFail: () => {
        setIsLoading(false);
        errorToast();
      },
    };
    dispatch(getCompaignsList(obj));
  };

  const onPressCreateCompaign = () => {
    setIsLoading(true);
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
    data.append('cc', value);
    data.append('tl', numberOfFlw);
    data.append('di', deviceId);
    data.append('pk', currentUserInList.pk);
    data.append('api', api.appKey);

    const obj = {
      data: data,
      onSuccess: res => {
        if (res?.success === status.success) {
          dispatch(setCoin(res?.data?.coin || 0));
          getCompaignsApiCall();
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
    dispatch(createCompaign(obj));
  };

  const onChangeSliderValue = number => {
    setValue(parseInt(number / type_coin) * type_coin);
    setNumberOfFlw(parseInt(number / type_coin));
  };

  const onPressMyPost = () => {
    navigation.navigate('MyPost', {
      getPostItem: res => {
        let url = `https://www.instagram.com/p/${res?.node?.shortcode}/?utm_medium=copy_link`;
        getInstUserDeatilsByPost(url);
      },
    });
  };

  const onPressBuy = () => {
    if (type === TYPE_FOLLOW) {
      navigation.navigate('BuyFollowers', typeBuy.follow);
    } else if (type === TYPE_LIKE) {
      navigation.navigate('BuyFollowers', typeBuy.like);
    } else if (type === TYPE_REEL) {
      navigation.navigate('BuyFollowers', typeBuy.reel);
    }
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

      {type === TYPE_FOLLOW && (
        <Text onPress={onPressName} style={style.userNameTextStyle}>
          {currentUserInList?.un}
        </Text>
      )}

      {type === TYPE_LIKE && (
        <TouchableOpacity onPress={onPressMyPost} style={style.postContainer}>
          <Text style={style.postText}>{'My Post'}</Text>
        </TouchableOpacity>
      )}

      <View style={style.grayLineStyle} />

      {isVisibleUserView && (
        <>
          {type === TYPE_FOLLOW && <UserViewItem />}
          {(type === TYPE_LIKE || type === TYPE_REEL) && <UserViewPost />}
        </>
      )}

      <Text style={style.descTextStyle}>{descText}</Text>
      <View style={style.boxStyle}>
        <View style={style.rowStyle}>
          <View style={{flex: 1}}>
            <Text
              style={
                style.boxTextStyle
              }>{`Number of Followers : ${numberOfFlw}`}</Text>
            <Text
              style={{
                ...style.boxTextStyle,
                color: numberOfFlw >= atleast ? colors.green : 'red',
              }}>{`Must be Atleast : ${atleast}`}</Text>
          </View>
          <View style={style.coinContainer}>
            <Image source={icons.coin} style={style.coinIconStyle} />
            <Text
              style={{
                ...style.boxTextStyle,
                fontSize: wp(3.5),
              }}>{`${parseInt(value)}/${coin}`}</Text>
          </View>
        </View>
        <Slider
          value={value}
          minimumValue={0}
          step={type_coin}
          hitSlop={hitSlop}
          maximumValue={parseInt(coin / type_coin) * type_coin || 0}
          thumbImage={icons.sliderDot}
          thumbTintColor={colors.primaryColor}
          onValueChange={onChangeSliderValue}
          maximumTrackTintColor={colors.whiteGray}
          minimumTrackTintColor={colors.primaryColor}
          style={{marginTop: hp(2), marginBottom: hp(1)}}
          tapToSeek={true}
        />
        <View style={style.btnContainer}>
          <PrimaryButton
            disabled={!isButtonEnble}
            onPress={onPressCreateCompaign}
            btnTitle={'Create Compaign'}
            containerStyle={{borderRightWidth: wp(0.4)}}
            titleStyle={{
              color: isButtonEnble
                ? colors.primaryColor
                : colors.whitePrimaryColor,
              fontSize: wp(4.5),
            }}
          />
          <PrimaryButton
            onPress={onPressBuy}
            btnTitle={buyButtonTitle}
            titleStyle={{fontSize: wp(4.5)}}
          />
        </View>
      </View>
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

export default GetFollower;
