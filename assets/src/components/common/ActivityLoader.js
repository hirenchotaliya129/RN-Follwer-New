import React from 'react';
import {StyleSheet, View, Modal, Image, ActivityIndicator} from 'react-native';
import {wp} from '../../helper/constants';
import {colors} from '../../helper/utils';

const ActivityLoader = ({visible = false}) => {
  if (!visible) return null;
  return (
    <Modal visible={true} transparent={true}>
      <View style={style.containerStyle}>
        <ActivityIndicator
          style={style.loaderStyle}
          size={'large'}
          color={colors.primaryColor}
        />
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  loaderStyle: {
    padding: wp(4),
    backgroundColor: colors.white,
    borderRadius: wp(2),
  },
});

export default ActivityLoader;
