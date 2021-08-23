import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';


const AddKeyResult = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>create key results</Text>
        <Button title="create" onPress={()=> alert('Created Key Result')} />
      </View>
    )
  }

export default AddKeyResult;