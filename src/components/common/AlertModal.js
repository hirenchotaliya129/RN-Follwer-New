import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

const AlertModal = ({msg, isVisible, onPressOK}) => {
  return (
    <Modal
      animationIn={'bounceIn'}
      animationOut={'bounceOut'}
      isVisible={isVisible}>
      <View style={style.modalContainer}>
        <Text style={style.textStyle}>{msg}</Text>
        <TouchableOpacity onPress={onPressOK} style={style.btnStyle}>
          <Text style={style.okText}>{'Ok'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalContainer: {
    padding: wp(4),
    borderRadius: wp(6),
    backgroundColor: colors.white,
  },
  textStyle: {
    fontSize: wp(4),
    textAlign: 'center',
    color: colors.black,
    marginVertical: hp(1),
    fontFamily: fontFamily.saira_semiBold,
  },
  btnStyle: {
    padding: wp(1),
    marginTop: hp(1.5),
    borderRadius: wp(3),
    alignSelf: 'center',
    paddingHorizontal: wp(8),
    backgroundColor: colors.primaryColor,
  },
  okText: {
    fontSize: wp(4),
    color: colors.white,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default AlertModal;
