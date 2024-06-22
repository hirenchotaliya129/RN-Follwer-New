import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

const AdsButton = ({title, btnTitle, coins, source, onPressBtn, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPressBtn}
      style={style.container}>
      <Text style={style.titleText}>{title}</Text>
      <Image resizeMode="contain" source={source} style={style.iconStyle} />
      <Text style={style.coinText}>{`+${coins} Coins`}</Text>
      <View style={style.bottomBtnStyle}>
        <Text style={style.btnText}>{btnTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: wp(40),
    borderRadius: wp(5),
    backgroundColor: colors.white,
  },
  titleText: {
    marginTop: hp(1.5),
    fontSize: wp(3.8),
    textAlign: 'center',
    fontFamily: fontFamily.saira_semiBold,
  },
  iconStyle: {
    height: wp(8),
    width: wp(8),
    alignSelf: 'center',
    marginVertical: hp(1.2),
    tintColor: colors.primaryColor,
  },
  coinText: {
    fontSize: wp(3.5),
    color: colors.primaryColor,
    fontFamily: fontFamily.saira_semiBold,
    textAlign: 'center',
  },
  bottomBtnStyle: {
    height: hp(4.5),
    marginTop: hp(0.8),
    justifyContent: 'center',
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    backgroundColor: colors.primaryColor,
  },
  btnText: {
    fontSize: wp(4.2),
    textAlign: 'center',
    color: colors.white,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default AdsButton;
