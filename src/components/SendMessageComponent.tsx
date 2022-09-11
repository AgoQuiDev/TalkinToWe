import React, {useState} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {Icon} from '@sendbird/uikit-react-native-foundation';
import {commonStyles} from '../styles/common';

interface MessageProps {
  handlerSendMessage: (text: string) => any;
}

const SendMessageComponent = ({handlerSendMessage}: MessageProps) => {
  const [text, onChangeText] = useState('');
  return (
    <View style={[commonStyles.sameLine, commonStyles.constainerView]}>
      <TextInput
        style={commonStyles.textInput}
        placeholder="Tapez votre message"
        onChangeText={onChangeText}
        value={text}
      />
      <Pressable
        disabled={!text}
        onPress={() => {
          handlerSendMessage(text);
          onChangeText('');
        }}>
        <Icon icon={'send'} size={24} color={text ? '#C87FD1' : '#aaaaaa'} />
      </Pressable>
    </View>
  );
};

export default SendMessageComponent;
