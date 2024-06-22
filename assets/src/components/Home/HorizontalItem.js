import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

const HorizontalItem = ({data, onPressItem}) => {
  return (
    <TouchableOpacity onPress={onPressItem} style={style.container}>
      <Text
        style={{
          ...style.textStyle,
          color: data.isSelected ? colors.primaryColor : colors.black,
        }}>
        {data.name}
      </Text>
      {data.isSelected && <View style={style.lineStyle} />}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
  },
  textStyle: {
    fontSize: wp(4),
    fontFamily: fontFamily.saira_semiBold,
  },
  lineStyle: {
    height: hp(0.6),
    borderRadius: wp(2),
    marginHorizontal: wp(3),
    marginVertical: hp(0.5),
    backgroundColor: colors.primaryColor,
  },
});

export default HorizontalItem;
