
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState, useContext} from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from '../components/swipeToDelete/ListItem'
import OKRsContext from '../context/okrContext';
import colors from '../colors/lightMode'
import { useFocusEffect } from '@react-navigation/native';
import ObjectiveTitleSwipe from '../components/swipeToDelete/ObjectiveTitleSwipeToDelete'

// https://www.youtube.com/watch?v=AVS_2nzt8Do

const OBJECTIVES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];

const testObjective = 
  {
    "_id": "613c058666fbdc554bc91bb5",
    "atRisk": false,
    "name": "Delight our Customers",
  }


const BACKGROUND_COLOR = colors.lightGrey;

//!-------------------------------------------------------

const titleSwipeToDelete = (props) => {

  const { objTitleInfo } = props

  const scrollRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <ObjectiveTitleSwipe objectiveInfo={objTitleInfo || testObjective}></ObjectiveTitleSwipe>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 40,
    color: colors.darkPurple,
    marginVertical: 20,
    paddingLeft: '5%',
  },
});

export default titleSwipeToDelete;