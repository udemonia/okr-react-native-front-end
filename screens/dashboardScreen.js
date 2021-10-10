import React from 'react';
import {View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

import GettingStartedExample from '../components/charts/gettingStarted';
import GettingStartedPie from '../components/charts/gettingStartedPie';
import BarChartExample from '../components/charts/gettingStartedBar'
import CountOfStatus from '../components/charts/totalCountByStatus';

const dashboard = ({ route, navigation }) => {
  console.log('This is the Dashboard Route: ', route)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20}}>
          
            <GettingStartedExample></GettingStartedExample>
            <CountOfStatus></CountOfStatus>
      </View>
    )
  }

export default dashboard;