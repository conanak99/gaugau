import { StatusBar } from 'expo-status-bar'
import React from 'react'
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'

import HomeScreen from './src/screens/HomeScreen'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <HomeScreen />
          <StatusBar />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
