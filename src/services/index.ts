import * as ImagePicker from 'react-native-image-picker';
import * as Permissions from 'react-native-permissions';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  createNativeClipboardService,
  createNativeFileService,
} from '@sendbird/uikit-react-native';
import {SendbirdChatSDK} from '@sendbird/uikit-utils';

let AppSendbirdSDK: SendbirdChatSDK;
export const GetSendbirdSDK = () => AppSendbirdSDK;
export const SetSendbirdSDK = (sdk: SendbirdChatSDK) => (AppSendbirdSDK = sdk);

export const FileService = createNativeFileService({
  imagePickerModule: ImagePicker,
  permissionModule: Permissions,
});

export const ClipboardService = createNativeClipboardService(Clipboard);
