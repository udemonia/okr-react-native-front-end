// import React from 'react';
// import {View, Text, StyleSheet, Button } from 'react-native';
// import signUpScreen from './signUpScreen'

// const loginInScreen = ({ navigation }) => {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Login Screen</Text>
//         <Button title="need an account? sign up!" onPress={()=> navigation.navigate('SignUp')} />
//         <Button title='submit' onPress={() => navigation.push('drawer')} />
//       </View>
//     )
//   }

import React, {useState, createRef} from 'react';
import axios from 'axios';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
  
  const LoginScreen = ({navigation}) => {
  
      //* State Management
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
  
    const passwordInputRef = createRef();

  
    const handleSubmitPress = () => {
      //* Lets handle missing info -
  
      setErrortext('');
      if (!userEmail) {
        alert('Please fill Email');
        return;
      }
      if (!userPassword) {
        alert('Please fill Password');
        return;
      }
  
      //* If data, lets set loading to true - using the load component
      setLoading(true);
  
      //* data to send.... 
      let dataToSend = {email: userEmail, password: userPassword};
      console.log(dataToSend)
  
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
  
      formBody = formBody.join('&');
  
      fetch('http://localhost:2002/api/v1/auth/login', {
        method: 'POST',
        body: {
            email: userEmail,
            password: userPassword
          },
        headers: {
          //Header Defination
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          
          //Hide Loader
          setLoading(false);
          // If server response message same as Data Matched
          if (responseJson.status === 'success') {
            AsyncStorage.setItem('user_id', responseJson.data.email);
            console.log(responseJson.data.email);
            navigation.replace('DrawerNavigationRoutes');
          } else {
            setErrortext(responseJson.msg);
            console.log('Please check your email id or password');
          }
        })
  
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    };
  
  
  
  
    return (
  
      <View style={styles.mainBody}>

        <Loader loading={loading} />
        
        <ScrollView
          keyboardShouldPersistTaps="handled"
          // contentContainerStyle={{
          //   flex: 1,
          //   justifyContent: 'center',
          //   alignContent: 'center',
          // }}
          >
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                  source={require('../assets/rocket.png')}
                  style={{
                    width: '50%',
                    height: 100,
                    resizeMode: 'center',
                    margin: 30,
                    borderRadius: 15
                  }}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) =>
                    setUserEmail(UserEmail)
                  }
                  placeholder="email address"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={true}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                  }
                  placeholder="password" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
              {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                  {errortext}
                </Text>
              ) : null}
  
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('drawer')}>
                {/* onPress={handleSubmitPress}> */}
                <Text style={styles.buttonTextStyle}>login</Text>
              </TouchableOpacity>
  
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('SignUp')}>
                need an account? sign up!
              </Text>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    );
  };
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
      alignContent: 'center',
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
      shadowColor: "#00008B",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      
      elevation: 6,
    },
    buttonStyle: {
      backgroundColor: '#6200ff',
      borderWidth: 0,
      color: '#72DDF7',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25,
      shadowColor: "#00008B",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      
      elevation: 6,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
      shadowColor: "#00008B",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      
      elevation: 6,
    },
    inputStyle: {
      flex: 1,
      color: '#6200ff',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#6200ff'
    },
    registerTextStyle: {
      color: '#6200ff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
      alignSelf: 'center',
      padding: 10,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
  });
  
  

// export default loginInScreen;