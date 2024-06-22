import React from 'react';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';
import {hitSlop, hp, shadowStyle, wp} from '../../helper/constants';

const AddAccountModal = ({
  children,
  isVisible,
  onCloseModal,
  onPressAddAccount,
}) => {
  return (
    <Modal
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      isVisible={isVisible}>
      <View style={style.modalContainer}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            hitSlop={hitSlop}
            onPress={onCloseModal}
            style={style.closeContainer}>
            <Image
              resizeMode="contain"
              source={icons.close}
              style={style.closeIconStyle}
            />
          </TouchableOpacity>
          {children}
        </View>
        <TouchableOpacity
          onPress={onPressAddAccount}
          style={style.addAccountStyle}>
          <Image
            source={icons.add}
            resizeMode="contain"
            style={style.addIconStyle}
          />
          <Text style={style.addTextStyle}>{'Add Account'}</Text>
        </TouchableOpacity>
      </View>
      <Toast position="bottom" />
    </Modal>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    height: hp(80),
    backgroundColor: colors.white,
  },
  closeContainer: {
    padding: wp(2),
    alignSelf: 'flex-end',
  },
  closeIconStyle: {
    width: wp(4),
    height: wp(4),
  },
  addAccountStyle: {
    padding: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: wp(0.4),
    justifyContent: 'center',
    borderTopColor: colors.whiteGray,
  },
  addIconStyle: {
    width: wp(7),
    height: wp(7),
    marginRight: wp(2),
  },
  addTextStyle: {
    fontSize: wp(4.2),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default AddAccountModal;
