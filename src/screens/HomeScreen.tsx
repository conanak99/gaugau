import * as React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BoyScreen from './BoyScreen'
import GirlScreen from './GirlScreen'

const Tab = createBottomTabNavigator()

const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Girl"
        options={{ tabBarIcon: () => <Text>👧</Text> }}
        component={GirlScreen}
      />
      <Tab.Screen
        name="Boy"
        options={{ tabBarIcon: () => <Text>👦</Text> }}
        component={BoyScreen}
      />
    </Tab.Navigator>
  )
}

export default HomeScreen
