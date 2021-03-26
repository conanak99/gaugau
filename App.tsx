import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'react-native-elements'

import HomeScreen from './src/screens/HomeScreen'

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
