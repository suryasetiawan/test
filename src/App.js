
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TicketScreen } from './screens/TicketScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './components/context';
import { navigationRef } from './screens/LoginScreen'

const Stack = createStackNavigator();

export default function () {
  const [userData, setUserData] = useState('')

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  const authContext = React.useMemo(() => ({
    signIn: async (userName, password, data) => {
      let userToken
      userToken = null
      if (userName == data.email && password == data.password) {
        try {
          userToken = 'abcdef'
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e);
        }
      }

      else if (userName != data.email && password != data.password) {
        Alert.alert('Account not found')
      }

      else if (userName == '' && password == '') {
        Alert.alert('Please fill the Username and Password')
      }

      else if (userName == data.email && password == '') {
        Alert.alert('Password Empty')
      }

      else if (userName == '' && password == data.password) {
        Alert.alert('Email Empty')
      }
      else {
        Alert.alert('Data not found')
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken })
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' })
    },
    signUp: () => {
      setUserToken('token')
      setIsLoading(false)
    },
  }))

  useEffect(() => {
    setTimeout(async () => {
      let userToken
      // let userData
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
        // userData = await AsyncStorage.getItem('userData')
        // setUserData(JSON.parse(userData))
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000)
  }, [])

  // useEffect(() => {
  //   if(loginState.userToken == null){
  //     setTimeout(async() => {
  //       let userData
  //       try {
  //         userData =await AsyncStorage.getItem('userData')
  //         setUserData(JSON.parse(userData))
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }, 1000);
  //   }
  // },[userData])

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setTimeout(async () => {
  //       try {
  //         var userData = await AsyncStorage.getItem('userData')
  //         return (
  //           setUserData(userData != null ? JSON.parse(userData) : null)
  //         )
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }, 1000)
  //     dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
  //   }, [])
  // )

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='#0084B4' size='large' />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigationRef}>
        {loginState.userToken !== null ? (
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{
                headerTitleAlign: 'center',
                headerTintColor: '#0084B4',
              }}
            />
            <Stack.Screen
              name='Ticket'
              component={TicketScreen}
              options={{
                // headerTitleAlign:'center',
                headerTitleContainerStyle: { marginLeft: -15 },
                headerTintColor: '#0084B4',
              }}
            />
          </Stack.Navigator>
        ) :
          (
            <Stack.Navigator>
              <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='Register'
                component={RegistrationScreen}
              />
            </Stack.Navigator>
          )
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
};
