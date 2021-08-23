import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from './signUpScreen'
import LoginScreen from './loginScreen'
import DrawerEntryNav from './drawerNavigation'


const AuthNavStack = createStackNavigator();


const AuthStack = () => {
    return (
            <AuthNavStack.Navigator initialRouteName="Home">
                <AuthNavStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <AuthNavStack.Screen name="SignUp" component={SignUpScreen}/>
                <AuthNavStack.Screen name="drawer" component={DrawerEntryNav} options={{
                    headerShown: false,
                    title: '  Aliquip ✓ ',
                    animationEnabled: false,
                    headerLeft: null 
                }}/>
            </AuthNavStack.Navigator>
    )

 }


export default AuthStack;
