import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home/Home';
import DrawerNavigater from './drawerNavigator';
import Hashtag from '../screen/Home/Hashtag';
import Bios from '../screen/Home/Bios';
import FollowEarn from '../screen/Follower/FollowEarn';
import GetFollower from '../screen/Follower/GetFollower';
import MyPost from '../screen/Common/MyPost';
import BuyFollowers from '../screen/Common/BuyFollowers';
import Store from '../screen/Common/Store';
import Compaigns from '../screen/Follower/Compaigns';
import BiosPreview from '../screen/Home/BiosPreview';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Compaigns" component={DrawerNavigater} />
        <Stack.Screen name="Hashtag" component={Hashtag} />
        <Stack.Screen name="Bios" component={Bios} />
        <Stack.Screen name="BiosPreview" component={BiosPreview} />
        <Stack.Screen name="FollowEarn" component={FollowEarn} />
        <Stack.Screen name="GetFollower" component={GetFollower} />
        {/* Common */}
        <Stack.Screen name="MyPost" component={MyPost} />
        <Stack.Screen name="BuyFollowers" component={BuyFollowers} />
        <Stack.Screen name="Store" component={Store} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
