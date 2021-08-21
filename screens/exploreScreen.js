import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const ExploreScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Explore Screen</Text>
        <Button title="Detail" onPress={()=> navigation.navigate('Detail')} />
      </View>
    )
  }

export default ExploreScreen;