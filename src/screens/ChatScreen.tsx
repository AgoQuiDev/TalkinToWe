import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSendbirdChat} from '@sendbird/uikit-react-native';

import SendMessageComponent from '../components/SendMessageComponent';
import MessagesList from '../components/MessagesListComponent';
import ListChannelUsers from '../components/ListOfChannelUsers';
import ListChannels from '../components/ListChannels';
import {
  getPublicChannel,
  joinUserToChannel,
  getChannelsList,
  getChannelName,
  getChannel,
} from '../helpers/manageChannel';
import {loadMoreMessages, sendMessage} from '../helpers/manageMessages';

const NB_MESSAGES_BY_LOAD: number = 25;

const ChatScreen = () => {
  const [currentChannel, setCurrentChannel] = useState<SendBird.GroupChannel>();
  const [sectionMessages, setSectionMessages] = useState([]);
  const [channelMembers, setChannelMembers] = useState<SendBird.Member[]>();
  const [channelsList, setChannelsList] = useState<SendBird.GroupChannel[]>();
  const [nbMessages, setNbMessages] = useState(0);

  const {sdk, currentUser} = useSendbirdChat();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    try {
      const initChannel = async () => {
        if (!currentUser) {
          return;
        }

        const channelPublic = await getPublicChannel(sdk, currentUser);
        setCurrentChannel(channelPublic);
        loadAllInfos(channelPublic);
      };
      initChannel();
    } catch (error) {
      console.warn('Error on init channel: ', error);
    }
  }, []);

  useEffect(() => {
    if (currentChannel) {
      navigation.setOptions({title: getChannelName(currentChannel)});
    }
    loadMessages();
  }, [currentChannel]);

  useEffect(() => {
    reloadChannel(route.params?.urlchannel);
  }, [route.params?.urlchannel, route.params?.connectuser])

  const reloadChannel = async url => {
    if (url) {
      const channel = await getChannel(sdk, url);
      setCurrentChannel(channel);
      await loadAllInfos(channel);
    }
  };
  const loadAllInfos = async channel => {
    setNbMessages(0);
    setChannelMembers(channel.members);
    joinUserToChannel(channel, currentUser.userId);
    loadMessages();
    const list = await getChannelsList(sdk);
    setChannelsList(list);
  };

  const loadMessages = async () => {
    const totalMessages = nbMessages + NB_MESSAGES_BY_LOAD;
    const messages = await loadMoreMessages(sdk, currentChannel, totalMessages);
    setSectionMessages(messages);
    setNbMessages(totalMessages);
  };

  const onSendMessage = async (messageState: string): Promise<void> => {
    await sendMessage(sdk, currentChannel, messageState, loadMessages);
  };

  const handleSwitchChannel = channel => {
    setNbMessages(0);
    setCurrentChannel(channel);
  };

  return (
    <View style={styles.chatContainer}>
      <View>
        <ListChannelUsers channelMembers={channelMembers} />
        <ListChannels
          channelsList={channelsList}
          switchChannel={handleSwitchChannel}
          currentChannel={currentChannel}
        />
      </View>
      <View style={styles.chatContent}>
        <MessagesList
          style={{flex: 2}}
          messages={sectionMessages}
          loadMoreMessages={loadMessages}
        />
        <SendMessageComponent handlerSendMessage={onSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fafafaff',
  },
  chatContent: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default ChatScreen;
