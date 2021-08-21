import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DetailScreen from './detailScreen'
import HomeScreen from './homeScreen'
import ObjectivesScreen from './objectivesScreen'
import { Feather } from '@expo/vector-icons';
import profileScreen from './profileScreen'
import exploreScreen from './exploreScreen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const ObjectiveStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="white"
          barStyle={{ backgroundColor: '#6200ff' }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: '#6200ff',
              tabBarIcon: ({ color }) => (
                <Feather name="target" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Detail"
            component={DetailStackScreen}
            options={{
              tabBarLabel: 'Updates',
              tabBarColor: '#B388EB',
              tabBarIcon: ({ color }) => (
                <Feather name="twitch" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={profileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarColor: '#f7aef8',
              tabBarIcon: ({ color }) => (
                <Feather name="user" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Explore"
            component={exploreScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarColor:'#7393B3',
              tabBarIcon: ({ color }) => (
                <Feather name="search" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      );

}

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
    return (
        <HomeStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ff'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title: 'Objectives',
            headerLeft: () => (
              <Feather name="menu" style={{ paddingLeft: 18 }} size={30} color="white" onPress={ () => {
                navigation.openDrawer()}}></Feather>
            )  
          }}/>
        </HomeStack.Navigator>
    )
  }

  const DetailStackScreen = ({ navigation }) => {
    return (
        <DetailStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#B388EB'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <DetailStack.Screen name="Detail" component={DetailScreen} options={{
            title: 'Testing',
            headerLeft: () => (
              <Feather name="menu" style={{ paddingLeft: 18 }} size={30} color="white" onPress={ () => {
                navigation.openDrawer()}}></Feather>
            )  
          }}/>
        </DetailStack.Navigator>
    )
  }

  const ObjectiveStackScreen = ({ navigation }) => {
    return (
        <ObjectiveStack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ff'
          },
          headerTintColor: 'pink',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <ObjectiveStack.Screen name="Objectives" component={ObjectivesScreen} options={{
            title: 'Objectives',
            //! Menus bar - at the top header
            headerLeft: () => (
              <Feather name="menu" style={{ paddingLeft: 18 }} size={30} color="white" onPress={ () => {
                navigation.openDrawer()}}></Feather>
            )  
          }}/>
        </ObjectiveStack.Navigator>
    )
  }


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
  