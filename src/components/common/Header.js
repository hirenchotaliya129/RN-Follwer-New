import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {icons} from '../../helper/iconsConstant';
import {setLocalItem} from '../../helper/global';
import {colors, fontFamily} from '../../helper/utils';
import {hitSlop, hp, localStorageKeys, wp} from '../../helper/constants';

const Header = ({
  disabled,
  leftIcon,
  centerTitle,
  containerStyle,
  onPressDownIcon,
  onPressLeftIcon,
}) => {
  const {login, dashboard} = useSelector(state => state);
  const {coin} = login;
  const {currentUserInList} = dashboard;
  const {navigate} = useNavigation();

  const onPressCoin = () => {
    setLocalItem(localStorageKeys.isClickFollow, 'false');
    navigate('Store');
  };

  return (
    <View style={[style.container, containerStyle]}>
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onPressLeftIcon}
        style={style.leftContainer}>
        <Image
          source={leftIcon || icons.menu}
          resizeMode={'contain'}
          style={style.leftIconStyle}
        />
      </TouchableOpacity>

      {centerTitle ? (
        <View style={style.centerContainer}>
          <Text style={style.centerTextStyle}>{centerTitle}</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onPressDownIcon}
          style={style.centerContainer}>
          <Text style={style.centerTextStyle}>
            {currentUserInList.un || ''}
          </Text>
          <View style={style.centerDownIconStyle}>
            <Image
              resizeMode="contain"
              source={icons.down}
              style={style.downIconStyle}
            />
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={onPressCoin}
        disabled={disabled}
        style={style.rightContainer}>
        <Image
          source={icons.coin}
          resizeMode={'contain'}
          style={style.leftIconStyle}
        />
        <Text style={style.rightTextStyle}>{coin || 0}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: hp(6.5),
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.whiteGray,
  },
  leftContainer: {
    left: wp(4),
    position: 'absolute',
  },
  leftIconStyle: {
    height: wp(6),
    width: wp(6),
  },
  centerContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
    right: 0,
    padding: wp(0.8),
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    borderTopLeftRadius: wp(4),
    borderBottomLeftRadius: wp(4),
    backgroundColor: colors.primaryColor,
  },
  rightTextStyle: {
    fontSize: wp(3.6),
    color: colors.white,
    marginHorizontal: wp(2),
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default Header;
