import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Icon} from '@sendbird/uikit-react-native-foundation';

import {commonStyles} from '../styles/common';

export const HeaderBackButton = ({goBack}) => {
  return (
    <View style={[commonStyles.sameLine, styles.createButton]}>
      <Pressable onPress={goBack}>
        <Icon icon={'arrow-left'} size={18} color="#C87FD1" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  createButton: {
    justifyContent: 'space-between',
  },
});
