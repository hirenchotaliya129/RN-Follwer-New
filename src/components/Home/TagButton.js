import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {hp, shadowStyle, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

const TagButton = ({icon, btnTitle, onPressButton}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPressButton}
      style={style.container}>
      <View style={style.innerContainer}>
        <Image style={style.iconStyle} resizeMode={'contain'} source={icon} />
        <Text style={style.titleTextStyle}>{btnTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: hp(2.5),
    alignSelf: 'center',
    marginBottom: hp(1),
  },
  innerContainer: {
    ...shadowStyle,
    width: wp(65),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(4.2),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: colors.white,
  },
  iconStyle: {
    height: wp(11),
    width: wp(11),
    marginRight: wp(5),
    marginLeft: wp(1),
  },
  titleTextStyle: {
    color: colors.black,
    fontSize: wp(4.2),
    letterSpacing: 0.5,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default TagButton;
