import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DetailScreen from './detailScreen'
import HomeScreen from './homeScreen'
import { Feather } from '@expo/vector-icons';
import profileScreen from './profileScreen'
import exploreScreen from './exploreScreen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="white"
          barStyle={{ backgroundColor: 'tomato' }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: '#8E24AA',
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
              tabBarColor: '#6200ff',
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
            backgroundColor: '#8E24AA'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title: 'Home Screen Testing',
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
            backgroundColor: '#6200ff'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <DetailStack.Screen name="Detail" component={DetailScreen} options={{
            title: 'Detail Screen Navigation Testing',
            headerLeft: () => (
              <Feather name="menu" style={{ paddingLeft: 18 }} size={30} color="white" onPress={ () => {
                navigation.openDrawer()}}></Feather>
            )  
          }}/>
        </DetailStack.Navigator>
    )
  }