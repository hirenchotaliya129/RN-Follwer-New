import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';
import {hp, shadowStyle, wp} from '../../helper/constants';

const ItemView = ({icon, title}) => {
  return (
    <TouchableOpacity style={style.itemViewStyle}>
      <View style={{width: wp(15), alignItems: 'center'}}>
        <Image source={icon} resizeMode="contain" style={style.iconStyle} />
      </View>
      <Text style={style.itemTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const EarnModal = ({isVisible, onCloseModal}) => {
  return (
    <Modal
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      isVisible={isVisible}>
      <View style={style.modalContainer}>
        <ItemView title={'FOLLOWERS'} icon={icons.people} />
        <ItemView title={'LIKE'} icon={icons.heart} />
        <ItemView title={'REELS'} icon={icons.reels} />
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    padding: wp(4),
    backgroundColor: colors.white,
    marginHorizontal: wp(8),
    paddingVertical: hp(4),
  },
  itemViewStyle: {
    ...shadowStyle,
    width: wp(60),
    alignSelf: 'center',
    borderRadius: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1.4),
    paddingVertical: hp(1.5),
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  itemTextStyle: {
    fontSize: wp(4),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
    flex: 1,
  },
  iconStyle: {
    height: wp(6.5),
    width: wp(6.5),
    marginLeft: wp(2),
  },
});

export default EarnModal;
