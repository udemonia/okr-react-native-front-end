import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const signUpScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign Up Form!</Text>
        <Button title="back to login!" onPress={()=> navigation.goBack()} />
      </View>
    )
  }

export default signUpScreen;