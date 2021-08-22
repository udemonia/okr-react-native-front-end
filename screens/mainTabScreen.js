import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DetailScreen from './detailScreen'
import HomeScreen from './homeScreen'
import objectivesView from './objectivesScreen'
import { Feather } from '@expo/vector-icons';
import profileScreen from './profileScreen'
import exploreScreen from './exploreScreen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const ObjectiveStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
          initialRouteName="Objectives"
          labeled={false}
          activeColor="white"
          barStyle={{ backgroundColor: '#6200ff' }}
        >
          <Tab.Screen
            name="Objectives"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: '#6200ff',
              tabBarIcon: ({ color }) => (
                <Feather name="target" color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="KeyResult"
            component={DetailStackScreen}
            options={{
              tabBarLabel: 'Key Results',
              tabBarColor: '#00008B',
              tabBarIcon: ({ color }) => (
                <Feather name="check" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Dashboard"
            component={profileScreen}
            options={{
              tabBarLabel: 'dashboard',
              tabBarColor: '#ff77ff',
              tabBarIcon: ({ color }) => (
                <FontAwesome name="pie-chart" color={color} size={24} />
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
                <Ionicons name="ios-add-circle-outline" color={color} size={26} />
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
            title: '  aliquip ✓',
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
            backgroundColor: '#00008B'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
          <DetailStack.Screen name="keyResults" component={DetailScreen} options={{
            title: 'key results',
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
          <ObjectiveStack.Screen name="Objectives" component={objectivesView} options={{
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
  