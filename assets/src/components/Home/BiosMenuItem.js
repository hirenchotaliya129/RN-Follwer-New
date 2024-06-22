import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

const BiosMenuItem = ({item, label, onPressItem}) => {
  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={{
        ...style.container,
        borderLeftWidth: item?.isBorder ? wp(0.5) : 0,
        borderRightWidth: item?.isBorder ? wp(0.5) : 0,
      }}>
      <Text
        style={{
          ...style.titleTextStyle,
          color: item.isSelected ? colors.primaryColor : colors.black,
        }}>
        {item[label]}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: hp(1.2),
    paddingVertical: hp(0.8),
    borderColor: colors.whiteGray,
  },
  titleTextStyle: {
    fontSize: wp(4.2),
    textAlign: 'center',
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default BiosMenuItem;
