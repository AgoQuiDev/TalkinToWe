import React from 'react';
import {SendbirdUIKitContainer} from '@sendbird/uikit-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Navigation} from './routes';
import {SENDBIRD_APP_ID} from './env';

import {FileService, ClipboardService, SetSendbirdSDK} from './services';

const App = () => (
  <SendbirdUIKitContainer
    appId={SENDBIRD_APP_ID}
    chatOptions={{
      localCacheStorage: AsyncStorage,
      onInitialized: SetSendbirdSDK,
      enableAutoPushTokenRegistration: false,
      enableChannelListTypingIndicator: true,
      enableChannelListMessageReceiptStatus: true,
    }}
    platformServices={{
      file: FileService,
      notification: false,
      clipboard: ClipboardService,
    }}>
    <Navigation />
  </SendbirdUIKitContainer>
);

export default App;
