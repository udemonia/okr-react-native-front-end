
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState, useContext} from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from './ListItem';
import OKRsContext from '../../context/okrContext';

// https://www.youtube.com/watch?v=AVS_2nzt8Do

const OBJECTIVES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];


const exampleObjectiveDataStructure = [
  {
    "__v": 0,
    "_id": "613c866d66fbdc554bc91bca",
    "atRisk": false,
    "description": "Example",
    "id": "613c866d66fbdc554bc91bca",
    "name": "Example",
    "objectiveEndDate": "2021-12-31T06:00:00.000Z",
    "objectiveStartDate": "2021-10-01T05:00:00.000Z",
    "percentComplete": 75,
    "slug": "example",
    "user": "60e2f4d5a85e1c5ba5fc995e",
  },
  {
    "__v": 0,
    "_id": "613c058666fbdc554bc91bb5",
    "atRisk": false,
    "description": "Customers are key",
    "id": "613c058666fbdc554bc91bb5",
    "name": "Delight our Customers",
    "objectiveEndDate": "2021-12-31T06:00:00.000Z",
    "objectiveStartDate": "2021-01-01T06:00:00.000Z",
    "percentComplete": 90,
    "slug": "delight-our-customers",
    "user": "60e2f4d5a85e1c5ba5fc995e",
  }
]


// const objectives = [
//   {
//     index: 0,
//     title: 'Record the dismissible tutorial 🎥',
//   },
//   { ... }, { ... }, { ... }
// ];

const BACKGROUND_COLOR = 'white'

//!-------------------------------------------------------

const editProfile = (props) => {

    const { objectiveInfo } = props

    console.log('Objective Info')
    console.log(objectiveInfo)

  const onDismiss = useCallback((task) => {
    //* This should be a delete request to api/v1/objectives/${objective id}
    //* we should re-render the screen on delete
    setListObjective((listObjective) => listObjective.filter((item) => item.objectiveIndex !== task.objectiveIndex));
  }, []);


  const scrollRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        <ScrollView ref={scrollRef} style={{ flex: 1 }}>
            <ListItem objectiveInfo={objectiveInfo}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  title: {
    fontSize: 40,
    color: 'white',
    marginVertical: 20,
    paddingLeft: '5%',
  },
});

export default editProfile;