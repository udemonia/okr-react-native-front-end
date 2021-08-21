import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // nav adds/removes screens to a stack
import DetailScreen from './screens/detailScreen'
import HomeScreen from './screens/homeScreen'
import MainTabScreen from './screens/mainTabScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'; // side bar
import { DrawerContents } from './screens/drawerContent'
import { Feather } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Drawer = createDrawerNavigator();

const App = () => {
  return(
    <NavigationContainer >
      <Drawer.Navigator drawerContent={props => <DrawerContents {...props} />} initialRouteName="Home">
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