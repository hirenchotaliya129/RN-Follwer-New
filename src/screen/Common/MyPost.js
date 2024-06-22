import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {getUserPost} from '../../actions';
import {colors} from '../../helper/utils';
import {hp, wp} from '../../helper/constants';
import {errorToast} from '../../helper/global';
import {icons} from '../../helper/iconsConstant';
import {ActivityLoader, Header} from '../../components';

const MyPost = ({navigation, route}) => {
  const {getPostItem} = route.params;
  const dispatch = useDispatch();
  const {userPost, currentUserInList} = useSelector(state => state.dashboard);

  const [maxId, setmaxId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFooterLoading, setIsFooterLoading] = useState(false);
  const [onEndReachedCalled, setOnEndReachedCalled] = useState(true);

  useEffect(() => {
    getPostListCall(maxId);
  }, []);

  const getPostListCall = isNextDataId => {
    const obj = {
      userObj: {
        first: 100,
        after: isNextDataId,
        id: currentUserInList.pk,
      },
      onSuccess: res => {
        setIsLoading(false);
        if (res?.status === 'ok') {
          console.log('rESS', res);
          let nextPage =
            res?.data?.user?.edge_owner_to_timeline_media?.page_info;
          if (nextPage.has_next_page) {
            setmaxId(nextPage?.end_cursor);
          } else {
            setmaxId('');
          }
        } else {
          errorToast();
        }
        setIsFooterLoading(false);
      },
      onFail: () => {
        errorToast();
        setIsLoading(false);
      },
    };
    dispatch(getUserPost(obj));
  };

  const onLoadMore = () => {
    if (!onEndReachedCalled && !isFooterLoading && maxId !== '') {
      setIsFooterLoading(true);
      setOnEndReachedCalled(true);
      getPostListCall(maxId);
    }
  };

  const onPressItem = item => {
    getPostItem(item);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={style.container}>
      <ActivityLoader visible={isLoading} />
      <Header
        leftIcon={icons.back}
        centerTitle={'My Post'}
        onPressLeftIcon={() => navigation.goBack()}
        containerStyle={{borderBottomWidth: wp(0.4)}}
      />
      <FlatList
        style={style.listContainer}
        numColumns={2}
        data={userPost}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => onPressItem(item)}
              style={{
                ...style.imgContainer,
                paddingLeft: index % 2 !== 0 ? wp(2) : 0,
              }}>
              <Image
                resizeMode="cover"
                style={style.imgStyle}
                source={{uri: item?.node?.display_url}}
                defaultSource={{uri: item?.node?.thumbnail_src}}
              />
            </TouchableOpacity>
          );
        }}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => setOnEndReachedCalled(false)}
        ListFooterComponent={() => {
          if (isFooterLoading) {
            return (
              <ActivityIndicator color={colors.primaryColor} size={'large'} />
            );
          } else {
            return null;
          }
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listContainer: {
    marginTop: hp(1),
    paddingBottom: hp(2),
    paddingHorizontal: wp(4),
  },
  imgContainer: {
    paddingVertical: wp(1),
  },
  imgStyle: {
    width: wp(45),
    height: wp(45),
    borderRadius: wp(2),
  },
});

export default MyPost;
