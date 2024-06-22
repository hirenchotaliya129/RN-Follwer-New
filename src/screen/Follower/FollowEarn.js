import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {getCompaign} from '../../actions';
import {api} from '../../helper/apiConstants';
import {configData} from '../../helper/config';
import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';
import {earnTypeCoin} from '../../helper/globalFuncation';
import {hp, shadowStyle, wp} from '../../helper/constants';
import {ActivityLoader, Header, PrimaryButton} from '../../components';
import {errorToast} from '../../helper/global';

const FollowEarn = ({navigation}) => {
  const dispatch = useDispatch();

  const {login, dashboard, common} = useSelector(state => state);
  const {currentUserInList} = dashboard;
  const {deviceId} = login;
  const {compaignObj} = common;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCompaignApiCall();
  }, []);

  const getCompaignApiCall = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('di', deviceId);
    data.append('pk', currentUserInList?.pk);
    data.append('api', api.appKey);

    const obj = {
      data: data,
      onSuccess: () => {
        setIsLoading(false);
      },
      onFail: () => {
        setIsLoading(false);
        errorToast();
      },
    };
    dispatch(getCompaign(obj));
  };

  const onPressSkip = () => {
    getCompaignApiCall();
  };

  const onPressType = () => {};

  return (
    <SafeAreaView style={style.container}>
      <ActivityLoader visible={isLoading} />
      <View style={{flex: 1}}>
        <Header
          leftIcon={icons.back}
          onPressLeftIcon={() => navigation.goBack()}
          centerTitle={'Follow & Earn'}
          containerStyle={{borderBottomWidth: wp(0.4)}}
        />
        <View style={style.profileContainer}>
          <View style={style.profile}>
            <Image
              resizeMode="cover"
              style={style.avtarStyle}
              // defaultSource={icons.defualtAvtar}
              source={{uri: compaignObj?.pic}}
            />
            <Text style={style.nameTextStyle}>{compaignObj?.name || '-'}</Text>
          </View>
          <View style={style.coinViewStyle}>
            <Image
              style={style.coinIconStyle}
              resizeMode="contain"
              source={icons.coin}
            />
            <Text style={style.coinText}>{`+${
              earnTypeCoin(compaignObj?.type, configData?.config) || 0
            }`}</Text>
          </View>
          <View style={style.btnView}>
            <PrimaryButton
              onPress={onPressType}
              btnTitle={compaignObj?.type || '-'}
              containerStyle={{borderRightWidth: wp(0.4)}}
              titleStyle={{color: colors.primaryColor, fontSize: wp(5)}}
            />
            <PrimaryButton onPress={onPressSkip} btnTitle={'Skip'} />
          </View>
        </View>

        <TouchableOpacity style={style.addBtnContainer}>
          <Image
            resizeMode="contain"
            style={style.youTubeIconStyle}
            source={icons.youtube}
          />
          <Text style={style.addTextStyle}>{'Watch Video AD '}</Text>
          <Image
            resizeMode="contain"
            style={style.coinIconStyle}
            source={icons.coin}
          />
          <Text style={style.addTextStyle}>{' +100'}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          backgroundColor: colors.white,
        }}></View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    ...shadowStyle,
    padding: wp(3),
    borderRadius: wp(4),
    marginVertical: hp(8),
    marginHorizontal: wp(5),
  },
  profile: {
    top: -hp(5),
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avtarStyle: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: colors.whiteGray,
  },
  nameTextStyle: {
    fontSize: wp(4.2),
    color: colors.black,
    marginVertical: hp(1),
    fontFamily: fontFamily.saira_semiBold,
  },
  coinViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  coinIconStyle: {
    width: wp(5),
    height: wp(5),
  },
  coinText: {
    fontSize: wp(4.2),
    color: colors.black,
    marginHorizontal: wp(1),
    fontFamily: fontFamily.saira_semiBold,
  },
  btnView: {
    flexDirection: 'row',
    marginTop: hp(9),
    marginBottom: hp(2),
  },
  btnContainer: {
    flex: 1,
    padding: wp(3),
    alignItems: 'center',
    borderRightColor: colors.whiteGray,
  },
  btnTitleStyle: {
    fontSize: wp(4.2),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  addBtnContainer: {
    ...shadowStyle,
    padding: wp(3),
    borderRadius: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(8),
    paddingHorizontal: wp(8),
  },
  youTubeIconStyle: {
    width: wp(10),
    height: wp(10),
    marginRight: wp(4),
  },
  addTextStyle: {
    fontSize: wp(4),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default FollowEarn;
