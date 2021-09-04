import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, TextInput, Modal, Platform, TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

// todo - update the logic to always select the next quarter for start/end dates

const ObjectiveDateSelector = (props) => {

  let today = dayjs().format('YYYY-MM-DD')
  const [ date, setDate ] = useState(new Date(1598051730000))
  const [show, setShow ] = useState(true)

  const onChangeEvent = (e, selectedDate ) => {
    setDate(selectedDate)
  }

  const { textStyles } = props

    return (
      <TouchableHighlight
        activeOpacity={0}
        onPress={() => console.log('opened Date Picker')}
      >
      <View>
        <Text style={textStyles}>{today}</Text>

        <Modal
          transparent={true}
          animationType='slide'
          visible={show}
          supportedOrientations={['portrait']}
          onRequestClose={() => setShow(false)}
        >
          <View style={{flex: 1}}>
          <TouchableHighlight style={{
              flex: 1, 
              alignItems: 'flex-end',
              flexDirection: 'row'
              }} 
              activeOpacity={1}
              visible={show}
              onPress={() => setShow(false)}
              >
                <TouchableHighlight
                  underlayColor={'white'}
                  style={{borderTopColor: 'grey', borderTopWidth: 1}}
                  onPress={() => console.log('Date Picker Picked')}

                >

                  <View style={{
                    backgroundColor: 'white',
                    height: 256,
                    overflow: 'hidden'
                      }}>

                    <View style={{marginTop: 20}}>
                      <DateTimePicker 
                        timeZoneOffsetInMinutes={0}
                        value={new Date()}
                        mode={date}
                        is24Hour={true}
                        onChange={onChangeEvent}
                        format={"YYYY-MM-DD"}
                        displayFormat={"DD MMM YYYY"}
                      
                      />

                    </View>
                  </View>

                  {/* <TouchableHighlight
                    underlayColor={'transparent'}
                    // onPress={onPressCancel}
                    style={{
                      
                    }}
                  >

                  </TouchableHighlight> */}



                </TouchableHighlight>

              </TouchableHighlight>
          </View>

        </Modal>
      </View>
      </TouchableHighlight>
    )

    };

ObjectiveDateSelector.defaultProps = {
  textStyles: {}
}

export default ObjectiveDateSelector;