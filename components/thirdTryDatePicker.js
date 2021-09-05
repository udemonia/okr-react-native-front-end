import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const ThirdTryDatePicker = (props) => {

    const { startDateVisible } = props
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(true);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

    return (
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            neutralButtonLabel="clear"
            value={date}
            mode={'date'}
            is24Hour={false}
            display='spinner'
            onChange={onChange}
          />
        )}
      </View>
    );
};  

export default ThirdTryDatePicker;