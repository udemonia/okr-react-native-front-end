import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import data from '../_data/keyResults.json'
import AppLoading from 'expo-app-loading';
// import { StatusBar } from 'expo-status-bar';
import { ProgressBar, Colors } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Searchbar } from 'react-native-paper';
// import searchBar from '../components/searchBar' // npm install to use

import {
    useFonts,
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold
  } from '@expo-google-fonts/nunito';
import { Feather } from '@expo/vector-icons'; 


const keyResultsView = ({ navigation }) => {

    const keyResultData = data;
    const [searchQuery, setSearchQuery] = React.useState('');
    const [ results, setKeyResultData ] = React.useState(keyResultData)
    const onChangeSearch = query => setSearchQuery(query);

    console.log(navigation.navigate)
    let [ fontsLoaded, err ] = useFonts({
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold
    })


    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <View style={styles.text}>

                    <View style={styles.searchBarBox}>
                        <Searchbar 
                            placeholder='key result title' 
                            clearButtonMode={true}
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            >
                        </Searchbar>
                    </View>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  navigation={navigation}
                  showsVerticalScrollIndicator={false}
                  data={results}
                  renderItem={({ item }) => {
                    return (
                        <View style={styles.textStyles}>

                            <View style={!item.atRisk ? styles.keyResultCard : styles.atRiskKeyResultCard}>
                            <View style={styles.keyResultCardDetails}>


                            <View style={styles.keyResultCardTop}>
                                <View style={styles.objectiveTitleRow}>
                                    <Feather style={styles.objectiveIcon} name="target" size={38} color="white" />
                                    <Text style={styles.objectiveTitleTextTop}>{`${item.objective.name}`}</Text>
                                </View>
                            </View>
                                <Text style={styles.objTextDescription} >key result</Text>
                                <View style={styles.nameAndEditRow}>
                                    <Text style={styles.objectiveTitleText}>{`✓ ${item.name}`}</Text>

                                    <TouchableOpacity 
                                        onPress={() => navigation.navigate('userDetails')}
                                        style={styles.editButton}
                                        >
                                        <Feather name="edit-2" size={20} color="#6200ff" />
                                    </TouchableOpacity>
                                </View>



                                <Text style={styles.objTextDescription} >description</Text>

                                {/* Flex Row for grey bar plus description */}

                                <View style={styles.textDescriptionRow}>

                                    <TextInput 
                                        style={styles.keyResultDescriptionText}
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

                                                  {/* Days Remaining */}

                                <View style={styles.percentRowBox}>
                                    <View style={styles.percentRowBoxUnits}>
                                        <Text style={styles.percentCompleteText}>key result progress</Text>
                                        <Text style={styles.percentCompleteTextP}>{ `${item.progress}%` }</Text>
                                    </View>

                                    <View style={styles.statusBarBox}>
                                        <ProgressBar progress={ item.currentValue / item.targetValue } colors={Colors.red200}/>
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
        paddingLeft: 4,
        paddingRight: 4,
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    textStyles: {
        marginVertical: 15
    },
    keyResultCard: {
        backgroundColor: 'white',
        margin: 2,
        borderColor: '#F4F4ED',
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 10,
        padding: 2,
        shadowColor: "#00008B",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
        },
    keyResultCardDetails: {
        margin: 2,
        padding: 3
    },
    atRiskKeyResultCard: {
        backgroundColor: 'white',
        borderColor: '#F4F4ED',
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 10,
        padding: 2,
        shadowColor: "#00008B",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    keyResultCardTop: {
        flex: 1,
        backgroundColor: '#6200ff',
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
    keyResultCardDetails: {
        margin: 8,
        padding: 3
    },
    objectiveTitleRow: {
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
    objectiveTitleTextTop: {
      flex: 1,
      maxWidth: '80%',
      textAlignVertical: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      marginLeft: 4,
      fontSize: 18,
      fontFamily: 'Nunito_400Regular'
    },
    nameAndEditRow: {
        flex: 1,
        marginTop: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    editButton: {
        paddingRight: 3,
        justifyContent: 'center'
    },
    objTextDescription: {
        maxWidth: '90%',
        marginTop: 18,
        marginBottom: 10,
        color: '#8093F1',
        fontSize: 18,
        fontFamily: 'Nunito_300Light'
    },
    objectiveTitleText: {
        maxWidth: '80%',
        padding: 2,
        color: '#00008B',
        fontSize: 30,
        fontFamily: 'Nunito_300Light',
        borderLeftWidth: 2,
        borderLeftColor: '#F4F4ED'
    },
    keyResultDescriptionText: {
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8093F1',
        padding: 4,
        margin: 4,
        borderRadius: 6
    },
    dateText: {
        textAlign: 'center',
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
    },
    searchBarBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 2,
        paddingBottom: 2,
        marginTop: 2,
        marginTop: 6
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

export default keyResultsView;