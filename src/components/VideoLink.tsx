import React from 'react';
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';
import {Icon} from '@sendbird/uikit-react-native-foundation';
import {getUrlPoster} from '../helpers/manageMessages';

interface VideoLinkProps {
  url: string;
}

const VideoLink = ({url}: VideoLinkProps) => {
  const uri = getUrlPoster(url);
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.listContainer}>
      <Pressable onPress={handlePress}>
        <Image source={{uri}} style={styles.image} resizeMode="contain" />
        <Icon style={styles.icon} icon={'play'} size={25} color="#ffffff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderRightColor: '#EBB3F2',
    borderRightWidth: 1,
    padding: 10,
  },
  image: {
    height: 100,
  },
  icon: {
    position: 'absolute',
    bottom: 40,
    zIndex: 100,
  },
});
export default VideoLink;
