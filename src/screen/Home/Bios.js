import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {
  SearchBar,
  MainHeader,
  HashtagItem,
  BiosMenuItem,
  BiosMenuModal,
} from '../../components';

import {colors} from '../../helper/utils';
import {hp, wp} from '../../helper/constants';
import {biosData, categoryData, languageData} from '../../helper/constData';

const Bios = ({navigation}) => {
  const [bios, setBios] = useState([]);
  const [language, setLanguage] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isMenuModal, setIsMenuModal] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    getBiosCategory();
    getBiosLanguageData();
  }, []);

  const onPressDot = () => setIsMenuModal(true);
  const onPressSearch = () => setIsSearchVisible(!isSearchVisible);

  const getBiosLanguageData = () => {
    let data = [...languageData];
    data.map(i => {
      if (i.l === 'All') {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    setLanguage(data);
    setBios(biosData);
  };

  const getBiosCategory = () => {
    let data = [...categoryData];
    data.map(i => {
      if (i.title === 'Both') {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    setCategory(data);
    setBios(biosData);
  };

  const onPressCategoryItem = item => {
    let data = [...categoryData];
    data.map(i => {
      if (i.title === item.title) {
        i.isSelected = true;
      } else {
        i.isSelected = false;
      }
    });
    setCategory(data);
    let selectedData = data.filter(i => i.isSelected);
    if (selectedData?.[0]?.title === 'Boy') {
      let biosFilterData = biosData.filter(i => i.t === true);
      setBios(biosFilterData);
    } else if (selectedData?.[0]?.title === 'Girl') {
      let biosFilterData = biosData.filter(i => i.t === false);
      setBios(biosFilterData);
    } else {
      setBios(biosData);
    }
    setIsMenuModal(false);
  };

  const onPressLanguageItem = item => {
    if (item.l !== 'All') {
      let data = [...languageData];
      data.map(i => {
        if (i.l === item.l) {
          i.isSelected = true;
        } else {
          i.isSelected = false;
        }
      });
      setLanguage(data);
      let selectedData = data.filter(i => i.isSelected);
      let biosFilterData = biosData.filter(i => i.l === selectedData?.[0]?.l);
      setBios(biosFilterData);
    } else {
      getBiosLanguageData();
    }
    setIsMenuModal(false);
  };

  const onChangeText = text => {
    setSearchText(text);
    if (text) {
      let newData = biosData?.filter(item => {
        return item?.b?.toLowerCase()?.indexOf(text?.toLowerCase()) >= 0;
      });
      setBios(newData);
    } else {
      setBios(biosData);
    }
  };

  const onPressClose = () => {
    setSearchText('');
    getBiosCategory();
    getBiosLanguageData();
    setIsSearchVisible(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <MainHeader
        rightIconVisible
        headerTitle={'Bios'}
        onPressDot={onPressDot}
        onPressSearch={onPressSearch}
        onPressLeftIcon={() => navigation.goBack()}
        containerStyle={{borderBottomWidth: isSearchVisible ? 0 : wp(0.4)}}
      />
      {isSearchVisible && (
        <SearchBar
          value={searchText}
          onChangeText={onChangeText}
          onPressClose={onPressClose}
          placeholder={'Search.....'}
        />
      )}

      <FlatList
        data={bios}
        renderItem={({item, index}) => {
          return (
            <HashtagItem
              data={item.b}
              onPressEye={() => {
                navigation.navigate('BiosPreview', {item});
              }}
            />
          );
        }}
        ListFooterComponent={<View style={{height: hp(3)}} />}
      />
      <BiosMenuModal
        onCloseModal={() => setIsMenuModal(false)}
        isVisible={isMenuModal}
        categoryView={
          <FlatList
            numColumns={3}
            data={category}
            renderItem={({item, index}) => {
              return (
                <BiosMenuItem
                  item={item}
                  label={'title'}
                  onPressItem={() => onPressCategoryItem(item)}
                />
              );
            }}
          />
        }
        languageView={
          <FlatList
            numColumns={3}
            data={language}
            renderItem={({item, index}) => {
              return (
                <BiosMenuItem
                  item={item}
                  label={'l'}
                  onPressItem={() => onPressLanguageItem(item)}
                />
              );
            }}
          />
        }
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

export default Bios;
