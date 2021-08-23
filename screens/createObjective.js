import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';
import AddKeyResult from './addKeyResult';

const createObjective = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Create Objective Screen</Text>
        <Button title="submit" onPress={()=> navigation.navigate('AddKeyResults')} />
      </View>
    )
  }

export default createObjective;