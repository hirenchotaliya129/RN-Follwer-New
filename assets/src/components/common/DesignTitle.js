import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

const DesignTitle = ({title}) => {
  return (
    <View style={style.container}>
      <View style={style.line} />
      <Text style={style.titleTextStyle}>{title}</Text>
      <View style={style.line} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp(1),
  },
  titleTextStyle: {
    textAlign: 'center',
    fontSize: wp(5),
    color: colors.black,
    marginVertical: hp(1),
    fontFamily: fontFamily.saira_semiBold,
  },
  line: {
    width: wp(7),
    height: hp(0.4),
    marginHorizontal: wp(4),
    backgroundColor: colors.primaryColor,
  },
});

export default DesignTitle;
