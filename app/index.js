import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import QRScreen from '../screens/QRScreen';
import StockData from '../screens/StockScreen';
import StockList from '../screens/Top50StocksScreen';
import BackgroundVideo from '../screens/AudioBackground';


 

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="QR" component={QRScreen} />
      <Tab.Screen name="SD" component={StockData} />
      <Tab.Screen name="TSD" component={StockList} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
  
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});