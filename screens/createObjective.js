import React, { useState, createRef, useEffect, useRef } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  Keyboard
} from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Modal, Portal, Provider,TextInput } from 'react-native-paper';
import colors from '../colors/lightMode'
import DatePicker from '../components/datePicker'
import { TextInputMask } from 'react-native-masked-text'
import AppLoading from 'expo-app-loading';
import QuarterCards from '../components/quarterCards'
import dayjs from 'dayjs';


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


const createObjective = ({ route, navigation }) => {
  console.log(route)
  //? Create the NEXT input Refs
  const objectiveNameRef = createRef();
  const descriptionRef = createRef();
  const startRef = createRef();
  const endRef = createRef();


  const [ quarterStartDate, setQuarterStartDate ] = useState('')    //? Pass to quarter promp
  const [ quarterEndDate, setQuarterEndDate ] = useState('')        //? Pass to quarter promp
  const [ objectiveName, setObjectiveName ] = useState('')
  const [ description, setDescription ] = useState('')


  const [ startDatePlaceHolder, setStartDatePlaceHolder ] = useState('Start Date')
  const [ objectiveNamePlaceholder, setObjectiveNamePlaceholder ] = useState('Objective Name')
  const [ descriptionPlaceholder, setDescriptionPlaceholder ] = useState('Description')
  const [ startDateVisible, setStartDateVisible ] = useState(false)


  const handlePostReqAndNavigation = async (values, resetForm ) => {
    let JWTtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTJmNGQ1YTg1ZTFjNWJhNWZjOTk1ZSIsImlhdCI6MTYzMTIzMzgxMSwiZXhwIjoxNjMzODI1ODExfQ.XeUooqdeFJTlZyhqj579y4Mju522iKvWhURcqApKnvA"
  
    //* Pull out the DayJS date version of the U/I Submit
    const postStartDate = dayjs(values.startDate)
    const postEndDate = dayjs(values.endDate)
    const trimmedDescription = values.description.trim()
    const trimmedName = values.name.trim()
  
    //* Read the Post Request
    const payload = {
      name: trimmedName,
      description: trimmedDescription,
      objectiveStartDate: postStartDate,
      objectiveEndDate: postEndDate
    }
    //* Make an authorized POST request

    console.log(payload)

    
    try {
      let response = await fetch('http://192.168.1.231:2002/api/v1/objectives', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JWTtoken}`
          
        },
        body: JSON.stringify(payload)
        })
  
        if (response.status === 201) {
          resetForm(values = '')
          let responseData = await response.json();
          let newObjective = responseData.data.id
          console.log('success ', responseData.data.id)
          navigation.navigate('AddKeyResults', { JWTtoken, newObjective })
          // const newObjectiveId = response.data
        } else {
          alert(`${response.status} - Error`)
          console.log(response.status)
        }

    } catch (error) {
      console.log(error)
    }
}

  return (

    <View style={{flex: 1, alignContent: 'center', justifyContent: 'start', backgroundColor: colors.darkPurple, paddingHorizontal: 10}}>
      <View>
        <Text style={styles.header}>Plan an Objective</Text>
      </View>
        <View style={styles.planAnObjectiveCard}>
          <Formik
             enableReinitialize={true}
             validationSchema={loginValidationSchema}
             initialValues={{ name: objectiveName, description: '', startDate: quarterStartDate, endDate: quarterEndDate }}
            //  onSubmit={ (values) => navigation.navigate('AddKeyResults')} //! POST Request to endpoint
             onSubmit={ (values, {resetForm}) => handlePostReqAndNavigation(values, resetForm )} //! POST Request to endpoint
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

                <QuarterCards 
                  addStartDate={(value) => setQuarterStartDate(value) }
                  addEndDate={(value) => setQuarterEndDate(value) }
                  startDate={quarterStartDate}
                  endDate={quarterEndDate}
                  
                ></QuarterCards>

                  <TextInput
                     name="name"
                     ref={objectiveNameRef}
                     label="Objective Name"
                     left={<TextInput.Icon name="bullseye" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                     mode='flat'
                     selectionColor={colors.mediumPurple}
                     outlineColor={colors.darkPurple}
                     blurOnSubmit={false}
                     returnKeyType='next'
                    //  outlineColor={!errors.name ? colors.darkPurple : 'red'}
                     placeholder={objectiveNamePlaceholder}
                     style={styles.textInput}
                     onChangeText={handleChange('name')}
                    //  onBlur={handleBlur('name')}
                     value={values.name}
                     onFocus={() => {
                      setObjectiveNamePlaceholder('')}}
                     autoCapitalize='words'
                     onSubmitEditing={() =>
                      descriptionRef.current &&
                      descriptionRef.current.focus()
                    }

                    //  keyboardType="email-address"
                   />

                  {(errors.name && touched.name) &&
                    <Text style={styles.errorText}>{errors.name}</Text>
                  }

                </View>


                <View style={styles.formInput}>
                  <TextInput
                    name="description"
                    ref={descriptionRef}
                    onSubmitEditing={Keyboard.dismiss}
                    label="Description"
                    left={<TextInput.Icon name="text" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                    mode='flat'
                    autoCapitalize='sentences'
                    selectionColor={colors.mediumPurple}
                    outlineColor={colors.darkPurple}
                    spellCheck={true}
                    autoCorrect={true}
                    multiline={true}
                    // outlineColor={!errors.description ? colors.darkPurple : 'red'}
                    placeholder={descriptionPlaceholder}
                    style={styles.textInput}
                    blurOnSubmit={false}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    returnKeyType='done'
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
                      ref={startRef}
                      label="Start Date"
                      left={<TextInput.Icon name="calendar" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                      mode='flat'
                      selectionColor={colors.mediumPurple}
                      blurOnSubmit={false}
                      outlineColor={colors.darkPurple}
                      returnKeyType='next'
                      //  outlineColor={!errors.description ? colors.darkPurple : 'red'}
                      placeholder="mm/dd/yyyy"
                      style={styles.textInput}
                      onChangeText={handleChange('startDate')}
                      onBlur={handleBlur('startDate')}
                      value={values.startDate}
                      onFocus={() => {
                        setStartDateVisible(true)
                        setStartDatePlaceHolder('mm/dd/yyyy')}}
                      returnKeyType='done'
                      onSubmitEditing={Keyboard.dismiss}
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
                      ref={endRef}
                      left={<TextInput.Icon name="calendar" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                      mode='flat'
                      blurOnSubmit={false}
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
                      // keyboardType='default'
                      onSubmitEditing={Keyboard.dismiss}
                      returnKeyType='done'
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

                
                <View style={{paddingTop: 20, paddingBottom: 4}}>
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
  planAnObjectiveCard: {
    marginTop: height / 10,
    // marginHorizontal: 3,
    padding: 10,
    backgroundColor: 'white',
    borderTopColor: colors.lightPurple,
    borderTopWidth: 2,
    borderBottomColor: colors.lightPurple,
    borderBottomWidth: 2,
    borderRadius: 5
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