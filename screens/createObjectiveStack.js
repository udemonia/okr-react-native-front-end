import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from './signUpScreen'
import LoginScreen from './loginScreen'
import createObjective from './createObjective'
import AddKeyResult from './addKeyResult'
import colors from '../colors/lightMode'


const createObjectiveStackBuild = createStackNavigator();


const createObjectiveStack = ({ navigation }) => {
    return (
            <createObjectiveStackBuild.Navigator initialRouteName="CreateObjective" screenOptions={{
                headerStyle: {
                  backgroundColor: colors.darkPurple
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
                headerStyle: {
                  backgroundColor: colors.darkPurple,
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                }
              }}>
                <createObjectiveStackBuild.Screen name="CreateObjective" component={createObjective} options={{
                    headerShown: true,
                    headerLeft: null,
                    title: null
                }} />
                <createObjectiveStackBuild.Screen name="AddKeyResults" component={AddKeyResult} options={{
                    headerShown: true,
                    // headerLeft: null,
                    title: 'Add Key Results'
                }} />
            </createObjectiveStackBuild.Navigator>
    )

 }


export default createObjectiveStack;
