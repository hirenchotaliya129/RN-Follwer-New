import React from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {hp, wp} from '../../helper/constants';
import {icons} from '../../helper/iconsConstant';
import {colors, fontFamily} from '../../helper/utils';

const SearchBar = ({onPressClose, value, onChangeText, placeholder}) => {
  return (
    <View style={style.mainContainer}>
      <View style={style.container}>
        <TextInput
          value={value}
          style={style.inputStyle}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={colors.whiteGray}
        />
        <TouchableOpacity onPress={onPressClose}>
          <Image
            source={icons.close}
            resizeMode={'contain'}
            style={style.iconsStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: wp(0.4),
    borderBottomColor: colors.whiteGray,
  },
  container: {
    borderWidth: wp(0.3),
    borderRadius: wp(3),
    flexDirection: 'row',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
    marginHorizontal: wp(4),
    borderColor: colors.primaryColor,
  },
  iconsStyle: {
    height: wp(6),
    width: wp(4),
    marginHorizontal: wp(3),
  },
  inputStyle: {
    flex: 1,
    padding: wp(1.5),
    marginLeft: wp(2),
    fontSize: wp(4),
    fontFamily: fontFamily.saira_semiBold,
  },
});

export default SearchBar;
