import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import type {
  SendbirdGroupChannel,
  SendbirdUserMessage,
} from '@sendbird/uikit-utils';
import {Icon} from '@sendbird/uikit-react-native-foundation';
import {commonStyles} from '../styles/common';
import VideoLink from './VideoLink';
import {isYoutubeVideo} from '../helpers/manageMessages';

interface MessagesListProps {
  currentChannel?: SendbirdGroupChannel;
  messages?: {title: string; data: SendbirdUserMessage[]}[];
  style: any;
  loadMoreMessages: () => any;
}

const NoMessage = () => {
  return (
    <View style={[commonStyles.sameLine, styles.noMessage]}>
      <Icon icon={'message'} size={45} color={'#C87FD1'} />
      <Text style={styles.noMessageText}>Aucun message</Text>
    </View>
  );
};

export const MessagesList = ({
  messages,
  style,
  loadMoreMessages,
}: MessagesListProps) => {
  const renderSection = ({section: {title}}: any) => {
    return (
      <View style={[commonStyles.sameLine, styles.sectionHeader]}>
        <View style={styles.line} />
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.line} />
      </View>
    );
  };

  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <Icon icon={'user'} size={30} color={'#C87FD1'} />
      <View style={styles.itemContent}>
        <View style={[commonStyles.sameLine]}>
          <Text style={styles.user}>{item.nickname}</Text>
          <Text style={styles.time}>
            - {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        </View>
        <View style={styles.message}>
          {!isYoutubeVideo(item.message) ? (
            <Text>{item.message}</Text>
          ) : (
            <VideoLink url={item.message} />
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={style}>
      {!messages || messages.length === 0 ? (
        <NoMessage />
      ) : (
        <SectionList
          inverted
          sections={messages}
          keyExtractor={(item, index) => `${item.messageId}_${index}`}
          renderItem={renderItem}
          renderSectionFooter={renderSection}
          onStartReachedThreshold={2}
          onEndReached={loadMoreMessages}
          initialNumToRender={25}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 5,
    padding: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderBottomColor: '#EBB3F2',
    borderBottomWidth: 1,
    borderBottomRightRadius: 20,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 2,
    paddingTop: 10,
  },
  user: {
    fontWeight: 'bold',
    margin: 5,
  },
  time: {
    fontStyle: 'italic',
    fontSize: 10,
  },
  message: {
    padding: 5,
  },
  sectionHeader: {
    marginTop: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  headerText: {
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
  },
  noMessage: {
    flex: 1,
    alignContent: 'center',
  },
  noMessageText: {
    fontSize: 25,
    padding: 10,
    margin: 5,
    borderColor: '#EBB3F2',
    borderWidth: 1,
    borderRadius: 10,
    color: '#BDBDBD',
  },
});
export default MessagesList;
