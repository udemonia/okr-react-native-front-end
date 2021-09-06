// import React, {useState} from 'react';
// import {StyleSheet, View, Text, Platform, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
// import dayjs from 'dayjs';
// import * as yup from 'yup'
// import { Formik } from 'formik'

// import utc from 'dayjs/plugin/utc'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import colors from '../colors/lightMode'
// import { Modal, Portal, Provider, Button, TextInput } from 'react-native-paper';
// import ObjectiveDateSelector from '../components/datePicker'
// import ThirdTryDatePicker from '../components/thirdTryDatePicker'

// let schema = yup.object().shape({
//   name: yup.string().required()
// });

// const createObjective = (props) => {
//   let today = dayjs().format('YYYY-MM-DD')
//   const [name, setName] = React.useState('');
//   const [startDate, setStartDate] = React.useState(today);
//   const [ startDateVisible, setStartDateVisible ] = useState(false)

//   const togglePicker = () => {
//     setStartDateVisible(true);
//   }

//   return (
//       <View style={{ flex: 1,     backgroundColor: 'white'}}>
//         <View style={{paddingVertical: 20, marginHorizontal: 10}}>
//           <TextInput
//             style={{backgroundColor: 'white'}}
//             label="objective title"
//             value={name}
//             onChangeText={name => setName(name)}
//           />
//           <TouchableHighlight
//             activeOpacity={.5}
//             underlayColor={'white'}
//           >
//               <TextInput
//                 style={{backgroundColor: 'white'}}
//                 label="start date"
//                 scrollEnabled={false}
//                 placeholder="MM-DD-YYYY"
//                 keyboardType = 'numeric'
//                 selectTextOnFocus={false}
//                 onFocus={togglePicker}
//                 editable={true}
//                 caretHidden={true}
//                 // value={startDate}
//                 onChangeText={startDate => setStartDate(startDate)}
//               />
//           </TouchableHighlight>
//           <TextInput
//             style={{backgroundColor: 'white'}}
//             label="description"
//             value={name}
//             onChangeText={name => setName(name)}
//           />
// {/* 
//           <View style={{margin: 20}}>
//             <View>
//               <ThirdTryDatePicker startDateVisible={startDateVisible}></ThirdTryDatePicker>
//             </View>
//             <View>
//               <ThirdTryDatePicker startDateVisible={startDateVisible}></ThirdTryDatePicker>
//             </View>
//           </View> */}

//         </View>
//       </View>
//   );
// };

// // just add some styles to make our app look more beautiful
// // This is not the focus of this article
// const styles = StyleSheet.create({
//   container: {
//     // display: 'flex',
//     // flexDirection: 'column',
//     // alignItems: 'center',
//     // flex: 1,
//     // justifyContent: 'center',
//     // padding: 50,
//   }
// });

// export default createObjective;



// App.js
import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  // TextInput,
  // Button
} from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Modal, Portal, Provider, Button, TextInput } from 'react-native-paper';
import colors from '../colors/lightMode'
import DatePicker from '../components/datePicker'
import { TextInputMask } from 'react-native-masked-text'



const loginValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Objective Name is Required'),
  description: yup
    .string()
    .required('Objective Description is Required'),
  startDate: yup
    .string().matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, 'Invalid date (dd/mm/yyyy)')
    .required('Start Date is Required'),
  endDate: yup
    .string().matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, 'Invalid date (dd/mm/yyyy)')
    .required('End Date is Required'),
})

const createObjective = () => {
  const [ startDatePlaceHolder, setStartDatePlaceHolder ] = useState('Start Date')
  const [objectiveNamePlaceholder, setObjectiveNamePlaceholder ] = useState('Objective Name')
  const [startDateVisible, setStartDateVisible ] = useState(false)

  return (
    <View style={{flex: 1, alignContent: 'center', paddingHorizontal: 40, backgroundColor: 'white'}}>
        <View style={styles.loginContainer}>
          <Formik
             validationSchema={loginValidationSchema}

             initialValues={{ name: '', description: '', startDate: '', endDate: '' }}

             onSubmit={values => console.log(values)}
           >
             {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
             }) => (
               <>

                <View style={styles.formInput}>

                  <TextInput
                     name="name"
                     label="Objective Name"
                     left={<TextInput.Icon name="check" color={colors.mediumPurple} forceTextInputFocus={true} size={30}/>}
                     mode='flat'
                     selectionColor={colors.mediumPurple}
                     outlineColor={colors.darkPurple}
                    //  outlineColor={!errors.name ? colors.darkPurple : 'red'}
                     placeholder={objectiveNamePlaceholder}
                     style={styles.textInput}
                     onChangeText={handleChange('name')}
                     onBlur={handleBlur('name')}
                     value={values.email}
                     onFocus={() => {
                      setObjectiveNamePlaceholder('')}}
                     autoCapitalize='words'
                    //  keyboardType="email-address"
                   />

                  {(errors.name && touched.name) &&
                    <Text style={styles.errorText}>{errors.name}</Text>
                  }
                </View>


                <View style={styles.formInput}>

                  <TextInput
                    name="description"
                    label="Description"
                    left={<TextInput.Icon name="text" color={colors.mediumPurple} forceTextInputFocus={true} size={30}/>}
                    mode='flat'
                    autoCapitalize='sentences'
                    selectionColor={colors.mediumPurple}
                    outlineColor={colors.darkPurple}
                    spellCheck={false}
                    autoCorrect={false}
                    // outlineColor={!errors.description ? colors.darkPurple : 'red'}
                    placeholder={startDatePlaceHolder}
                    style={styles.textInput}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    multiline={true}
                    value={values.description}
                    autoCapitalize='sentences'
                  />

                  {(errors.description && touched.description) &&
                    <Text style={styles.errorText}>{errors.description}</Text>
                  }

                </View>
                <View style={styles.dateBoxes}> 
                  <View style={styles.formInputDates}>
                    <TextInput
                      name="startDate"
                      label="Start Date"
                      left={<TextInput.Icon name="calendar" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                      mode='flat'
                      selectionColor={colors.mediumPurple}
                      outlineColor={colors.darkPurple}
                      //  outlineColor={!errors.description ? colors.darkPurple : 'red'}
                      placeholder="mm/dd/yyyy"
                      style={styles.textInput}
                      onChangeText={handleChange('startDate')}
                      onBlur={handleBlur('startDate')}
                      value={values.startDate}
                      onFocus={() => {
                        setStartDateVisible(true)
                        setStartDatePlaceHolder('mm/dd/yyyy')}}
                      keyboardType='default'
                      render={props =>
                        <TextInputMask
                          {...props}
                          type={'datetime'}
                          options={{
                            format: 'MM/DD/YYYY'
                          }}
                        />
                      }
                    />

                      {(errors.startDate && touched.startDate) &&
                        <Text style={styles.errorText}>{errors.startDate}</Text>
                      }

                    </View>

                <View style={styles.formInputDates}>
                    <TextInput
                      name="endDate"
                      label="End Date"
                      left={<TextInput.Icon name="calendar" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                      mode='flat'
                      selectionColor={colors.mediumPurple}
                      outlineColor={colors.darkPurple}
                      // outlineColor={!errors.description ? colors.darkPurple : 'red'}
                      placeholder="mm/dd/yyyy"
                      style={styles.textInput}
                      onChangeText={handleChange('endDate')}
                      onBlur={handleBlur('endDate')}
                      value={values.endDate}
                      onFocus={() => {
                      setStartDatePlaceHolder('mm/dd/yyyy')}}
                      keyboardType='default'
                      render={props =>
                        <TextInputMask
                          {...props}
                          type={'datetime'}
                          options={{
                            format: 'MM/DD/YYYY'
                          }}
                        />
                      }
                    />

                    {(errors.endDate && touched.endDate) &&
                      <Text style={styles.errorText}>{errors.endDate}</Text>
                    }
                  </View>

                </View>
{/* 
                  <Text>{console.log(`Form is Valid: ${isValid}`)}</Text> */}

                 <Button
                   onPress={handleSubmit}
                   title="Submit"
                   disabled={true}
                 />

               </>
             )}
           </Formik>
        </View>
        <DatePicker startDateVisible={true}></DatePicker>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white'
  },
  formInput: {
    marginVertical: 5,

  },
  errorText: {
    fontSize: 10,
    paddingTop: 10,
    color: 'red'
  },
  dateBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  formInputDates: {
    flex: 1,
    marginVertical: 5,

  },
})

export default createObjective