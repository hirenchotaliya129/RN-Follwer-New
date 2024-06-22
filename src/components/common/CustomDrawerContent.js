import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {hp, wp} from '../../helper/constants';
import {colors, fontFamily} from '../../helper/utils';
import {icons, images} from '../../helper/iconsConstant';

const DrawerItem = ({name, onPressItem, icon}) => (
  <TouchableOpacity onPress={onPressItem} style={style.drawerItemConatiner}>
    <Text style={style.titleTextStyle}>{name}</Text>
    <Image resizeMode={'contain'} style={style.iconStyle} source={icon} />
  </TouchableOpacity>
);

const CustomDrawerContent = () => {
  const {dashboard} = useSelector(state => state);
  const {currentUserInList} = dashboard;

  return (
    <View style={style.container}>
      <ImageBackground
        style={style.imgStyle}
        resizeMode="stretch"
        source={images.drawerBanner}>
        <Text style={style.nameTextStyle}>{currentUserInList.un || ''}</Text>
      </ImageBackground>
      {/* <DrawerItem name={'Setting'} icon={icons.setting} /> */}
      <DrawerItem name={'Share'} icon={icons.share} />
      <DrawerItem name={'Rate'} icon={icons.star} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(73),
    backgroundColor: colors.white,
  },
  imgStyle: {
    width: wp(73),
    height: hp(26),
  },
  nameTextStyle: {
    fontSize: wp(4.5),
    marginTop: hp(2.5),
    textAlign: 'center',
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  drawerItemConatiner: {
    flexDirection: 'row',
    marginHorizontal: wp(4),
    paddingVertical: hp(1.7),
    borderBottomWidth: wp(0.3),
    justifyContent: 'space-between',
    borderBottomColor: colors.whiteGray,
  },
  titleTextStyle: {
    fontSize: wp(4),
    color: colors.black,
    fontFamily: fontFamily.saira_semiBold,
  },
  iconStyle: {
    width: wp(6),
    height: wp(6),
  },
});

export default CustomDrawerContent;
