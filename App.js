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
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import colors from './colors/lightMode'


// const fontConfig = {
//   web: {
//     regular: {
//       fontFamily: 'sans-serif',
//       fontWeight: 'normal',
//     },
//     medium: {
//       fontFamily: 'sans-serif-medium',
//       fontWeight: 'normal',
//     },
//     light: {
//       fontFamily: 'sans-serif-light',
//       fontWeight: 'normal',
//     },
//     thin: {
//       fontFamily: 'sans-serif-thin',
//       fontWeight: 'normal',
//     },
//   },
//   ios: {
//     regular: {
//       fontFamily: 'sans-serif',
//       fontWeight: 'normal',
//     },
//     medium: {
//       fontFamily: 'sans-serif-medium',
//       fontWeight: 'normal',
//     },
//     light: {
//       fontFamily: 'sans-serif-light',
//       fontWeight: 'normal',
//     },
//     thin: {
//       fontFamily: 'sans-serif-thin',
//       fontWeight: 'normal',
//     },
//   },
//   android: {
//     regular: {
//       fontFamily: 'sans-serif',
//       fontWeight: 'normal',
//     },
//     medium: {
//       fontFamily: 'sans-serif-medium',
//       fontWeight: 'normal',
//     },
//     light: {
//       fontFamily: 'sans-serif-light',
//       fontWeight: 'normal',
//     },
//     thin: {
//       fontFamily: 'sans-serif-thin',
//       fontWeight: 'normal',
//     },
//   }
// };

const theme = {
  ...DefaultTheme,
  // fonts: configureFonts(fontConfig),
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: colors.mediumPurple,
    // accent: colors.darkPurple,
  }
};





const App = () => {


  return(
    <NavigationContainer >
      <PaperProvider theme={theme}>
        <AuthStack></AuthStack>
      </PaperProvider>
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