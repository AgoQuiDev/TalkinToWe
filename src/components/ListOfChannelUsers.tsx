import React from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import type {SendbirdMember} from '@sendbird/uikit-utils';

interface ListChannelUsersProps {
  channelMembers: SendbirdMember[];
}

const ListChannelUsers = ({channelMembers}: ListChannelUsersProps) => {
  const renderItem = ({item}: any) => {
    const online = item.connectionStatus === 'online';
    return (
      <View>
        <Text style={styles.userText(online)}>{`\u25CF ${item.nickname}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <Text>Participants</Text>
      <FlatList
        data={channelMembers}
        keyExtractor={item => item.userId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderRightColor: '#EBB3F2',
    borderRightWidth: 1,
    padding: 10,
  },
  userText: (online) => {
    return {
      marginTop: 10,
      color: online ? '#259C72' : '#BDBDBD',
    };
  },
});
export default ListChannelUsers;
