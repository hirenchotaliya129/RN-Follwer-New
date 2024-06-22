import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet} from 'react-native';

import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';

const HeaderModal = ({title, headerModalContainer}) => (
  <View style={[style.headerModalContainer, headerModalContainer]}>
    <Text style={style.headerTitle}>{title}</Text>
  </View>
);

const BiosMenuModal = ({
  isVisible,
  onCloseModal,
  categoryView,
  languageView,
}) => {
  return (
    <Modal
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      isVisible={isVisible}>
      <View style={{backgroundColor: colors.white, padding: wp(4)}}>
        <HeaderModal title={'CATEGORY'} />
        {categoryView}
        <HeaderModal
          headerModalContainer={{marginTop: hp(3)}}
          title={'LANGUAGE'}
        />
        {languageView}
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  headerModalContainer: {
    padding: wp(2),
    marginBottom: hp(2),
    alignSelf: 'center',
    borderRadius: wp(4.5),
    paddingHorizontal: wp(6),
    backgroundColor: colors.whiteGray,
  },
  headerTitle: {
    fontSize: wp(5),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default BiosMenuModal;
