import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button
} from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Modal, Portal, Provider,TextInput } from 'react-native-paper';
import colors from '../colors/lightMode'
import DatePicker from '../components/datePicker'
import { TextInputMask } from 'react-native-masked-text'
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_700Bold
} from '@expo-google-fonts/nunito';




const { height, width } = Dimensions.get('window')



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
  const [ objectiveNamePlaceholder, setObjectiveNamePlaceholder ] = useState('Objective Name')
  const [ descriptionPlaceholder, setDescriptionPlaceholder ] = useState('Description')
  const [ startDateVisible, setStartDateVisible ] = useState(false)


  const theme = {
    fontFamily: 'Nunito_400Regular',
  };

  let [ fontsLoaded, err ] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } 
  return (

    <View style={{flex: 1, alignContent: 'center', justifyContent: 'start', paddingHorizontal: 10, backgroundColor: colors.darkPurple}}>
      <View>
        <Text style={styles.header}>Plan an Objective</Text>
      </View>
        <View style={styles.loginContainer}>
          <Formik
             validationSchema={loginValidationSchema}
             initialValues={{ name: '', description: '', startDate: '', endDate: '' }}
             onSubmit={values => console.log(values)} //! POST Request to endpoint
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
                     theme={theme}
                     label="Objective Name"
                     left={<TextInput.Icon name="bullseye" color={colors.mediumPurple} forceTextInputFocus={true}/>}
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
                    left={<TextInput.Icon name="text" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                    mode='flat'
                    autoCapitalize='sentences'
                    selectionColor={colors.mediumPurple}
                    outlineColor={colors.darkPurple}
                    spellCheck={true}
                    autoCorrect={true}
                    // outlineColor={!errors.description ? colors.darkPurple : 'red'}
                    placeholder={descriptionPlaceholder}
                    style={styles.textInput}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    autoCapitalize='sentences'
                    onFocus={() => {
                      setDescriptionPlaceholder('')}}
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
                {/*  <Text>{console.log(`Form is Valid: ${isValid}`)}</Text> */}
                
                <View style={{paddingVertical: 20}}>
                 <Button
                    style={styles.button}
                    color={colors.mediumPurple}
                    onPress={handleSubmit}
                    onPress={handleSubmit}
                    title="Enter"
                    disabled={ isValid ? false : true }
                 />
                 </View>

               </>
             )}
           </Formik>
        </View>
        {/* <DatePicker startDateVisible={true}></DatePicker> */}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    fontFamily: 'Nunito_300Light',
    color: colors.lightGrey,
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 30,
    position: 'absolute'
  },
  loginContainer: {
    marginTop: height / 10,
    marginHorizontal: 6,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  textInput: {
    backgroundColor: 'white'
  },
  formInput: {
    marginTop: 10,

  },
  errorText: {
    paddingLeft: 10,
    fontSize: 14,
    paddingTop: 10,
    color: colors.lightPurple
  },
  dateBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  formInputDates: {
    flex: 1,
    marginTop: 5,
  }
})

export default createObjective