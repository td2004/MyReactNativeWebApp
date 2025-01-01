import { AppRegistry } from 'react-native';
import App from './app';
import { name as appName } from './app.json';
import { registerRootComponent } from 'expo'; // If you're using Expo

// For web:
import { createRoot } from 'react-dom/client';
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<App />);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
