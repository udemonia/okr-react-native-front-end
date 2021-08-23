import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from './signUpScreen'
import LoginScreen from './loginScreen'
import DrawerEntryNav from './drawerNavigation'
import createObjective from './createObjective'
import AddKeyResult from './addKeyResult'


const createObjectiveStackBuild = createStackNavigator();


const createObjectiveStack = () => {
    return (
            <createObjectiveStackBuild.Navigator initialRouteName="CreateObjective" screenOptions={{
                headerStyle: {
                  backgroundColor: '#210347'
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}>
                <createObjectiveStackBuild.Screen name="CreateObjective" component={createObjective} options={{
                    headerShown: true,
                    headerLeft: null,
                    title: 'Create an Objective'
                }} />
                <createObjectiveStackBuild.Screen name="AddKeyResults" component={AddKeyResult} options={{
                    headerShown: true,
                    headerLeft: null,
                    title: 'Add Key Results'
                }} />
            </createObjectiveStackBuild.Navigator>
    )

 }


export default createObjectiveStack;
