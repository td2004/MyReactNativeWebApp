import React from 'react';
import { Platform, StyleSheet } from 'react-native';

const BackgroundVideo = () => {
  if (Platform.OS === 'web') {
    return (
      <video
        autoPlay
        loop
        style={styles.backgroundVideo}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />
    );
  } else {
    const Video = require('react-native-video').default;
    return (
      <Video
        source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
        style={styles.backgroundVideo}
        repeat={true}
        resizeMode="cover"
        audioOnly={false}
      />
    );
  }
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

export default BackgroundVideo;
