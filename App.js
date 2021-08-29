import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DetailScreen from './screens/detailScreen'
import HomeScreen from './screens/homeScreen'
import MainTabScreen from './screens/mainTabScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'; // side bar
import { DrawerContents } from './screens/drawerContent'
import { Feather } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DrawerEntryNav from './screens/drawerNavigation'
import AuthStack from './screens/authStack'
import { OKRsProvider } from './context/okrContext'


const App = () => {
  return(
    <NavigationContainer >
      <AuthStack></AuthStack>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default () => {
  return <OKRsProvider>
          <App />
        </OKRsProvider>
} 