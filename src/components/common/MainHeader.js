import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';
import {hitSlop, hp, wp} from '../../helper/constants';

const MainHeader = ({
  onPressDot,
  headerTitle,
  onPressSearch,
  containerStyle,
  onPressLeftIcon,
  rightIconVisible,
}) => {
  return (
    <View style={[style.container, containerStyle]}>
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onPressLeftIcon}
        style={style.leftContainer}>
        <Image
          source={icons.back}
          resizeMode={'contain'}
          style={style.leftIconStyle}
        />
      </TouchableOpacity>

      <View style={style.centerContainer}>
        <Text style={style.centerTextStyle}>{headerTitle}</Text>
      </View>
      {rightIconVisible && (
        <>
          <TouchableOpacity onPress={onPressDot} style={style.rightContainer}>
            <Image
              source={icons.dotThree}
              resizeMode={'contain'}
              style={style.leftIconStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPressSearch}
            style={{...style.rightContainer, right: wp(12)}}>
            <Image
              source={icons.serach}
              resizeMode={'contain'}
              style={style.leftIconStyle}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: hp(6.5),
    justifyContent: 'center',
    borderBottomWidth: wp(0.4),
    backgroundColor: colors.white,
    borderBottomColor: colors.whiteGray,
  },
  leftContainer: {
    left: wp(4),
    position: 'absolute',
  },
  leftIconStyle: {
    width: wp(6),
    height: wp(6),
  },
  centerContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  centerTextStyle: {
    fontSize: wp(4.5),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  centerDownIconStyle: {
    width: wp(6),
    height: wp(6),
    marginLeft: wp(1),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteGray,
  },
  downIconStyle: {
    width: wp(3),
    height: wp(3),
  },
  rightContainer: {
    right: wp(4),
    position: 'absolute',
  },
  rightTextStyle: {
    fontSize: wp(3.6),
    fontWeight: '700',
    color: colors.white,
    marginHorizontal: wp(2),
  },
});

export default MainHeader;
