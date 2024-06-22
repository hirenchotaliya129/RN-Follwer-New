import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import {wp} from '../../helper/constants';
import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';

const EarnCoinsButton = () => {
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate('FollowEarn')}
      style={style.container}>
      <Image
        style={style.iconsStyle}
        resizeMode="contain"
        source={icons.coinPink}
      />
      <Text style={style.earnTextStyle}>{'Earn Free Coins'}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    margin: wp(4),
    padding: wp(3),
    alignItems: 'center',
    borderRadius: wp(4),
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: wp(4.5),
    backgroundColor: colors.primaryColor,
  },
  iconsStyle: {
    width: wp(8),
    height: wp(8),
    marginRight: wp(3),
    tintColor: '#FFD700',
  },
  earnTextStyle: {
    fontSize: wp(5),
    color: colors.white,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default EarnCoinsButton;
