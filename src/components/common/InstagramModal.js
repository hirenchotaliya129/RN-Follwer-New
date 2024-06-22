import React from 'react';
import Modal from 'react-native-modal';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

const InstagramModal = ({isVisible, closeModal, onNavigationStateChange}) => {
  return (
    <Modal
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      isVisible={isVisible}>
      <View style={{flex: 1}}>
        <WebView
          incognito={true}
          cacheEnabled={false}
          onNavigationStateChange={onNavigationStateChange}
          source={{uri: 'https://www.instagram.com/accounts/login/'}}
          nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
        />
      </View>
    </Modal>
  );
};

export default InstagramModal;
