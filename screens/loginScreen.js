import React, {useState, createRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  SafeAreaView
} from 'react-native';

const STORAGE_KEY = '@save_token'


const storeDataString = async (value) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, value)
  } catch (error) {
    console.log(error)
  }
}




//* We need to call login + getCurrentUser
  
  const LoginScreen = ({navigation}) => {
  
      //* State Management
    const [ userEmail, setUserEmail ] = useState('');
    const [ userPassword, setUserPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ errortext, setErrortext ] = useState('');
    const [ apiData, setApiData ] = useState([])
    const [ token, setToken ] = useState('')
    const passwordInputRef = createRef();
  

        const authPostRequest = async () => {

          const devEmail = userEmail || '1@1.com'
          const devUserPass = userPassword || '1234567'
          
          try {
            let response = await fetch('http://192.168.1.231:2002/api/v1/auth/login', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "email": devEmail,
                "password": devUserPass
                // "email": userEmail,
                // "password": userPassword
              })
              })
              if (response.status === 200) {
                let responseData = await response.json();
                let JWTtoken = JSON.stringify(responseData.token).slice(1, -1);
                const savedToken = await storeDataString(JWTtoken)
                // alert(JWTtoken)
                try {
                  let currentUserResponse = await fetch('http://192.168.1.231:2002/api/v1/auth/CurrentLoggedUser', {
                    method: 'GET',
                    headers: {
                      "Accept": 'application/json',
                      "Authorization": `Bearer ${JWTtoken}`
                    }
                  })
                  let userData = await currentUserResponse.json();
                  // alert(JSON.stringify(userData.data, null, 2))
                  if (currentUserResponse.status === 200) {

                    navigation.navigate('drawer', {
                      screen: 'Home',
                      params: {
                        screen: 'Objectives',
                        params: {
                          userData,
                          JWTtoken
                        },
                      },
                    });        
                  }
                  
                } catch (error) {
                  console.log(error)
                }



              } else {
                alert('error' + response.status)
              }
          } catch (error) {
            console.log(error)
          }
        }

        return (
          <View style={styles.mainBody}>
            <SafeAreaView>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              >
              <View>
                <KeyboardAvoidingView enabled>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <Image
                      source={require('../assets/rocket.png')}
                      style={{
                        width: '75%%',
                        height: 200,
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
                    onPress={() => authPostRequest()}>
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
            </SafeAreaView>
          </View>
        );
      };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#210347',
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
      // shadowOffset: {
      //   width: 0,
      //   height: 3,
      // },
      // shadowOpacity: 0.27,
      // shadowRadius: 4.65,
      
      // elevation: 6,
    },
    buttonStyle: {
      backgroundColor: '#F18FBF',
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
      color: '#6200ff',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
      flex: 1,
      backgroundColor: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#55388C'
    },
    registerTextStyle: {
      color: 'white',
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