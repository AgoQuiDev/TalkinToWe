import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {commonStyles} from '../styles/common';

export const UserItem = ({item, index, toggleEnabledUser}) => {
  return (
    <View style={[commonStyles.sameLine, styles.container]}>
      <Text>{item.nickname}</Text>
      <Switch
        trackColor={{false: '#eaeaea', true: '#EBB3F2'}}
        ios_backgroundColor="#eaeaea"
        onValueChange={value => toggleEnabledUser(value, index)}
        value={item.enabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: 'space-between',
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
