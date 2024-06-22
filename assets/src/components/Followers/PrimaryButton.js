import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

const PrimaryButton = ({
  containerStyle,
  titleStyle,
  btnTitle,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[style.container, containerStyle]}>
      <Text style={[style.btnTitleStyle, titleStyle]}>{btnTitle}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(3),
    alignItems: 'center',
    borderRightColor: colors.whiteGray,
  },
  btnTitleStyle: {
    fontSize: wp(4.2),
    color: colors.black,
    textTransform: 'capitalize',
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default PrimaryButton;
