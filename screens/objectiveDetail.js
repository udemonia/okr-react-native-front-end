//* For this screen,
//* We will take the ID, passed from the objectives screen
//* And call out to /api/v1/objectives/id/keyresults


import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions, ScrollView, Animated } from 'react-native'
import data from '../_data/ObjectiveKeyResults.json' // soon to be Axios
import AppLoading from 'expo-app-loading';
import { ProgressBar, Colors } from 'react-native-paper'
import { SwipeListView } from 'react-native-swipe-list-view';
import dayjs from 'dayjs';

import {
    useFonts,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold
  } from '@expo-google-fonts/nunito';
import { Feather, Foundation } from '@expo/vector-icons'; 
import { Searchbar } from 'react-native-paper';
const { height, width } =Dimensions.get('window')
import colors from '../colors/lightMode'



const objectiveDetail = ({ route, navigation }) => {

  const objectiveID = route.params._id
  const JWTtoken = route.params.JWTtoken


  //* Grab the ID from the router to use with Axios
  //* `/api/v1/objectives/${searchObjectiveId}/keyresults`
  const passedData = route.params
  const searchObjectId = passedData._id



  let objectiveFilter = []
  objectiveFilter.push(data[0].objective)


  //* Data and Search Data 
  const objectives = data.objective

  // console.log(data)

  let [ fontsLoaded, err ] = useFonts({
      Nunito_300Light,
      Nunito_400Regular,
      Nunito_700Bold
  })


  let today = dayjs().format()

  function objectiveDays(day1, day2) {
      //* Found out how many days are between two dates
      let startTime = dayjs(day1)
      let endTime = dayjs(day2)
      let hours = endTime.diff(startTime, 'hours');
      const days = Math.floor(hours / 24);
      return days

  }

  function daysLeft(todaysDate, objectiveEndDate) {
      let startTime = dayjs(todaysDate)
      let endTime = dayjs(objectiveEndDate)
      let hours = endTime.diff(startTime, 'hours');
      let days = Math.floor(hours / 24);
      if (days < 0) {
          days = 0;
      }
      return days
  }

  const scrollX = new Animated.Value(0)
  let position = Animated.divide(scrollX, width)

  if (!fontsLoaded) {
      return <AppLoading />
  } else {
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>

        <View style={{justifyContent: 'space-between', flexDirection: 'column'}}>

        <View style={styles.text}>
          <FlatList
          keyExtractor={(item, index) => index.toString()}
          navigation={navigation}
          showsVerticalScrollIndicator={false}
          data={objectiveFilter}
          snapToAlignment='center'
          renderItem={({ item }) => {
              return (
                  <View style={styles.textStyles}>
                    <View style={!item.atRisk ? styles.objectiveCard : styles.atRiskObjectiveCard}>
                      <View style={styles.objectiveCardDetails}>
                        <View style={styles.keyResultCardTop2}>
                          <View style={styles.objectivenameRow}>
                            <Feather style={styles.objectiveIcon} name="target" size={28} color="white" />
                            <Text style={styles.objectivenameTextTop}>{`${item.name}`}</Text>
                          </View>
                        </View>

                        <View style={styles.textDescriptionRow}>
                          <TextInput 
                            style={styles.objectiveDescriptionText}
                            scrollEnabled={false}
                            selectTextOnFocus={false}
                            editable={false}
                            multiline={true}
                            value={item.description}
                            />
                        </View>
                        <View style={styles.objectiveDates}>
                          <View style={styles.dateStart}>
                            <View style={styles.DateBoxText}>
                              <Text style={styles.startEndLabels}>start</Text>
                            </View>
                            <Text style={styles.dateText}>{item.objectiveStartDate.split('T')[0]}</Text>
                          </View>
                            <View style={styles.dateEnd}>
                              <View style={styles.DateBoxText}>
                                <Text style={styles.startEndLabels}>end</Text>
                              </View>
                                <Text style={styles.dateText}>{item.objectiveEndDate.split('T')[0]}</Text>
                              </View>
                          </View>
                  
                          <View style={styles.percentRowBox}>
                              <View style={styles.percentRowBoxUnits}>
                                  <Text style={styles.percentCompleteText}>{ daysLeft(today, item.objectiveEndDate) > 0 ? 'days remaining' :'completed ✓' }</Text>
                                  <Text style={styles.percentCompleteTextP}>{ daysLeft(today, item.objectiveEndDate) + ' / ' + objectiveDays(item.objectiveStartDate, item.objectiveEndDate)  }</Text>
                              </View>
                              <View style={styles.statusBarBox}>
                                  <ProgressBar progress={ 1 -Math.round(daysLeft(today, item.objectiveEndDate) / objectiveDays(item.objectiveStartDate, item.objectiveEndDate) * 100) / 100 } colors={Colors.red200}/>
                              </View>
                            </View>


                            <View style={styles.percentRowBox}>
                              <View style={styles.percentRowBoxUnits}>
                                <Text style={styles.percentCompleteText}>percent complete</Text>
                                <Text style={styles.percentCompleteTextP}>{item.percentComplete + '%'}</Text>
                              </View>

                              <View style={styles.statusBarBox}>
                                  <ProgressBar progress={item.percentComplete / 100} colors={Colors.purple600}/>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
              )
          }}
          />

        <View> 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.percentCompleteTextHorizontal}>{`${data.length} key results`}</Text>
        </View>

      <View style={styles.swipeCard}>

          <FlatList
            keyExtractor={( item, index ) => index.toString()}
            decelerationRate={0}
            horizontal
            scrollEventThrottle={16}
            decelerationRate='fast'
            pagingEnabled={true}
            snapToAlignment="center"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }]
            )} 
            showsHorizontalScrollIndicator={false}
            legacyImplementation={true}
            navigation={navigation}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.horizontalScrollingCard}>

                      <View style={styles.nameAndEditRow}>
                            <TouchableOpacity 
                                        onPress={() => navigation.navigate('ObjectiveDetail')}
                                        style={styles.editButton}
                                        >
                                        <Feather name="check" size={22} color="#00008B" />
                                    </TouchableOpacity>
                            <Text style={styles.objectiveTitleText}>{item.name}</Text>


                                </View>
                      
                            <TextInput 
                              style={styles.keyResultDescriptionText}
                              scrollEnabled={false}
                              selectTextOnFocus={false}
                              editable={false}
                              multiline={true}
                              value={item.description}
                              />
                                  <View style={styles.objectiveDates}>
                                    <View style={styles.dateStart}>
                                        <View style={styles.DateBoxText}>
                                            <Text style={styles.startEndLabels}>current</Text>
                                        </View>

                                        <Text style={styles.dateText}>{item.currentValue}</Text>

                                    </View>

                                    <View style={styles.dateEnd}>

                                        <View style={styles.DateBoxText}>
                                            <Text style={styles.startEndLabels}>target</Text>
                                        </View>
                                        
                                        <Text style={styles.dateText}>{item.targetValue}</Text>
                                    </View>
                    
                                  </View>

                                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 1}}>
                                  <View style={styles.percentRowBox}>
                                    <View style={styles.percentRowBoxUnits}>
                                        <Text style={styles.percentCompleteText}>key result progress</Text>
                                        <Text style={styles.percentCompleteTextP}>{ `${item.progress}%` }</Text>
                                    </View>

                                    <View style={styles.statusBarBox}>
                                        <ProgressBar progress={ item.currentValue / item.targetValue } colors={Colors.pink100}/>
                                    </View>
                                                          
                                </View>

                                  </View>
                              
                                </View>
                              )
                            }}
                          />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.dotView}>
            {data.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i-1, i, i+1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              })
              return (
                 <Animated.View
                  key={i}
                  style={{opacity: opacity, height: 8, width: 8, backgroundColor: '#55388C', borderRadius: 4, marginTopHorizontal: 3}}
                  />
                )
               })}
              </View>
             </View>
            </View>
          </View> 
      </ScrollView>
  )

}


};

const styles = StyleSheet.create({
  dotView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 3,
    paddingVertical: 10
  },
  text: {
    marginTop: 20,
    paddingLeft: 1,
    paddingRight: 1,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  textStyles: {
    paddingHorizontal: 8,
    marginVertical: 8
  },
keyResultCardTop2: {
  flex: 1,
  backgroundColor: colors.purpleObjectiveTile,
  borderRadius: 10,
  shadowColor: "#000",
  marginTop: 2,
  marginBottom: 10,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
  },
  objectivenameRow: {
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 5,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    objectiveIcon: {
      padding: 10,
      marginLeft: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    objectivenameTextTop: {
      flex: 1,
      maxWidth: '70%',
      textAlignVertical: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      marginLeft: 4,
      fontSize: 18,
      fontFamily: 'Nunito_400Regular'
    },
objectiveCardDetails: {
  margin: 2,
  padding: 3
},

objectiveCardDetails: {
  margin: 8,
  padding: 3
},
nameAndEditRow: {
  paddingTop: 2,
  marginTop: 5,
  flexDirection: 'row',
  justifyContent: 'center'
},
// editButton: {
//   justifyContent: 'center'
// },
objectiveTitleText: {
  textAlign: 'center',
  maxWidth: '85%',
  padding: 2,
  color: colors.darkBlue,
  fontSize: 18,
  fontFamily: 'Nunito_700Bold',
  borderLeftWidth: 2,
  borderLeftColor: '#F4F4ED'
},
objectiveDescriptionText: {
  paddingLeft: 10,
  marginLeft: 4,
  marginBottom: 18,
  paddingBottom: 3,
  color: colors.grey,
  fontSize: 18,
  fontFamily: 'Nunito_300Light',
  borderLeftWidth: 3,
  borderLeftColor: '#F4F4ED'
},
objectiveDates: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  textAlign: 'center',

},
dateStart: {
  textAlign: 'center',
  alignItems: 'stretch',

},
dateEnd: {
  alignItems: 'stretch',
  justifyContent: 'center',
},
startEndLabels: {
  alignItems: 'stretch',
  justifyContent: 'center',
  color: colors.darkPurple,
  fontSize: 18,
  fontFamily: 'Nunito_300Light',

},
DateBoxText: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: colors.lightGrey,
  padding: 4,
  margin: 4,
  borderRadius: 6
},
dateText: {
  textAlign: 'center',
  color: colors.darkPurple,
  padding: 2,
  marginBottom: 2,
  marginTop: 2
},

percentRowBoxUnits: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: 10,
  marginTop: 5
},
percentCompleteText: {
  marginTop: 6,
  marginBottom: 6,
  color: colors.darkPurple,
  fontSize: 18,
  fontFamily: 'Nunito_300Light'
},
percentCompleteTextP: {
  marginTop: 6,
  marginBottom: 6,
  color: colors.darkPurple,
  fontSize: 16,
  fontFamily: 'Nunito_300Light'
},
statusBarBox: {
  marginLeft: 10,
  marginRight: 10,
  paddingTop: 4,
  paddingBottom: 8
},
horizontalScrollingCard:{
  // // flex: 1,
  // flexDirection: 'column',
  // alignContent: 'space-around',
  // marginVertical: 5,
  width: width - 40,
  marginHorizontal: 20,
},
  keyResultDescriptionText: {
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 3,
    paddingTop: 3,
    color: colors.grey,
    fontSize: 18,
    fontFamily: 'Nunito_400Regular',
},
percentCompleteTextHorizontal: {
  textAlign: 'center',
  paddingHorizontal: 10,
  marginTop: 20,
  marginBottom: 6,
  color: colors.pink,
  fontSize: 18,
  fontFamily: 'Nunito_700Bold'
},

});


const colorPallette = {
hotpink: '#ff375a',
pink: '#f7aef8',
lightPurple: '#B388EB',
darkPurple: '#8093F1',
brightPurple: '#8E24AA',
lightBlue: '#72DDF7',
grey: '#F4F4ED',
ashGrey: 	'#B2BEB5',
blueGrey: '#7393B3'
}


export default objectiveDetail;
