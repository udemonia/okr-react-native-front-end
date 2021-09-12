
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useState, useContext} from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from './ListItem';
import OKRsContext from '../../context/okrContext';

// https://www.youtube.com/watch?v=AVS_2nzt8Do


const BACKGROUND_COLOR = 'white'

//!-------------------------------------------------------

const editProfile = (props) => {
    const { objectiveInfo, JWTtoken, deleteItem } = props

  const onDismiss = useCallback((task) => {
    deleteItem(JWTtoken, objectiveInfo._id)
    // setListObjective((listObjective) => listObjective.filter((item) => item.objectiveIndex !== task.objectiveIndex));
  }, []);


  const scrollRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        <ScrollView ref={scrollRef} style={{ flex: 1 }}>
            <ListItem
            deleteItem={deleteItem}
            JWTtoken={JWTtoken}
            onDismiss={onDismiss}
            objectiveInfo={objectiveInfo}
            />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    shadowColor: "#000",
    marginTop: 20,
    marginBottom: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    // elevation: 6,
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginVertical: 20,
    paddingLeft: '5%',
  },
});

export default editProfile;