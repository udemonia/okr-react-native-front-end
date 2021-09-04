import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native'
import data from '../_data/objectives.json'
import AppLoading from 'expo-app-loading';
// import { StatusBar } from 'expo-status-bar';
import { ProgressBar, Colors } from 'react-native-paper'
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FabButton from '../components/fabButtons';

import {
    useFonts,
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold
  } from '@expo-google-fonts/nunito';

import { Feather, Foundation, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Searchbar } from 'react-native-paper';
import colors from '../colors/lightMode'
import { color } from 'react-native-reanimated';
import OKRsContext from '../context/okrContext';


const objectivesView = ({ route, navigation }) => {

    let JWTtoken = route.params.data.JWTtoken

    const { objectivesArray, getObjectives } = useContext(OKRsContext)

    // todo add search back and add filtering

    useEffect(() => {
        console.log('used Effect?')
        getObjectives(JWTtoken)
    }, [])

    //* Data and Search Data -
    // const [search, setSearch] = useState('');
    // const [ filteredDataSource, setFilteredDataSource ] = useState(objectivesArray);
    // const [ masterDataSource, setMasterDataSource ] = useState(objectivesArray);

    // const [ doSearch, setDoSearch ] = useState(false)

    // const updateState = () => {
    //     //* on update button we
    //     //* call add objective callback
    //     //* update our state hooks start anew
    //     setMasterDataSource(objectivesArray)
    //     setFilteredDataSource(objectivesArray)
    //     searchFilterFunction('')
    // }
    
    //* Get the access token 
    //todo how can we pass this along - or use redux




    //* Open/Closed/All FAB filter logic 
    // const [ openClosedFilter, setOpenClosedFilter ] = useState('')

    // const whatToShow = (masterDataSource) => {
    //     if (openClosedFilter == '') {
    //         return
    //     }
    //     return openClosedFilter === 'open' ? masterDataSource.marginTop((objective) => )
    // }

    // const searchFilterFunction = (text) => {
    //     if (text) {
    //     // setDoSearch(true)
    //       const newData = masterDataSource.filter(function (item) {
    //         const itemData = item.name
    //           ? item.name.toUpperCase()
    //           : ''.toUpperCase();
    //         const textData = text.toUpperCase();
    //         return itemData.indexOf(textData) > -1;
    //       });
    //       setFilteredDataSource(newData);
    //       setSearch(text);
    //     } else {
    //       setFilteredDataSource(masterDataSource);
    //       setSearch(text);
    //     }
    //   };

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

                <View style={styles.searchBarBox}>

                {/* <Searchbar
                    searchIcon={{ size: 24 }}
                    onChangeText={(text) => searchFilterFunction(text)}
                    onClear={ (text) => {
                        setSearch(false)
                        return searchFilterFunction('')}}
                    placeholder="Objective Title"
                    value={search}
                    >
                </Searchbar> */}
{/* TEST */}


{/* TEST */}
                </View>

                <FlatList
                keyExtractor={(item, index) => index.toString()}
                navigation={navigation}
                showsVerticalScrollIndicator={false}
                data={objectivesArray}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.textStyles}>


                            <View style={!item.atRisk ? styles.objectiveCard : styles.atRiskObjectiveCard}>
                            <View style={styles.objectiveCardDetails}>


                            <View style={styles.nameAndEditRow}>
                                    <Text style={styles.objectiveTitleText}>objective</Text>

                                    <TouchableOpacity 
                                        onPress={() => navigation.navigate('ObjectiveDetail', {
                                            _id: item._id,
                                            name: item.name,
                                            atRisk: item.atRisk,
                                            description: item.description,
                                            objectiveEndDate: item.objectiveEndDate,
                                            objectiveStartDate: item.objectiveStartDate,
                                            percentComplete: item.percentComplete
                                        })}
                                        style={styles.editButton}
                                        >
                                        <Feather name="arrow-right" size={22} color={color.mediumPurple} />
                                    </TouchableOpacity>
                                </View>


                                <View style={styles.keyResultCardTop2}>
                                    <View style={styles.objectivenameRow}>
                                            <Feather style={styles.objectiveIcon} name="target" size={38} color="white" />
                                            <Text style={styles.objectivenameTextTop}>{`${item.name}`}</Text>
                                    </View>
                                </View>


                                {/* flex Row for title + edit */}
                                {/* <View>
                                    <Text style={styles.objTextDescription}></Text>
                                </View> */}



                                {/* <Text style={styles.objTextDescription} >description</Text> */}

                                {/* Flex Row for grey bar plus description */}

                                {/* <View style={styles.textDescriptionRow}>

                                    <TextInput 
                                        style={styles.objectiveDescriptionText}
                                        scrollEnabled={false}
                                        selectTextOnFocus={false}
                                        editable={false}
                                        multiline={true}
                                        value={item.description}
                                        />

                                </View> */}



                                <View style={styles.objectiveDates}>
                                    <View style={styles.dateStart}>
                                        <View style={styles.DateBoxText}>
                                            <Text style={styles.startEndLabels}>start</Text>
                                        </View>

                                        <Text style={styles.dateText}>{dayjs(item.objectiveStartDate.split('T')[0]).format('MM/DD/YYYY')}</Text>

                                    </View>

                                    <View style={styles.dateEnd}>

                                        <View style={styles.DateBoxText}>
                                            <Text style={styles.startEndLabels}>end</Text>
                                        </View>
                                        
                                        <Text style={styles.dateText}>{dayjs(item.objectiveEndDate.split('T')[0]).format('MM/DD/YYYY')}</Text>
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
                <FabButton data={objectivesArray}></FabButton>
            </View>
        )
    
    }


};

const styles = StyleSheet.create({
    text: {
        paddingLeft: 1,
        paddingRight: 1,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    textStyles: {
        marginVertical: 5
    },
    keyResultCardTop2: {
        flex: 1,
        backgroundColor: colors.purpleObjectiveTile,
        fontWeight: 'bold',
        borderRadius: 5,
        shadowColor: "#000",
        marginTop: 20,
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
            paddingTop: 10,
            paddingBottom: 10,
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
        borderRadius: 5,
        marginVertical: 10,
        padding: 2,

        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        
        // elevation: 5,
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
        borderRadius: 5,
        marginVertical: 10,
        padding: 2,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        
        // elevation: 5,
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
        color: colors.grey,
        fontSize: 18,
        fontFamily: 'Nunito_300Light'
    },
    objectiveTitleText: {
        maxWidth: '85%',
        padding: 2,
        color: colors.mediumPurple,
        fontSize: 16,
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
        color: colors.darkPurple,
        fontSize: 18,
        fontFamily: 'Nunito_300Light'
    },
    DateBoxText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGrey,
        padding: 4,
        margin: 4,
        borderRadius: 5
    },
    dateText: {
        color: colors.darkPurple,
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
        color: colors.darkBlue,
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
        paddingTop: 10,
        paddingBottom: 20
    },
    searchBarBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 2,
        paddingBottom: 2,
        marginTop: 2,
        marginTop: 20
    },
    searchBar: {
        maxHeight: 40,
        alignItems: 'center',
        justifyContent: 'center',
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