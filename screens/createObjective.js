import React, {useState} from 'react';
import {StyleSheet, View, Text, Platform, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../colors/lightMode'
import { Modal, Portal, Provider, Button, TextInput } from 'react-native-paper';
import ObjectiveDateSelector from '../components/datePicker'



const createObjective = (props) => {
  let today = dayjs().format('YYYY-MM-DD')
  const [name, setName] = React.useState('');
  const [startDate, setStartDate] = React.useState(today);
  const [ startDateVisible, setStartDateVisible ] = useState(false)

  const togglePicker = () => {
    setVisible(!startDateVisible);
    // setIsPickerShow(!isPickerShow)
  }

  return (

    <Provider style={{ flex: 1}}>
      <View style={{ flex: 1}}>
      <TextInput
        style={{backgroundColor: 'white', marginHorizontal: 10}}
        label="Objective Title"
        value={name}
        onChangeText={name => setName(name)}
      />


      <TouchableHighlight
        underlayColor={'white'}
        onPress={togglePicker}
        
      >
       <TextInput
         style={{backgroundColor: 'white', marginHorizontal: 10}}
         label="Start Date"
         value={startDate}
         onChangeText={startDate => setStartDate(startDate)}
       />
      </TouchableHighlight>
      <TextInput
        style={{backgroundColor: 'white', marginHorizontal: 10}}
        label="Objective Title"
        value={name}
        onChangeText={name => setName(name)}
      />
      </View>

      <ObjectiveDateSelector startDateVisible={startDateVisible}></ObjectiveDateSelector>
    </Provider>
  );
};

// just add some styles to make our app look more beautiful
// This is not the focus of this article
const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // flex: 1,
    // justifyContent: 'center',
    // padding: 50,
  }
});

export default createObjective;