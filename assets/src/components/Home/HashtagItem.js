import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';

import {hp, shadowStyle, wp} from '../../helper/constants';
import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';
import {successTost} from '../../helper/global';

const CricleView = ({circleContainer, onPressCircle, icon, tintColor}) => {
  return (
    <TouchableOpacity
      onPress={onPressCircle}
      style={[style.cricleViewContainer, circleContainer]}>
      <Image
        resizeMode="contain"
        style={{height: wp(6), width: wp(6), tintColor: tintColor}}
        source={icon}
      />
    </TouchableOpacity>
  );
};

const HashtagItem = ({data, icon, tintColor, onPressEye}) => {
  const copyToClipboard = () => {
    if (data) {
      Clipboard.setString(data);
      successTost('Copied');
    }
  };

  const onPressShare = () => {
    if (data) {
      Share.open({message: data})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.textStyle}>{data}</Text>
      <View style={style.horizontalLine} />
      <View style={style.bottomContainer}>
        <CricleView
          onPressCircle={onPressEye}
          tintColor={tintColor}
          icon={icon || icons.eye}
        />
        <CricleView
          icon={icons.copy}
          circleContainer={{marginHorizontal: wp(8)}}
          onPressCircle={copyToClipboard}
        />
        <CricleView icon={icons.shareSecond} onPressCircle={onPressShare} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    ...shadowStyle,
    padding: wp(3),
    marginTop: hp(2.5),
    borderRadius: wp(4.2),
    marginHorizontal: wp(6),
    backgroundColor: colors.white,
  },
  textStyle: {
    fontSize: wp(4),
    textAlign: 'center',
    lineHeight: hp(2.6),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  horizontalLine: {
    borderWidth: wp(0.2),
    marginVertical: hp(1.5),
    marginHorizontal: wp(4),
    borderColor: colors.whiteGray,
  },
  bottomContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  cricleViewContainer: {
    ...shadowStyle,
    elevation: 3,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

export default HashtagItem;
