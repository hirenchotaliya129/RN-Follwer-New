import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

const MainButton = ({title, containerStyle, icon, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style.container, containerStyle]}>
      <Image resizeMode="contain" style={style.iconsStyle} source={icon} />
      <Text numberOfLines={2} style={style.titleTextStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderStyle: 'dashed',
    marginVertical: hp(1.5),
    borderLeftWidth: wp(0.4),
    borderRightWidth: wp(0.4),
    borderColor: colors.white,
  },
  iconsStyle: {
    width: wp(6.5),
    height: wp(6.5),
    marginBottom: hp(1.3),
  },
  titleTextStyle: {
    lineHeight: hp(2.3),
    fontSize: wp(4),
    textAlign: 'center',
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default MainButton;
