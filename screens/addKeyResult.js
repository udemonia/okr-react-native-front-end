import React, { useState, createRef } from 'react';
import {View, Text, StyleSheet, Dimensions, Keyboard } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import colors from '../colors/lightMode'
import LinearGradient from 'expo-linear-gradient'
import { Formik } from 'formik'
import * as yup from 'yup'
import { TextInputMask } from 'react-native-masked-text'
import AppLoading from 'expo-app-loading';

const { screenHeight, screenWidth }= Dimensions.get('window')

const loginValidationSchema = yup.object().shape({
  keyResultName: yup
    .string()
    .required('Name is Required'),
  description: yup
    .string()
    .required('Description is Required'),
  currentValue: yup
    .string()
    .required('Current Value is Required'),
  targetValue: yup
    .string()
    .required('Target Value is Required'),
})


const { height, width } = Dimensions.get('window')

const AddKeyResult = ({ route, navigation }) => {


    const { JWTtoken, newObjective } = route.params
    const [ startDatePlaceHolder, setStartDatePlaceHolder ] = useState('Start Date')
    const [ objectiveNamePlaceholder, setObjectiveNamePlaceholder ] = useState('Objective Name')
    const [ descriptionPlaceholder, setDescriptionPlaceholder ] = useState('Description')
    const [ startDateVisible, setStartDateVisible ] = useState(false)

    const objectiveNameRef = createRef();
    const descriptionRef = createRef();
    const startRef = createRef();
    const endRef = createRef();

    const postKeyResult = async ( values, resetForm ) => {

      const adjustedCurrent = values.currentValue.replace(/,(?=\d{3})/g, '')
      const adjustedTarget = values.targetValue.replace(/,(?=\d{3})/g, '')
      const trimmedName = values.keyResultName.trim()
      const trimmedDescription = values.description.trim()

      try {
        let response = await fetch(`http://161.35.237.86:2002/api/v1/objectives/${newObjective}/keyresults`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JWTtoken}`
            
          },
          body: JSON.stringify({
            "name": trimmedName,
            "description": trimmedDescription,
            "currentValue": adjustedCurrent,
            "targetValue": adjustedTarget
          })
          })
    
          if (response.status === 201) {
            let responseData = await response.json();
            resetForm(values = '')

          } else {
            alert(`${response.status} - Error`)
          }
  
      } catch (error) {
        alert(error)
      }

    }

    return (
      <View style={styles.krContainer}>
      <View style={styles.whiteBoxAroundForm}>

      <View>
        <View style={{
            flex: 1,
            marginTop: 8,
            width: screenWidth,
            marginHorizontal: '40%',
            height: 8,
            maxWidth: '20%',
            borderWidth: 4,
            borderRadius: 8,
            borderColor: colors.mediumPurple, 
          }}></View>
          <Text style={styles.header}>Add Key Results</Text>
        </View>

      <View style={styles.formBox}>

       <Formik
             enableReinitialize={true}
             validationSchema={loginValidationSchema}
             initialValues={{ keyResultName: '', description: '', currentValue: '', targetValue: '' }}
            //  onSubmit={ (values, { resetForm }) => resetForm(values = '') } //! POST Request to endpoint
            //  onSubmit={ () => navigation.navigate('AddKeyResults')} //! POST Request to endpoint
             onSubmit={(values, { resetForm }) => {
               postKeyResult(values, resetForm )
              //  resetForm(values = '')
              }} //! POST Request to endpoint
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
                     name="keyResultName"
                     ref={objectiveNameRef}
                     label="Key Result Name"
                     left={<TextInput.Icon name="check" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                     mode='flat'
                     selectionColor={colors.mediumPurple}
                     outlineColor={colors.darkPurple}
                     blurOnSubmit={false}
                     returnKeyType='next'
                    //  outlineColor={!errors.name ? colors.darkPurple : 'red'}
                     placeholder={objectiveNamePlaceholder}
                     style={styles.textInput}
                     onChangeText={handleChange('keyResultName')}
                    //  onBlur={handleBlur('name')}
                     value={values.keyResultName}
                     onFocus={() => {
                      setObjectiveNamePlaceholder('')}}
                     autoCapitalize='words'
                     onSubmitEditing={() =>
                      descriptionRef.current &&
                      descriptionRef.current.focus()
                    }

                    //  keyboardType="email-address"
                   />

                  {(errors.keyResultName && touched.keyResultName) &&
                    <Text style={styles.errorText}>{errors.keyResultName}</Text>
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
                      name="currentValue"
                      // ref={startRef}
                      label="Current Value"
                      left={<TextInput.Icon name="star-outline" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                      mode='flat'
                      selectionColor={colors.mediumPurple}
                      blurOnSubmit={false}
                      outlineColor={colors.darkPurple}
                      returnKeyType='next'
                      //  outlineColor={!errors.description ? colors.darkPurple : 'red'}
                      // placeholder="mm/dd/yyyy"
                      style={styles.textInput}
                      onChangeText={handleChange('currentValue')}
                      onBlur={handleBlur('currentValue')}
                      value={values.startDate}
                      onFocus={() => {
                        setStartDateVisible(true)
                        setStartDatePlaceHolder('mm/dd/yyyy')}}
                      returnKeyType='done'
                      onSubmitEditing={Keyboard.dismiss}
                      render={props =>
                        <TextInputMask
                          {...props}
                          type={'money'}
                          options={{
                            precision: null,
                            separator: null,
                            unit: null,
                            delimiter: ','
                          }}
                        />
                      }
                    />

                      {(errors.currentValue && touched.currentValue) &&
                        <Text style={styles.errorText}>{errors.currentValue}</Text>
                      }

                    </View>

                <View style={styles.formInputDates}>
                    <TextInput
                      name="targetValue"
                      label="Target Value"
                      // ref={endRef}
                      left={<TextInput.Icon name="star-outline" color={colors.mediumPurple} forceTextInputFocus={true}/>}
                      mode='flat'
                      blurOnSubmit={false}
                      selectionColor={colors.mediumPurple}
                      outlineColor={colors.darkPurple}
                      // outlineColor={!errors.description ? colors.darkPurple : 'red'}
                      style={styles.textInput}
                      onChangeText={handleChange('targetValue')}
                      onBlur={handleBlur('targetValue')}
                      value={values.targetValue}
                      onFocus={() => {
                      setStartDatePlaceHolder('Target Value')}}
                      // keyboardType='default'
                      onSubmitEditing={Keyboard.dismiss}
                      returnKeyType='done'
                      render={props =>
                        <TextInputMask
                        {...props}
                        type={'money'}
                        options={{
                          precision: null,
                          separator: null,
                          unit: null,
                          delimiter: ','
                        }}
                        />
                      }
                    />

                    {(errors.targetValue && touched.targetValue) &&
                      <Text style={styles.errorText}>{errors.targetValue}</Text>
                    }
                  </View>

                </View>
                
                <View style={{paddingTop: 20, paddingBottom: 4, justifyContent: 'center', alignItems: 'center'}}>
                 <Button
                    mode="contained"
                    style={styles.button}
                    color={colors.mediumPurple}
                    onPress={handleSubmit}
                    // onPress={handleSubmit}
                    title="Enter"
                    disabled={ isValid ? false : true }
                 >Submit</Button>
                 </View>

               </>
             )}
           </Formik>


      
      
      
      </View> 
      </View>


{/* 
        <Text style={styles.backButton}>create key results</Text>
        <Button title="create" onPress={()=> alert('Created Key Result')} /> */}
      </View>
    )
  }


const styles = StyleSheet.create({
  krContainer: {
    flex: 1,
    backgroundColor: colors.mediumPurple,
    backgroundColor: 'rgba(0,0,0,0.6)',
    // paddingTop: '5%',
    // marginHorizontal: 20,
    borderRadius: 5
  },
  whiteBoxAroundForm: {
    // borderWidth: 1,
    // borderColor: colors.grey,
    justifyContent: 'flex-start',
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 7,
    },
  
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  header: {
    marginTop: 20,
    backgroundColor: 'white',
    fontFamily: 'Nunito_300Light',
    color: colors.mediumPurple,
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 30,
    marginBottom: 5,
  },
  formBox:{
    borderRadius: 5,
    paddingTop : 20,
    paddingBottom : 20,
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    backgroundColor: 'white'
  },
  dateBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  formInputDates: {
    flex: 1,
  },
  errorText: {
    paddingLeft: 10,
    fontSize: 14,
    paddingVertical: 10,
    color: colors.purpleObjectiveTile
  },
  backButton: {
    color: 'white'
  },
  button: {
    width: '50%'
  }

})

export default AddKeyResult;