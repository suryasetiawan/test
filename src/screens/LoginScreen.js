
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonField } from '../components/ButtonField';
import { Heading } from '../components/Heading';
import { InputField } from '../components/InputField';
import { TextButton } from '../components/TextButton';
import { AuthContext } from '../components/context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [refreshing, setRefreshing] = React.useState(false);

    const { signIn } = React.useContext(AuthContext)

    const loginHandle = (email, password) => {
        signIn(email, password, userData)
    }

    const [userData, setUserData] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(async () => {
                try {
                    var userData = await AsyncStorage.getItem('userData')
                    return (
                        setUserData(userData != null ? JSON.parse(userData) : null)
                    )
                } catch (e) {
                    console.log(e);
                }
            }, 1000)
        }, [])
    )

    console.log('login', userData);
    return (
        <View style={styles.container}>
            <Heading style={styles.heading}>LOGIN</Heading>
            <InputField
                placeholder={'Email'}
                keyboardType={'email-address'}
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <InputField
                placeholder={'Password'}
                secureTextEntry
                value={password}
                onChangeText={password => setPassword(password)}
            />
            <ButtonField
                title={"Login"}
                style={styles.loginButton}
                onPress={() => { loginHandle(email, password) }}
            />
            <TextButton
                title='Have you an account ? Sign up'
                style={styles.loginButton}
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    heading: {
        marginBottom: 20,
    },
    loginButton: {
        marginTop: 10
    }

});
