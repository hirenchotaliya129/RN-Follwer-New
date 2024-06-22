import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {MainHeader} from '../../components';
import {hp, wp} from '../../helper/constants';
import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';

const BiosPreview = ({navigation, route}) => {
  const {item} = route?.params;

  const ItemView = ({count, name}) => (
    <TouchableOpacity style={style.avtarContainer}>
      <Text style={style.numberText}>{count}</Text>
      <Text style={style.subText}>{name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={style.container}>
      <MainHeader
        headerTitle={'Bios Preview'}
        containerStyle={{borderBottomWidth: 0}}
        onPressLeftIcon={() => navigation.goBack()}
      />
      <View style={style.mainContainer}>
        <View style={style.avtarContainer}>
          <Image
            resizeMode="contain"
            source={icons.defualtAvtar}
            style={style.avtarIconStyle}
          />
        </View>
        <View style={style.followerContainer}>
          <ItemView count={'11.5K'} name={'Posts'} />
          <ItemView count={'225K'} name={'Followers'} />
          <ItemView count={'27'} name={'Following'} />
        </View>
      </View>
      <Text style={style.nameText}>{'Bios Preview'}</Text>
      <Text style={style.biosText}>{item?.b || ''}</Text>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  avtarContainer: {
    alignItems: 'center',
  },
  avtarIconStyle: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(11),
    tintColor: colors.primaryColor,
  },
  nameText: {
    fontSize: wp(4),
    color: colors.black,
    marginHorizontal: wp(4),
    fontFamily: fontFamily.saira_semiBold,
  },
  numberText: {
    fontSize: wp(4),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  subText: {
    color: '#989898',
    fontSize: wp(3.8),
    fontFamily: fontFamily.saira_semiBold,
  },
  followerContainer: {
    flex: 1,
    marginLeft: wp(10),
    marginRight: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  biosText: {
    marginTop: hp(1),
    fontSize: wp(3.8),
    color: colors.black,
    marginHorizontal: wp(4),
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default BiosPreview;
