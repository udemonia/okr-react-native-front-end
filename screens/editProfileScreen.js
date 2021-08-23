import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const editProfile = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Edit Profile Screen</Text>
        <Button title="Back" onPress={()=> navigation.goBack()} />
      </View>
    )
  }

export default editProfile;