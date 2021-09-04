import React, {useState} from 'react';
import {StyleSheet, View, Text, Platform, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../colors/lightMode'
import { Modal, Portal, Provider, Button } from 'react-native-paper';

const ObjectiveDateSelector = (props) => {
  const { startDateVisible } = props

  let today = dayjs().format('YYYY-MM-DD')

  const [isPickerShow, setIsPickerShow] = useState(true);
  const [visible, setVisible] = React.useState(startDateVisible);

  const showModal = () => setVisible(false);
  const hideModal = () => setVisible(false);

  const [date, setDate] = useState(new Date(Date.now()));

  const togglePicker = () => {
    setVisible(!visible);
    // setIsPickerShow(!isPickerShow)
  }

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  return (
    <Provider>
      <View>
    <TouchableHighlight
      underlayColor={'white'}
      onPress={togglePicker}
    >
      <View style={styles.pickedDateContainer}>
        <Text style={styles.pickedDate}>{dayjs(date).format('MM-DD-YYYY')}</Text>
      </View>
    </TouchableHighlight>

    <Portal>
      <Modal 
        animationType="slide"
        transparent={true}
        visible={visible} 
        onDismiss={hideModal} 
        contentContainerStyle={{
            height: '50%',
            marginTop: 'auto',
            backgroundColor: 'white', 
            padding: 20, 
            marginHorizontal: 20, 
            borderRadius: 10}}>

        <View>
        {isPickerShow && (
        <View>
          <DateTimePicker
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={'date'}
            display="default"
            textColor={colors.mediumPurple}
            display={'default'}
            // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            // is24Hour={true}
            onChange={onChange}
            displayFormat={"DD MMM YYYY"}
            style={styles.datePicker}
          />

          <Button 
            icon="calendar" 
            mode="contained" 
            labelStyle={{fontSize: 20,}}
            style={{marginHorizontal: 20, backgroundColor: colors.mediumPurple}}
            onPress={() => togglePicker()}>
            Select Date
          </Button>

          
          {/* <TouchableOpacity
            underlayColor={'transparent'}
            onPress={() => togglePicker()}
            style={{borderColor: colors.lightBlue, borderWidth: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginVertical: 20, paddingVertical: 20}}
          >
            <Text>Select</Text>
          </TouchableOpacity> */}

        </View>
)}
        </View>

      </Modal>
    </Portal>
</View>
    </Provider>
  );
};


const styles = StyleSheet.create({
  pickedDate: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    fontSize: 18,
    color: 'black',
  },
  datePicker: {
    width: 320,
    height: 260,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default ObjectiveDateSelector;