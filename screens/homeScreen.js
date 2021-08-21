import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title="Detail" onPress={()=> navigation.navigate('Detail')} />
      </View>
    )
  }

export default HomeScreen;