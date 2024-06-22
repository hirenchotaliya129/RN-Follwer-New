import React from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';
import {
  getCompaignsIcon,
  redirectToInstgram,
  redirectToInstgramPost,
} from '../../helper/globalFuncation';
import {hp, shadowStyle, TYPE_FOLLOW, wp} from '../../helper/constants';

const CompaignsItem = ({data}) => {
  const onPressItem = () => {
    if (data.type === TYPE_FOLLOW) {
      redirectToInstgram(data?.name);
    } else {
      redirectToInstgramPost(data?.name);
    }
  };
  return (
    <TouchableOpacity onPress={onPressItem} style={style.conatiner}>
      <View style={style.postionIconStyle}>
        <Image
          resizeMode="contain"
          style={style.iconStyle}
          source={getCompaignsIcon(data?.type)}
        />
      </View>
      <View style={style.rowStyle}>
        <View style={style.avtarContainer}>
          {TYPE_FOLLOW === data?.type ? (
            <Text numberOfLines={1} style={style.instaIdTextStyle}>
              {data?.name}
            </Text>
          ) : (
            <>
              {data.pic.length ? (
                <Image
                  resizeMode="cover"
                  source={{uri: data?.pic}}
                  style={style.avtarStyle}
                />
              ) : (
                <Image
                  style={style.defaultIcon}
                  resizeMode="contain"
                  source={icons.peoplePink}
                />
              )}
            </>
          )}
        </View>
        <View style={style.rightContainer}>
          <View>
            <Text style={style.idTextStyle}>{`Order ID: ${
              data?.orderId || ''
            }`}</Text>
            {data?.date ? (
              <Text style={style.dateTextStyle}>
                {moment(data?.date).format('DD/MM/YYYY')}
              </Text>
            ) : null}
          </View>
          <View>
            {data?.total == data?.gain ? (
              <Image
                resizeMode="contain"
                source={icons.greenTrue}
                style={{...style.iconStyle, alignSelf: 'center'}}
              />
            ) : (
              <View style={style.iconStyle} />
            )}

            <View style={style.countStyle}>
              <Text style={style.countTextStyle}>{`${data?.gain} / ${
                data?.total || 0
              }`}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  conatiner: {
    ...shadowStyle,
    padding: wp(3),
    marginTop: hp(3.8),
    marginBottom: hp(1),
    borderRadius: wp(4.2),
    marginHorizontal: wp(4),
    paddingVertical: hp(2.2),
    backgroundColor: colors.white,
  },
  postionIconStyle: {
    top: -wp(5),
    width: wp(10),
    height: wp(10),
    alignSelf: 'center',
    borderRadius: wp(5),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteGray,
  },
  instaIdTextStyle: {
    fontSize: wp(4),
    color: colors.primaryColor,
    fontFamily: fontFamily.saira_semiBold,
  },
  avtarContainer: {
    width: wp(20),
    height: wp(14),
    justifyContent: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    height: wp(4.5),
    width: wp(4.5),
  },
  avtarStyle: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    marginHorizontal: wp(2),
    backgroundColor: colors.whiteGray,
  },
  rightContainer: {
    flex: 1,
    marginLeft: wp(2),
    flexDirection: 'row',
    borderLeftWidth: wp(0.3),
    justifyContent: 'space-between',
    borderLeftColor: colors.whiteGray,
  },
  idTextStyle: {
    marginTop: hp(1),
    marginLeft: wp(4),
    fontSize: wp(4.1),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  dateTextStyle: {
    fontSize: wp(3),
    marginLeft: wp(4),
    color: colors.gray,
    fontFamily: fontFamily.saira_semiBold,
  },
  countStyle: {
    marginTop: hp(0.8),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.1),
    backgroundColor: colors.whiteGray,
  },
  countTextStyle: {
    fontSize: wp(4),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  defaultIcon: {
    width: wp(8),
    height: wp(8),
    alignSelf: 'center',
  },
});

export default CompaignsItem;
