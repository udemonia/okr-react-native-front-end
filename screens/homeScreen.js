import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import data from '../_data/objectives.json'
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
import { Feather } from '@expo/vector-icons'; 


const objectivesView = ({ navigation }) => {
    console.log(navigation.navigate)

    const objectives = data;
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




    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <View style={styles.text}>
                <FlatList
                keyExtractor={(item, index) => index.toString()}
                navigation={navigation}
                showsVerticalScrollIndicator={false}
                data={objectives}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.textStyles}>
                            <View style={!item.atRisk ? styles.objectiveCard : styles.atRiskObjectiveCard}>
                            <View style={styles.objectiveCardDetails}>
                                {/* flex Row for title + edit */}
                                <View>
                                    <Text style={styles.objTextDescription}></Text>
                                </View>

                                <View style={styles.nameAndEditRow}>
                                    <Text style={styles.objectiveTitleText}>{item.name}</Text>

                                    <TouchableOpacity 
                                        onPress={() => navigation.navigate('userDetails')}
                                        style={styles.editButton}
                                        >
                                        <Feather name="edit" size={22} color="#B388EB" />
                                    </TouchableOpacity>
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
            </View>
        )
    
    }


};

const styles = StyleSheet.create({
    text: {
        padding: 2,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    textStyles: {
        marginVertical: 15
    },
    objectiveCard: {
        backgroundColor: 'white',
        margin: 2,
        borderColor: '#F4F4ED',
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 10,
        padding: 2,
        shadowColor: "#8093F1",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        },
    objectiveCardDetails: {
        margin: 2,
        padding: 3
    },
    atRiskObjectiveCard: {
        backgroundColor: 'white',
        borderColor: '#F4F4ED',
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 10,
        padding: 2,
        shadowColor: "#8093F1",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },

    objectiveCardDetails: {
        margin: 8,
        padding: 3
    },
    nameAndEditRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    editButton: {
        paddingRight: 3,
        justifyContent: 'center'
    },
    objTextDescription: {
        marginTop: 6,
        marginBottom: 10,
        color: '#8093F1',
        fontSize: 18,
        fontFamily: 'Nunito_300Light'
    },
    objectiveTitleText: {
        padding: 2,
        color: '#6200ff',
        fontSize: 30,
        fontFamily: 'Nunito_300Light',
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
        marginBottom: 4,
        marginTop: 4
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
        paddingTop: 10,
        paddingBottom: 20
    }

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

export default objectivesView;