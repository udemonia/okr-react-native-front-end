import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const ExploreScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Setting Screen</Text>
        <Button title="Detail" onPress={()=> navigation.navigate('keyResults')} />
      </View>
    )
  }

export default ExploreScreen;