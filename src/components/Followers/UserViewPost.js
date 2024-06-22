import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';
import {redirectToInstgramPost} from '../../helper/globalFuncation';
import SendIntentAndroid from 'react-native-send-intent';

const UserViewPost = () => {
  const [userData, setUserData] = useState({});
  const {dashboard} = useSelector(state => state);
  const {userDetailsByPost} = dashboard;

  useEffect(() => {
    setUserData(userDetailsByPost?.shortcode_media);
  }, [userDetailsByPost]);

  const onPressView = () => {
    redirectToInstgramPost(userData?.shortcode);
  };

  return (
    <View style={style.container}>
      <Image
        resizeMode="cover"
        style={style.iconStyle}
        source={{uri: userData?.display_url}}
      />
      <Text style={style.nameTextStyle}>{userData?.shortcode || ''}</Text>
      <TouchableOpacity onPress={onPressView} style={style.viewContainer}>
        <Text style={{...style.nameTextStyle, color: colors.white}}>
          {'View'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(5),
    marginVertical: hp(1.5),
    marginHorizontal: wp(8),
    backgroundColor: colors.whiteGray,
  },
  iconStyle: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    marginHorizontal: wp(3),
  },
  nameTextStyle: {
    flex: 1,
    fontSize: wp(4),
    marginRight: wp(2),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  viewContainer: {
    height: hp(4),
    borderRadius: wp(4),
    marginRight: wp(4),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(4.5),
    backgroundColor: colors.primaryColor,
  },
});

export default UserViewPost;
