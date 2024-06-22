import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

import {hp, shadowStyle, wp} from '../../helper/constants';
import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';

const BuyItemView = ({
  type,
  coin,
  source,
  iconStyle,
  coinNumber,
  typeNumber,
  onPressItem,
  wrongTypeNumber,
}) => {
  return (
    <TouchableOpacity onPress={onPressItem} style={style.container}>
      <View style={style.innerContainer}>
        <Image
          resizeMode="contain"
          source={source || icons.peoplePink}
          style={[style.avtarStyle, iconStyle]}
        />
        {wrongTypeNumber ? (
          <Text style={style.wrongFollowerTextStyle}>{wrongTypeNumber}</Text>
        ) : null}
        {typeNumber ? (
          <Text style={style.rightFollowerTextStyle}>{` (${
            typeNumber || 0
          }) `}</Text>
        ) : null}
        {coinNumber ? (
          <Text style={style.rightFollowerTextStyle}>{` ${
            coinNumber || 0
          } `}</Text>
        ) : null}

        <Text numberOfLines={1} style={style.typeTextStyle}>
          {type}
        </Text>
      </View>
      <View style={style.coinContainer}>
        <Text style={style.coinTextStyle}>{coin}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    ...shadowStyle,
    padding: wp(2),
    borderRadius: wp(4),
    flexDirection: 'row',
    marginBottom: hp(2.5),
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
  },
  avtarStyle: {
    height: wp(5),
    width: wp(5),
    marginHorizontal: wp(2),
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrongFollowerTextStyle: {
    fontSize: wp(3.8),
    marginLeft: wp(2),
    color: colors.black,
    textDecorationLine: 'line-through',
    fontFamily: fontFamily.saira_semiBold,
  },
  rightFollowerTextStyle: {
    fontSize: wp(3.8),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  typeTextStyle: {
    flex: 1,
    fontSize: wp(4),
    color: colors.black,
    marginHorizontal: wp(2),
    fontFamily: fontFamily.saira_semiBold,
  },
  coinContainer: {
    width: wp(26),
    padding: wp(1.3),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },
  coinTextStyle: {
    fontSize: wp(4),
    color: colors.white,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default BuyItemView;
