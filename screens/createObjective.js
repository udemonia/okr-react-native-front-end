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
import React from 'react'
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


const dateMasking = [
  /[0-1]/,
  /[0-9]/,
  "/",
  /[0-3]/,
  /[0-9]/,
  "/",
  /[1-2]/,
  /[0-9]/,
  /\d/,
  /\d/
];

const loginValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Objective Name is Required'),
  description: yup
  .string()
  .required('Objective Description is Required')
  // // startDate: yup.date()
  // // .min(new Date('01-01-2020'))
  // // .max(new Date())
  // // .required(),
})

const createObjective = () => {

  return (
    <View style={{flex: 1, alignContent: 'center', paddingHorizontal: 20, backgroundColor: 'white'}}>
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
                 <TextInput
                   name="name"
                   left={<TextInput.Icon name="check" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                   mode='outlined'
                   selectionColor={colors.mediumPurple}
                   outlineColor={!errors.name ? colors.darkPurple : 'red'}
                   placeholder="objective name"
                   style={styles.textInput}
                   onChangeText={handleChange('name')}
                   onBlur={handleBlur('name')}
                   value={values.email}
                   autoCapitalize='words'
                  //  keyboardType="email-address"
                 />

                {(errors.name && touched.name) &&
                  <Text style={styles.errorText}>{errors.name}</Text>
                }


                 {errors.email &&
                   <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                 }

                 <TextInput
                   name="description"
                   left={<TextInput.Icon name="text" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                   mode='outlined'
                   autoCapitalize='sentences'
                   selectionColor={colors.mediumPurple}
                   spellCheck={true}
                   outlineColor={!errors.description ? colors.darkPurple : 'red'}
                   placeholder="description"
                   style={styles.textInput}
                   onChangeText={handleChange('description')}
                   onBlur={handleBlur('description')}
                   multiline={true}
                   value={values.description}
                   secureTextEntry
                 />
                 {errors.description &&
                   <Text style={{ fontSize: 10, color: 'red' }}>{errors.description}</Text>
                 }
                 <TextInput
                   name="startDate"
                   left={<TextInput.Icon name="calendar" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                   mode='outlined'
                   mask={dateMasking}
                   selectionColor={colors.mediumPurple}
                   outlineColor={!errors.description ? colors.darkPurple : 'red'}
                   placeholder="mm-dd-yyyy"
                   style={styles.textInput}
                   onChangeText={handleChange('startDate')}
                   onBlur={handleBlur('startDate')}
                   value={values.startDate}
                   keyboardType='numeric'
                 />
                 {errors.startDate &&
                   <Text style={{ fontSize: 10, color: 'red' }}>{errors.startDate}</Text>
                 }

                  <Text>{console.log(`Form is Valid: ${isValid}`)}</Text>

                 <Button
                   onPress={handleSubmit}
                   title="Submit"
                   disabled={true}
                 />

               </>
             )}
           </Formik>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white'
  },
  // container: {
  //   // flex: 1,
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  // },
  // loginContainer: {
  //   width: '80%',
  //   alignItems: 'center',
  //   backgroundColor: 'white',
  //   padding: 10,
  //   elevation: 10,
  //   backgroundColor: '#e6e6e6'
  // },
  // textInput: {
  //   height: 40,
  //   width: '100%',
  //   margin: 10,
  //   backgroundColor: 'white',
  //   borderColor: 'gray',
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderRadius: 10,
  // },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
})

export default createObjective