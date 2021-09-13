import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, CardStyleInterpolators, HeaderStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import SignUpScreen from './signUpScreen'
import LoginScreen from './loginScreen'
import createObjective from './createObjective'
import AddKeyResult from './addKeyResult'
import colors from '../colors/lightMode'
import { Feather,  } from '@expo/vector-icons';
import { color } from 'react-native-reanimated'



const createObjectiveStackBuild = createStackNavigator();


const animationConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: .01,
  },
};


const createObjectiveStack = ({ route, navigation }) => {
    return (
            <createObjectiveStackBuild.Navigator 
            initialRouteName="CreateObjective" 
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'identity',
                  }),
                },
              }),
            }}
            mode="modal"
            >
                <createObjectiveStackBuild.Screen name="CreateObjective" component={createObjective} options={{
                    headerShown: true,
                    headerLeft: null,
                    title: null,
                    headerStyle: {
                      backgroundColor: colors.darkPurple,
                      elevation: 0,
                      shadowOpacity: 0,
                      borderBottomWidth: 0,
                      
                    },
                }} />
                <createObjectiveStackBuild.Screen name="AddKeyResults" component={AddKeyResult} options={{
                    headerShown: true,
                    title: 'Pull Me Down',
                    headerBackTitleStyle: {
                      color: 'white',
                    },
                    headerLeft: null,
                    // headerLeft: () => (
                    //   <Feather name="arrow-down" style={{ paddingLeft: 18 }} size={30} color="white" onPress={ () => {
                    //     navigation.replace('CreateObjective')}}></Feather>
                    // ),

                    headerStyle: {
                      backgroundColor: 'transparent',
                      // shadowColor: "#000",
                      // shadowOffset: {
                      //   width: 0,
                      //   height: 4,
                      // },
                      // shadowOpacity: 0.20,
                      // shadowRadius: 4.65,
                      
                      // elevation: 8,
                      
                    },
                    // headerLeft: null,
                    title: null,
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                    animation: 'float',
                    // cardStyleInterpolator: CardStyleInterpolators.ModalPresentationIOS,
                    // cardStyleInterpolator: forFade,
                    // transitionSpec: {
                    //   open: animationConfig,
                    //   close: animationConfig
                    // }
                }} />
            </createObjectiveStackBuild.Navigator>
    )

 }


export default createObjectiveStack;
