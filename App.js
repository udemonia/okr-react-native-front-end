import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // nav adds/removes screens to a stack
import DetailScreen from './screens/detailScreen'
import HomeScreen from './screens/homeScreen'
import MainTabScreen from './screens/mainTabScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'; // side bar
import { Feather } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



const colorPallette = {
  hotpink: '#ff375a',
  pink: '#f7aef8',
  lightPurple: '#B388EB',
  darkPurple: '#8093F1',
  otherpurple: '#6200ff',
  brightPurple: '#8E24AA',
  lightBlue: '#72DDF7',
  grey: '#F4F4ED',
  ashGrey: 	'#B2BEB5',
  blueGrey: '#7393B3'
}



const Drawer = createDrawerNavigator();




const App = () => {
  return(
    <NavigationContainer >
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainTabScreen} />
        {/* <Drawer.Screen name="Detail" component={DetailStackScreen} /> */}
      </Drawer.Navigator>
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


export default App;