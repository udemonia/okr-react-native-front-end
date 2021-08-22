import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './mainTabScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'; // side bar
import { DrawerContents } from './drawerContent'

const Drawer = createDrawerNavigator();

const DrawerEntryNav = () => {
  return(
      <Drawer.Navigator drawerContent={props => <DrawerContents {...props} />} initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainTabScreen} />
        {/* <Drawer.Screen name="Detail" component={DetailStackScreen} /> */}
      </Drawer.Navigator>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


export default DrawerEntryNav;