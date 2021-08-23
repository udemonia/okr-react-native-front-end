import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const dashboard = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Dashboards Coming Soon</Text>
        {/* <Button title="Home" onPress={()=> navigation.navigate('Home')} /> */}
      </View>
    )
  }

export default dashboard;