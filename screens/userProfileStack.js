import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from './signUpScreen'
import LoginScreen from './loginScreen'
import ProfileScreen from './profileScreen'
import EditProfileScreen from './editProfileScreen'


const userProfileStackBuild = createStackNavigator();


const userProfileStack = () => {
    return (
            <userProfileStackBuild.Navigator initialRouteName="Profile">
                <userProfileStackBuild.Screen name="Profile" component={ProfileScreen} options={{
                    headerShown: true,
                    title: 'Profile',
                    headerLeft: null
                    
                }} />
                <userProfileStackBuild.Screen name="EditProfile" component={EditProfileScreen} options={{
                    headerShown: true,
                    title: 'Edit Profile'
                }} />
            </userProfileStackBuild.Navigator>
    )

 }


export default userProfileStack;
