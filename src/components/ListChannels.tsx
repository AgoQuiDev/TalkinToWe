import React from 'react';
import {FlatList, View, StyleSheet, Text, Pressable} from 'react-native';
import type {SendbirdGroupChannel} from '@sendbird/uikit-utils';
import {Icon} from '@sendbird/uikit-react-native-foundation';
import {useNavigation} from '@react-navigation/native';

import {getChannelName} from '../helpers/manageChannel';
import {commonStyles} from '../styles/common';

interface ListChannelsProps {
  channelsList: SendbirdGroupChannel[];
  switchChannel: (channel: SendbirdGroupChannel) => any;
  currentChannel: SendbirdGroupChannel;
}

const ListChannels = ({
  channelsList,
  switchChannel,
  currentChannel,
}: ListChannelsProps) => {
  const navigation = useNavigation();

  const renderItem = ({item}: any) => {
    const channelName = getChannelName(item);
    let selected = false;
    if (currentChannel.url === item.url) {
      selected = true;
    }
    return (
      <View>
        <Pressable
          style={[commonStyles.sameLine, styles.channelButton(selected)]}
          onPress={() => switchChannel(item)}>
          <Icon
            icon={'channels'}
            size={14}
            color={selected ? '#C87FD1' : '#aaaaaa'}
          />
          <Text style={styles.channel} numberOfLines={1} ellipsizeMode="tail">
            {channelName}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <View style={[commonStyles.sameLine, styles.createButton]}>
        <Text>Channels</Text>
        <Pressable onPress={() => navigation.navigate('CreateChannel')}>
          <Icon icon={'create'} size={18} color="#C87FD1" />
        </Pressable>
      </View>
      <FlatList
        data={channelsList}
        keyExtractor={item => item.url}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderRightColor: '#EBB3F2',
    borderRightWidth: 1,
    borderTopColor: '#EBB3F2',
    borderTopWidth: 1,
    padding: 10,
    height: '90%',
  },
  channel: {
    width: 100,
    fontSize: 12,
  },
  channelButton: (selected) => {
    return {
      backgroundColor: selected ? '#EBB3F2' : '#FFFFFF',
      borderRadius: 10,
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 5,
    };
  },
  createButton: {
    justifyContent: 'space-between',
  },
});
export default ListChannels;
