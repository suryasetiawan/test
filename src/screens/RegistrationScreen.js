
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ImageBackground, Dimensions, FlatList, PermissionsAndroid } from 'react-native';
import { ButtonField } from '../components/ButtonField';
import { InputField } from '../components/InputField';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { data } from './../assets/cc'
import Autocomplete from 'react-native-autocomplete-input';
import axios from "axios";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function RegistrationScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [photo, setPhoto] = useState(null)
    const [mime, setMime] = useState('')
    const [image, setImage] = useState('')
    const [cc, setCC] = useState(data)
    const [filteredCC, setFilteredCC] = useState([]); // Filtered data
    const [selectedCC, setSelectedCC] = useState({}); // selected data

    console.log('image : ', image);

    // const [data, setData] = useState({
    //     email: '',
    //     password: '',
    //     name: '', 
    //     phone: '',
    //     photo: null,
    // })

    const findCC = (query) => {
        if (query) {
            setFilteredCC(
                cc.filter((item) => item.cc.search(query) >= 0)
            );
        } else {
            setFilteredCC([]);
        }
    };

    const takePictureFromCamera = () => {
        ImagePicker.openCamera({
            useFrontCamera: true,
            width: 300,
            height: 300,
            cropping: false,
            includeBase64: true
        }).then(image => {
            setPhoto(image.path)
            setMime(image.mime)
            setImage(image.data)
        }).catch(e => console.log(e))
    }

    const signUp = async () => {
        try {
            const signUpData = {
                reqData: {
                    uniqueID: Date.now(),
                    name1: name,
                    phone1: phone,
                    email1: email, 
                    captureImage: image,
                }
            }
            console.log('sign', signUpData);
            axios
                .post("http://113.11.154.93:8080/KaoatoWeb/api/registRegistrantWithFace", signUpData)
                .then(res => console.log('res : ', res))
                .catch(err => console.log('err : ', err));

            await AsyncStorage.setItem('userData', JSON.stringify({ email, password, name, phone, photo, selectedCC }))
            setEmail('')
            setPassword('')
            setName('')
            setPhone('')
            setSelectedCC('')
            navigation.navigate('Login')
            console.log('saving done')
        } catch (e) {
            console.log(e);
        }
        
        // try {
        //     const signUpData = {
        //         reqData: {
        //             uniqueID: Date.now(),
        //             name1: name,
        //             phone1: phone,
        //             email1: email,
        //             captureImage: image,
        //         }
        //     }
        //     fetch('http://113.11.154.93:8080/KaoatoWeb/api/registRegistrantWithFace', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(signUpData)
        //     });
        //     await AsyncStorage.setItem('userData', JSON.stringify({ email, password, name, phone, photo, selectedCC }))
        //     setEmail('')
        //     setPassword('')
        //     setName('')
        //     setPhone('')
        //     setSelectedCC('')
        //     navigation.navigate('Login')
        //     console.log('saving done')
        // } catch (e) {
        //     console.log(e);
        // }

        // try {
        //     const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.CAMERA,
        //         {
        //             title: "Cool Photo App Camera Permission",
        //             message:
        //                 "Cool Photo App needs access to your camera " +
        //                 "so you can take awesome pictures.",
        //             buttonNeutral: "Ask Me Later",
        //             buttonNegative: "Cancel",
        //             buttonPositive: "OK"
        //         }
        //     );
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         const signUpData = {
        //             reqData: {
        //                 uniqueID: Date.now(),
        //                 name1: name,
        //                 phone1: phone,
        //                 email1: email,
        //                 captureImage: image,
        //             }
        //         }
        //         console.log('sign', signUpData);
        //         axios
        //             .post("http://113.11.154.93:8080/KaoatoWeb/api/registRegistrantWithFace", signUpData)
        //             .then(res => console.log('res : ', res))
        //             .catch(err => console.log('err : ', err));

        //         await AsyncStorage.setItem('userData', JSON.stringify({ email, password, name, phone, photo, selectedCC }))
        //         setEmail('')
        //         setPassword('')
        //         setName('')
        //         setPhone('')
        //         setSelectedCC('')
        //         navigation.navigate('Login')
        //         console.log('saving done')
        //     } else {
        //         console.log("Camera permission denied");
        //     }
        // } catch (err) {
        //     console.warn(err);
        // }


       
    }

    const loadData = async () => {
        var item = await AsyncStorage.getItem('userData')
        console.log('item :', item);
    }

    // async componentDidMount(){
    //     const token = await asyncStorage.getItem('token')
    //     axios({
    //       method: 'get',
    //       url: 'http://192.168.56.1/lrn/public/api/members',
    //       dateType: 'json',
    //       headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //           'Authorization': 'Bearer ' + token,
    //       },
    //   })
    //   .then(function(response) {
    //       console.log(response);
    //   })
    //   .catch(function (error) {
    //       console.log(error);
    //   })
    //   }

    return (
        // <SafeAreaView>
        <FlatList style={{ backgroundColor: 'white' }}
            ListHeaderComponent={
                <>
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: '#0084B4', height: 100 }} />
                        <View style={styles.imageContainer}>
                            <TouchableOpacity style={styles.photoContainer} onPress={takePictureFromCamera} activeOpacity={1}>
                                <ImageBackground
                                    imageStyle={{ tintColor: '#0084B4' }}
                                    style={styles.photoIcon}
                                    source={require('../assets/add-photo.png')}
                                />
                                {/* <Image
                                    style={styles.photoProfile}
                                    source={{ uri: photo }}
                                /> */}

                                <Image style={styles.photoProfile} source={{ uri: `data:${mime};base64,${image}` }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.title}>Create your login ID</Text>
                            {/* <TextInput
                                style={{
                                    padding: 8,
                                    width: '100%',
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    paddingLeft: 10,
                                    marginBottom: 10,
                                    borderColor: '#0000001f',
                                    backgroundColor: '#E8E8E8',
                                }}
                                placeholder={'Email'}
                                keyboardType={'email-address'}
                                value={email}
                                onChangeText={email => setEmail(email)}
                            /> */}
                            <InputField
                                placeholder={'Email'}
                                keyboardType={'email-address'}
                                caretHidden
                                value={email}
                                onChangeText={email => setEmail(email)}
                            />

                            <InputField
                                placeholder={'Password'}
                                secureTextEntry
                                value={password}
                                onChangeText={password => setPassword(password)}
                            />
                            <View style={styles.border} />
                            <Text style={styles.title}>Create your profile</Text>
                            {/* <TextInput
                                style={{
                                    padding: 8,
                                    width: '100%',
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    paddingLeft: 10,
                                    marginBottom: 10,
                                    borderColor: '#0000001f',
                                    backgroundColor: '#E8E8E8',
                                }}
                                placeholder={'Name'}
                                value={name}
                                onChangeText={name => setName(name)}
                            /> */}
                            <InputField
                                placeholder={'Name'}
                                value={name}
                                onChangeText={name => setName(name)}
                            />
                            <InputField
                                placeholder={'Phone'}
                                keyboardType={'numeric'}
                                value={phone}
                                onChangeText={phone => setPhone(phone)}
                            />
                            <Autocomplete
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ backgroundColor: '#E8E8E8', borderRadius: 10, paddingLeft: 8 }}
                                inputContainerStyle={{ borderWidth: 0, }}
                                keyboardType={'numeric'}
                                data={filteredCC}
                                defaultValue={
                                    JSON.stringify(selectedCC) === '{}' ?
                                        '' :
                                        selectedCC
                                }
                                onChangeText={(text) => findCC(text)}
                                placeholder="Enter the CC ID ( 00000001 - 00000100 )"
                                renderItem={({ item, i }) => (
                                    //you can change the view you want to show in suggestions
                                    <TouchableOpacity key={i} style={{ marginLeft: 10 }}
                                        onPress={() => {
                                            setSelectedCC(item.cc);
                                            setFilteredCC([]);
                                        }}>
                                        <Text key={i} style={styles.itemText}>
                                            {item.cc}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </>}
            ListFooterComponent={
                <View style={{ padding: 20 }}>
                    <ButtonField
                        title={"REGISTRATION"}
                        style={styles.loginButton}
                        onPress={signUp}
                    />
                </View>
            }

        >

        </FlatList>
        // </SafeAreaView>

        // <View style={{ backgroundColor: 'white' }}>

        //     <ScrollView>

        //     <View style={{ backgroundColor: '#0084B4', height: 100 }} />
        //     <View style={styles.imageContainer}>
        //         <TouchableOpacity style={styles.photoContainer} onPress={takePictureFromCamera} activeOpacity={1}>
        //             <ImageBackground
        //                 imageStyle={{ tintColor: '#0084B4' }}
        //                 style={styles.photoIcon}
        //                 source={require('../assets/add-photo.png')}
        //             />
        //             <Image
        //                 style={styles.photoProfile}
        //                 source={{ uri: photo }}
        //             />
        //         </TouchableOpacity>
        //     </View>
        //     <View style={styles.container}>

        //         <Text style={styles.title}>Create your login ID</Text>
        //         <InputField
        //             placeholder={'Email'}
        //             keyboardType={'email-address'}
        //             value={email}
        //             onChangeText={email => setEmail(email)}
        //         />

        //         <InputField
        //             placeholder={'Password'}
        //             secureTextEntry
        //             value={password}
        //             onChangeText={password => setPassword(password)}
        //         />
        //         <View style={styles.border} />
        //         <Text style={styles.title}>Create your profile</Text>
        //         <InputField
        //             placeholder={'Name'}
        //             value={name}
        //             onChangeText={name => setName(name)}
        //         />
        //         <InputField
        //             placeholder={'Phone'}
        //             keyboardType={'numeric'}
        //             value={phone}
        //             onChangeText={phone => setPhone(phone)}
        //         />
        //         <Autocomplete
        //             autoCapitalize="none"
        //             autoCorrect={false}
        //             style={{ backgroundColor: '#E8E8E8', borderRadius: 10, paddingLeft: 8 }}
        //             inputContainerStyle={{ borderWidth: 0, }}
        //             keyboardType={'numeric'}
        //             data={filteredCC}
        //             defaultValue={
        //                 JSON.stringify(selectedCC) === '{}' ?
        //                     '' :
        //                     selectedCC.cc
        //             }
        //             onChangeText={(text) => findCC(text)}
        //             placeholder="Enter the CC ID ( 00000001 - 00000100 )"
        //             renderItem={({ item, i }) => (
        //                 //you can change the view you want to show in suggestions
        //                 <TouchableOpacity key={i} style={{ marginLeft: 10 }}
        //                     onPress={() => {
        //                         setSelectedCC(item);
        //                         setFilteredCC([]);
        //                     }}>
        //                     <Text style={styles.itemText}>
        //                         {item.cc}
        //                     </Text>
        //                 </TouchableOpacity>
        //             )}
        //         />
        //     </View>

        //     <View style={{ padding: 20 }}>
        //         <ButtonField
        //             title={"REGISTRATION"}
        //             style={styles.loginButton}
        //             onPress={signUp}
        //         />
        //     </View>
        //     </ScrollView>

        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 70,
        backgroundColor: 'white',
    },
    heading: {
        marginBottom: 20,
    },
    loginButton: {
        marginVertical: 0,
    },
    title: {
        fontSize: 24,
        color: 'gray',
        fontWeight: '500',
        marginBottom: 15,
    },
    border: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#0000001f',
    },
    imageContainer: {
        justifyContent: 'center',
        marginBottom: 10,
        position: 'absolute',
        top: 30,
        marginLeft: 'auto',
        marginBottom: 'auto',
        alignItems: 'center',
        left: 0,
        right: 0
    },
    photoButton: {
        width: '40%',
        marginBottom: 10
    },
    photoIcon: {
        width: 30,
        height: 30,
        tintColor: '#0084B4',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
    },
    photoProfile: {
        width: 140,
        height: 140,
        borderRadius: 10,
        borderWidth: 1.5,
        borderWidth: 4,
        borderColor: 'white',
    },
    photoContainer: {
        width: 140,
        height: 140,
        borderWidth: 4,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
    },
    itemText: {
        fontSize: 15,
        paddingTop: 3,
        paddingBottom: 3,
        margin: 1,

    },

});
