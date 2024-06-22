import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, FlatList} from 'react-native';

import {colors} from '../../helper/utils';
import {hp, wp} from '../../helper/constants';
import {icons} from '../../helper/iconsConstant';
import {hashTagData} from '../../helper/constData';
import {HashtagItem, HorizontalItem, MainHeader} from '../../components';
import {goToInstTags} from '../../helper/globalFuncation';
import Clipboard from '@react-native-clipboard/clipboard';
import {successTost} from '../../helper/global';

const Hashtag = ({navigation}) => {
  const [list, setList] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);

  useEffect(() => {
    let data = [...hashTagData.data];
    data.map(i => {
      if (i.name === 'Popular') {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    setList(data);
    let selectedData = data.filter(i => i.isSelected);
    setSelectedTag(selectedData?.[0]?.tags);
  }, []);

  const onPressItem = (item, index) => {
    let data = [...hashTagData.data];
    data.map(i => {
      if (i.name === item.name) {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    setList(data);
    let selectedData = data.filter(i => i.isSelected);
    setSelectedTag(selectedData?.[0]?.tags);
  };

  const onPressInsta = item => {
    successTost('Copied');
    Clipboard.setString(item);
    setTimeout(() => {
      goToInstTags(item);
    }, 300);
  };

  return (
    <SafeAreaView style={style.container}>
      <MainHeader
        headerTitle={'Hashtag'}
        onPressLeftIcon={() => navigation.goBack()}
        containerStyle={{borderBottomWidth: 0}}
      />
      <View style={style.horizontalContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={list}
          renderItem={({item, index}) => {
            return (
              <HorizontalItem
                data={item}
                onPressItem={() => onPressItem(item, index)}
              />
            );
          }}
        />
      </View>
      <FlatList
        data={selectedTag}
        renderItem={({item, index}) => {
          return (
            <HashtagItem
              data={item}
              icon={icons.instagram}
              tintColor={colors.primaryColor}
              onPressEye={() => onPressInsta(item)}
            />
          );
        }}
        ListFooterComponent={<View style={{height: hp(3)}} />}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  horizontalContainer: {
    height: hp(5),
    borderBottomWidth: wp(0.3),
    borderBottomColor: colors.whiteGray,
  },
});

export default Hashtag;
