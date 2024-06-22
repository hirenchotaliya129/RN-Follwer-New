import React, {useEffect} from 'react';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
// import SplashScreen from 'react-native-splash-screen';

import {colors} from './src/helper/utils';
import MainStackNavigator from './src/navigation/navigator';
import store from './src/reducers';

const App = () => {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <MainStackNavigator />
      <Toast position="bottom" />
    </Provider>
  );
};

export default App;
