import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './mainTabScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'; // side bar
import { DrawerContents } from './drawerContent'
import userProfileStack from './userProfileStack';

//todo add post objective drawer - that is why I can't nav to it.

const Drawer = createDrawerNavigator();

const DrawerEntryNav = ({ route, navigation }) => {
  const { params } = route
  const dataToPass = params.params
  return(
      <Drawer.Navigator drawerContent={props => <DrawerContents {...props} />} initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainTabScreen} initialParams={{ loginInfo: dataToPass }} />
        <Drawer.Screen name="Profile" component={userProfileStack} />
        <Drawer.Screen name="CreateObjective" component={userProfileStack} />
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