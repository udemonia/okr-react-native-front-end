
//* For this screen,
//* We will take the ID, passed from the objectives screen
//* And call out to /api/v1/objectives/id/keyresults


import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions, ScrollView, Animated } from 'react-native'

import data from '../_data/ObjectiveKeyResults.json' // soon to be Axios

import AppLoading from 'expo-app-loading';
// import { StatusBar } from 'expo-status-bar';
import { ProgressBar, Colors } from 'react-native-paper'
import dayjs from 'dayjs';

import {
    useFonts,
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold
  } from '@expo-google-fonts/nunito';
import { Feather, Foundation } from '@expo/vector-icons'; 
import { Searchbar } from 'react-native-paper';
const { height, width } =Dimensions.get('window')
console.disableYellowBox = true

const objectiveDetail = ({ route, navigation }) => {

  console.log(width, height)

  //* Grab the ID from the router to use with Axios
  //* `/api/v1/objectives/${searchObjectiveId}/keyresults`
  const passedData = route.params
  const searchObjectId = passedData._id

  console.log('try   4')


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
      <ScrollView style={{ backgroundColor: 'white', flex: 1}}>
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

                        <Text style={styles.objTextDescription} >description</Text>

                          {/* Flex Row for grey bar plus description */}

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
                                            {/* Days Remaining */}
                          <View style={styles.percentRowBox}>
                              <View style={styles.percentRowBoxUnits}>
                                  <Text style={styles.percentCompleteText}>{ daysLeft(today, item.objectiveEndDate) > 0 ? 'days remaining' :'completed ✓' }</Text>
                                  <Text style={styles.percentCompleteTextP}>{ daysLeft(today, item.objectiveEndDate) + ' / ' + objectiveDays(item.objectiveStartDate, item.objectiveEndDate)  }</Text>
                              </View>
                              <View style={styles.statusBarBox}>
                                  <ProgressBar progress={ 1 -Math.round(daysLeft(today, item.objectiveEndDate) / objectiveDays(item.objectiveStartDate, item.objectiveEndDate) * 100) / 100 } colors={Colors.red200}/>
                              </View>
                            </View>

                                    {/* Percent Complete Progress bar */}

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

          <Text style={styles.percentCompleteTextHorizontal}>key results</Text>

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
            // onScroll={Animated.event(
            //   [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
            // )} 
            renderItem={({ item }) => {
              return (
                <View style={styles.horizontalScrollingCard}>
                      
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                  <View>
                    <Feather name="check" size={20} color="blue" />
                    <Text>{`${item.name}`}</Text>
                  </View>
                </View>
                            <TextInput 
                              style={styles.keyResultDescriptionText}
                              scrollEnabled={false}
                              selectTextOnFocus={false}
                              editable={false}
                              multiline={true}
                              value={item.description}
                              />

                                  {/* <View style={styles.objectiveDates}>
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
                    
                                  </View> */}

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
                              )
                            }}
                          />

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
                  style={{opacity: opacity, height: 10, width: 10, backgroundColor: '#210347', borderRadius: 5, paddingHorizontal: 3}}


                />
              )
            })}


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
  paddingLeft: 1,
  paddingRight: 1,
  flex: 1,
  alignItems: 'stretch',
  justifyContent: 'center',
  backgroundColor: 'white'
},
textStyles: {
  marginVertical: 2
},
keyResultCardTop2: {
  flex: 1,
  backgroundColor: '#6200ff',
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
objectiveCard: {
  marginLeft: 10,
  marginRight: 10,
  backgroundColor: 'white',
  margin: 2,
  borderColor: '#F4F4ED',
  borderWidth: 2,
  borderRadius: 10,
  marginVertical: 10,
  padding: 2,
  // shadowColor: "#8093F1",
  // shadowOffset: {
  //     width: 0,
  //     height: 7,
  // },
  // shadowOpacity: 0.41,
  // shadowRadius: 9.11,
  // elevation: 14,
  },
objectiveCardDetails: {
  margin: 2,
  padding: 3
},
atRiskObjectiveCard: {
  marginLeft: 10,
  marginRight: 10,
  backgroundColor: 'white',
  borderColor: '#F4F4ED',
  borderWidth: 2,
  borderRadius: 10,
  marginVertical: 10,
  padding: 2,
  // shadowColor: "#8093F1",
  // shadowOffset: {
  //     width: 0,
  //     height: 7,
  // },
  // shadowOpacity: 0.41,
  // shadowRadius: 9.11,
  // elevation: 14,
},

objectiveCardDetails: {
  margin: 8,
  padding: 3
},
nameAndEditRow: {
  paddingTop: 2,
  marginTop: 5,
  marginLeft: 5,
  flexDirection: 'row',
  justifyContent: 'flex-start',
},
editButton: {
  paddingRight: 3,
  justifyContent: 'center'
},
objTextDescription: {
  marginTop: 6,
  paddingTop: 6,
  marginBottom: 10,
  color: '#8093F1',
  fontSize: 18,
  fontFamily: 'Nunito_300Light'
},
objectiveTitleText: {
  maxWidth: '85%',
  padding: 2,
  color: '#6200ff',
  fontSize: 20,
  fontFamily: 'Nunito_700Bold',
  borderLeftWidth: 2,
  borderLeftColor: '#F4F4ED'
},
objectiveDescriptionText: {
  paddingLeft: 10,
  marginLeft: 4,
  marginBottom: 18,
  paddingBottom: 3,
  color: '#B0B0B0',
  fontSize: 18,
  fontFamily: 'Nunito_300Light',
  borderLeftWidth: 3,
  borderLeftColor: '#F4F4ED'
},
objectiveDates: {
  flexDirection: 'row',
  justifyContent: 'space-between'
},
dateStart: {
  alignItems: 'stretch',
  justifyContent: 'center'

},
dateEnd: {
  alignItems: 'stretch',
  justifyContent: 'center'
},
startEndLabels: {
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: 18,
  fontFamily: 'Nunito_300Light'
},
DateBoxText: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#8093F1',
  padding: 4,
  margin: 4,
  borderRadius: 6
},
dateText: {
  color: '#B388EB',
  padding: 2,
  marginBottom: 2,
  marginTop: 2
},
percentRowBoxUnits: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: 4,
  marginTop: 15
},
percentCompleteText: {
  marginTop: 6,
  marginBottom: 6,
  color: '#8093F1',
  fontSize: 18,
  fontFamily: 'Nunito_300Light'
},
percentCompleteTextP: {
  marginTop: 6,
  marginBottom: 6,
  color: '#8093F1',
  fontSize: 16,
  fontFamily: 'Nunito_300Light'
},
statusBarBox: {
  marginLeft: 10,
  marginRight: 10,
  paddingTop: 4,
  paddingBottom: 8
},
searchBarBox: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 10,
  paddingRight: 10,
  marginBottom: 10,
  paddingBottom: 2,
  marginTop: 2,
  marginTop: 20
},
searchBar: {
  maxHeight: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
horizontalScrollingCard:{
  // flex: 1,
  // alignItems: 'center',
  // justifyContent: 'center',
  marginVertical: 5,
  width: width - 40,

  marginHorizontal: 20,
  // width: 'width' -1,
  // marginTop: 5,
  // padding: 6,
},
// cardStyle: {
//   // width: CARD_WIDTH,
//   // height: CARD_HEIGHT,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'green',
//   margin: 5,
//   borderRadius: 15
// },
keyResultCardTop2Horizontal: {
  flex: 1,
  backgroundColor: '#8093F1',
  borderRadius: 10,
  shadowColor: "#000",
  marginTop: 10,
  marginBottom: 10,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
  },
objectivenameRowHorizontal: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  objectiveIconHorizontal: {
    padding: 10,
    paddingLeft: 10,
    marginLeft: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  keyResultTextHorizontal: {
    flex: 1,
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginLeft: 4,
    fontSize: 18,
    fontFamily: 'Nunito_400Regular'
  },
  keyResultDescriptionText: {
    paddingLeft: 10,
    marginLeft: 4,
    marginBottom: 5,
    paddingBottom: 3,
    color: '#808080',
    fontSize: 18,
    fontFamily: 'Nunito_400Regular',
    borderLeftWidth: 3,
    borderLeftColor: '#F4F4ED'
},
percentCompleteTextHorizontal: {
  marginLeft: 5,
  marginTop: 20,
  marginBottom: 6,
  color: '#8093F1',
  fontSize: 18,
  fontFamily: 'Nunito_300Light'
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
