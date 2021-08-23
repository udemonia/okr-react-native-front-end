import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';

const objectiveDetail = ({ route, navigation }) => {
  console.log(route.params)
  const { name, _id, atRisk, description, objectiveEndDate, objectiveStartDate } = route.params
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is the Objective Detail Screen</Text>
        <Text>{`name: ${name} _id: ${_id}, atRisk: ${atRisk}, description: ${description}, objectiveEndDate: ${objectiveEndDate}, objectiveStartDate: ${objectiveStartDate}`}</Text>
        <Button title="Back" onPress={()=> navigation.goBack()} />
      </View>
    )
  }

export default objectiveDetail;


