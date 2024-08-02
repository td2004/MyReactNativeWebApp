import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import QRScreen from '../screens/QRScreen';
import StockData from '../screens/StockScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="QR" component={QRScreen} />
        <Stack.Screen name ="SD" component={StockData}/>
      </Stack.Navigator>
  );
}
