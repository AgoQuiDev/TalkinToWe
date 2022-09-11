import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSendbirdChat} from '@sendbird/uikit-react-native';

import {HeaderBackButton} from '../components/HeaderBackButton';
import {UserItem} from '../components/UserItem';
import {createPrivateChannel} from '../helpers/manageChannel';

const CreateChannelScreen = () => {
  const [usersEnabled, setUsersEnabled] = useState([]);
  const [channelName, onChangeChannelName] = useState('');

  const navigation = useNavigation();
  const {sdk, currentUser} = useSendbirdChat();

  const goBack = () => {
    navigation.goBack();
  };

  const getListUsers = async () => {
    const queryUsers = sdk.createApplicationUserListQuery();
    const usersList = await queryUsers.next();
    const disableUsers = usersList
      .filter(u => u.userId !== currentUser.userId)
      .map(user => ({
        id: user.userId,
        nickname: user.nickname,
        enabled: false,
      }));
    setUsersEnabled(disableUsers);
  };

  useEffect(() => {
    getListUsers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Nouveau channel',
      headerLeft: () => <HeaderBackButton goBack={goBack} />,
    });
  }, [navigation.routeName]);

  const toggleEnabledUser = (value, index) => {
    const copyUsers = usersEnabled.map(u => u);
    copyUsers[index].enabled = value;
    setUsersEnabled(copyUsers);
  };

  const createChannel = async () => {
    const userIds = usersEnabled.reduce((r, user) => {
      if (user.enabled) {
        return [...r, user.id];
      }
      return [...r];
    }, []);
    const channel = await createPrivateChannel(sdk, userIds, channelName);
    console.log(channel);
    navigation.navigate({
      name: 'Home',
      params: {urlchannel: channel.url},
      merge: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headertext}>
        Selectionner à qui vous voulez parlez:
      </Text>
      {usersEnabled.map((item, index) => (
        <UserItem
          item={item}
          index={index}
          toggleEnabledUser={toggleEnabledUser}
        />
      ))}
      {usersEnabled.find(u => u.enabled) && (
        <View style={styles.channel}>
          <TextInput
            style={styles.inputText}
            placeholder="Nom du channel"
            onChangeText={onChangeChannelName}
            value={channelName}
          />
          <Pressable style={styles.createButton} onPress={createChannel}>
            <Text>Créez le channel</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafaff',
  },
  headertext: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  channel: {
    alignItems: 'center',
  },
  inputText: {
    width: '60%',
    height: 50,
    backgroundColor: '#ffffff',
    borderColor: '#C87FD1',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: 'rgba(0,0,0,1)',
    margin: 10,
    fontSize: 16,
  },
  createButton: {
    width: '60%',
    height: 50,
    backgroundColor: '#EBB3F2',
    borderColor: '#C87FD1',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateChannelScreen;
