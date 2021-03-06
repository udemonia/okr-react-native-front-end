import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const ExploreScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Setting Screen</Text>
        <Button title="Home" onPress={()=> navigation.navigate('Home')} />
      </View>
    )
  }

export default ExploreScreen;