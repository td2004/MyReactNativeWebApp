import React, { useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Button } from 'react-native';
import { Video } from 'expo-av';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  { title: 'Slide 1', text: 'Hello, this is slide 1' },
  { title: 'Slide 2', text: 'Hello, this is slide 2' },
  { title: 'Slide 3', text: 'Hello, this is slide 3' },
];

const HomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= data.length) {
        nextIndex = 0;
      }
      setActiveIndex(nextIndex);
      scrollViewRef.current.scrollTo({ x: nextIndex * screenWidth, animated: true });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePlayVideo = async () => {
    setIsPlaying(true);
    if (Platform.OS === 'web') {
      const videoElement = document.querySelector('video');
      videoElement.muted = false;
      videoElement.play();
    } else {
      await videoRef.current.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      {Platform.OS === 'web' ? (
        <video
          ref={videoRef}
          loop
          muted={!isPlaying}
          style={styles.backgroundVideo}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />
      ) : (
        <Video
          ref={videoRef}
          source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
          style={styles.backgroundVideo}
          isLooping
          isMuted={!isPlaying}
        />
      )}
      <Button title="Play Video" onPress={handlePlayVideo} disabled={isPlaying} />
      <View style={styles.headerTextContainer}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setActiveIndex(slideIndex);
        }}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyText}>
          Hello, my name is Arpitha. I am currently a third-year student studying Software Engineering at the University Technology Sydney.
          I am interested in coding and have experience coding in several languages. 
          Look below for all the languages I know and the additional skills I have.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    padding: 20,
  },
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
  headerTextContainer: {
    alignItems: 'center',
    marginTop: '8%',
  },
  dashboardTitle: {
    fontSize: 45,
    fontWeight: '700',
  },
  slide: {
    width: screenWidth - 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 20,
    padding: 20,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slideText: {
    fontSize: 16,
    color: '#555',
  },
  bodyContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#333',
    marginBottom: 10,
  },
});

export default HomeScreen;
