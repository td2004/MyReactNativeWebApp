import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  { title: 'Slide 1', text: 'Hello, this is slide 1' },
  { title: 'Slide 2', text: 'Hello, this is slide 2' },
  { title: 'Slide 3', text: 'Hello, this is slide 3' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
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

  return (
    <View style={styles.container}>
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
      <View style={styles.buttonContainer}>
        <Button
          title="Go to About"
          onPress={() => navigation.navigate('About')}
        />
        <Button
          title="Go to QR"
          onPress={() => navigation.navigate('QR')}
        />
          <Button
          title="Go to view Stock Data"
          onPress={() => navigation.navigate('SD')}
        />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default HomeScreen;
