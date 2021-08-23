import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const keyResultDetail = ({ route, navigation }) => {
  const { name } = route.params
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is the Key Result Detail Screen</Text>
        <Text>{name}</Text>
        <Button title="Back" onPress={()=> navigation.goBack()} />
      </View>
    )
  }

export default keyResultDetail;