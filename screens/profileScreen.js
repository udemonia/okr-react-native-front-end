import React from 'react';
import {View, Text, StyleSheet, Button, Dimensions, SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-paper'
import colors from '../colors/lightMode'
import { LinearGradient } from 'expo-linear-gradient';
import SwipeLeftDelete from '../components/swipeLeftToDelete';


const { height, width } = Dimensions.get('window')

const ProfileScreen = ({ navigation }) => {
    return (

      <View style={styles.container}>


      {/* <LinearGradient
        // Background Linear Gradient
        colors={[colors.mediumPurple, colors.darkPurple]}
        style={styles.background}
        /> */}

          
        <View style={styles.contentContainer}>

          <View style={styles.titleWrapper}>
            <Button title="Back.." onPress={() => navigation.goBack()}/>
            <Button title="EditProfile" onPress={()=> navigation.navigate('EditProfile')} />
          </View>

          <View style={styles.titleWrapper}>
          </View>
          
        </View>
          
        <View style={styles.footer}>

        <View style={styles.avatarWrapper}>
          <Avatar.Image 
            source={require('../assets/avatar-person.jpeg')}
            size={200}
          />

          </View>
          <SwipeLeftDelete></SwipeLeftDelete>
        </View>
      </View>
  // </LinearGradient>



    
    )
  }

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 50
        // backgroundColor: colors.mediumPurple,
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: height / 2 ,
    },
    titleWrapper: {
      paddingTop: 30,

    },
    inputWrapper: {

    },
    avatarWrapper: {
      flex: 1,
      paddingTop: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',

    },
    contentContainer: {
        flex: 1 // pushes the footer to the end of the screen
    },
    footer: {
        backgroundColor: 'white',
        borderColor: colors.darkPurple,
        borderTopWidth: 1,
        height: height / 1.3,
        borderTopRightRadius: 98,
        zIndex: 0
    }
})

export default ProfileScreen;