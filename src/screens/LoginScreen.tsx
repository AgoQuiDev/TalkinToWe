import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useConnection} from '@sendbird/uikit-react-native';
import {useNavigation} from '@react-navigation/native';
import {getUserInfos, setUserInfos} from '../helpers/authentication';
import {SENDBIRD_URL_PUBLIC_CHANNEL} from '../env';

const LoginScreen = () => {
  const [userId, setUserId] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [displayRequiredId, setDisplayRequiredId] = useState(false);

  const navigation = useNavigation();
  const {connect, disconnect} = useConnection();

  useEffect(() => {
    getStoredUser();
  }, []);

  const getStoredUser = async () => {
    const {id, name} = await getUserInfos();
    setUserId(id);
    setUserNickName(name);
  };

  const disconnectUser = async () => {
    try {
      await disconnect();
    } catch (e) {
      console.warn('error on disconnect', e);
    }
  };

  const connectUser = async () => {
    if (!userId) {
      setDisplayRequiredId(true);
      return;
    }
    try {
      await disconnectUser();
      const userConnected = await connect(userId, {nickname: userNickName});
      if (userConnected) {
        setUserInfos(userId, userNickName);
        navigation.navigate('Home', {
          urlchannel: SENDBIRD_URL_PUBLIC_CHANNEL,
          connectuser: userId,
        });
      }
    } catch (e) {
      console.warn('Error on connect user:', e);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/talkintowe.jpeg')}
      resizeMode={'stretch'}
      style={styles.image}>
      <View style={styles.container}>
        <View style={styles.containImputs}>
          {!!displayRequiredId && (
            <Text style={styles.required}>* Your User ID is required </Text>
          )}
          <TextInput
            style={styles.inputText}
            value={userId}
            placeholder={'Enter your User ID, please'}
            onChangeText={text => {
              if (text !== '') {
                setDisplayRequiredId(false);
              }
              setUserId(text);
            }}
            placeholderTextColor={'#BDBDBD'}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputText}
            value={userNickName}
            placeholder={'Enter your Nick Name'}
            onChangeText={text => setUserNickName(text)}
            onSubmitEditing={connectUser}
            placeholderTextColor={'#BDBDBD'}
            returnKeyType="send"
            autoCapitalize="none"
          />
        </View>
        <Pressable style={styles.signButton} onPress={connectUser}>
          <Text>{'Go talkin to We!'}</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containImputs: {
    width: '100%',
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
  required: {
    width: '50%',
    color: '#C73039',
    fontWeight: 'bold',
    backgroundColor: '#eaeaea',
    textAlign: 'center',
    borderRadius: 10,
  },
  signButton: {
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
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

export default LoginScreen;
