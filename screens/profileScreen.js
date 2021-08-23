import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <Button title="Back.." onPress={() => navigation.goBack()}/>
        <Button title="EditProfile" onPress={()=> navigation.navigate('EditProfile')} />
      </View>
    )
  }

export default ProfileScreen;