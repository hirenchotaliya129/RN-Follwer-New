import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {hp, wp} from '../../helper/constants';
import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';

const AccountItem = ({item, onPressItem}) => {
  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={{
        ...style.container,
        backgroundColor: item?.isSelected
          ? colors.primaryColor
          : colors.whiteGray,
      }}>
      <View
        style={{
          ...style.circleContainer,
          backgroundColor: item?.isSelected
            ? colors.secondaryPrimary
            : colors.white,
        }}>
        <Image
          style={style.avtarStyle}
          resizeMode="contain"
          source={item?.isSelected ? icons.peopleWhite : icons.peoplePink}
        />
      </View>
      <Text
        style={{
          ...style.textStyle,
          color: item?.isSelected ? colors.white : colors.black,
        }}>
        {item?.un}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    padding: wp(2),
    marginTop: hp(2),
    borderRadius: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    paddingVertical: hp(1.2),
    backgroundColor: colors.whiteGray,
  },
  circleContainer: {
    width: wp(10),
    height: wp(10),
    marginLeft: wp(3),
    marginRight: wp(4),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avtarStyle: {
    width: wp(4),
    height: wp(4),
  },
  textStyle: {
    fontSize: wp(4.2),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default AccountItem;
