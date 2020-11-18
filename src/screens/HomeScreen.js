
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { ButtonField } from '../components/ButtonField';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../components/context';
import { useFocusEffect } from '@react-navigation/native';
import ScreenBrightness from 'react-native-screen-brightness';
import { imagesCC } from '../assets/CodeSample/index'
import axios from "axios";

export function HomeScreen({ navigation }) {
    const [userData, setUserData] = useState('')
    const [ticket, setTicket] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    // const [brightness, setBrightness] = useState();

    // console.log('brightness', brightness);
    // useEffect(() => {
    //     ScreenBrightness.getBrightness().then((brightness) => {
    //         setBrightness(brightness)
    //         // alert('brightness ' + brightness);
    //     });
    // }, []);

    // const getBrightness = () => {
    //     ScreenBrightness.getBrightness().then((brightness) => {
    //         alert('brightness ' + brightness);
    //     });
    // };
    const showCC = () => {
        ScreenBrightness.setBrightness(255).then((e) => {
            console.log(e)
        });
        setModalVisible(true);
    }

    const hideCC = () => {
        ScreenBrightness.setBrightness(0.2).then((e) => {
            console.log(e)
        });
        setModalVisible(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(async () => {
                try {
                    var userData = await AsyncStorage.getItem('userData')
                    var ticket = await AsyncStorage.getItem('ticket')
                    return (
                        setUserData(userData != null ? JSON.parse(userData) : null),
                        setTicket(userData != null ? JSON.parse(ticket) : null)
                    )
                } catch (e) {
                    console.log(e);
                }
            }, 1000)
        }, [])
    )

    const { signOut } = React.useContext(AuthContext)

    // const remove = async () => {
    //     try {
    //         await AsyncStorage.removeItem('ticket')
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // console.log('cc', parseInt(userData.selectedCC));
    // const onSubmit = () => {
    //     const data = {
    //         title: 'OKE',
    //         body: 'OKE'
    //     };
    //     axios
    //         .post("https://jsonplaceholder.typicode.com/posts", data)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // }
    return (

        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <Text style={styles.nameText}>Welcome, {userData.name}  </Text>
                <View style={styles.card}>
                    <View style={styles.destinationContainer}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontSize: 12 }}>Origin</Text>
                            <Text style={{ color: '#0084B4', fontSize: 15 }}>{ticket !== null ? ticket.origin : '-'}</Text>
                        </View>
                        <Image
                            style={styles.photoIcon}
                            source={require('../assets/arrow.png')}
                        />
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontSize: 12 }}>Destination</Text>
                            <Text style={{ color: '#0084B4', fontSize: 15 }}>{ticket !== null ? ticket.destination : '-'}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.border} />
                    </View>
                    <Text style={styles.ticketText}>Ticket Balance : </Text>
                    <Text style={styles.noText}>{ticket !== null ? '1' : '-'}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonField
                        title={"Show CC"}
                        style={styles.ccButton}
                        onPress={showCC}
                        // onPress={getBrightness}
                        // onPress={onSubmit}
                    />
                    <ButtonField
                        title={"Buy Ticket"}
                        style={styles.buyButton}
                        onPress={() => navigation.navigate('Ticket')}
                    />
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={hideCC}

                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Image
                                    // source={require('../assets/CodeSample/00000001.png')}
                                    // source={require(`../assets/CodeSample/${userData.selectedCC.img}`)}
                                    // source={userData.selectedCC.cc ? require('../assets/CodeSample/00000001.png') : null}
                                    source={userData.selectedCC ? imagesCC[parseInt(userData.selectedCC)] : null}
                                />

                                <TouchableOpacity
                                    style={{ alignItems: 'center', marginTop: 10 }}
                                    onPress={hideCC}
                                >
                                    <Image
                                        style={{ width: 25, height: 25, tintColor: 'gray' }}
                                        source={require('../assets/cancel.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>
            <View>
                <ButtonField
                    title={"Logout"}
                    onPress={() => { signOut() }}
                />
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    nameText: {
        fontSize: 28,
        color: 'gray',
        marginBottom: 20,
    },
    ticketText: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'center',
    },
    noText: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 5,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    ccButton: {
        width: '35%',
        marginBottom: 20,
    },
    buyButton: {
        width: '35%',
        marginBottom: 20,
        backgroundColor: '#fedf01'
    },
    border: {
        width: '90%',
        marginVertical: 10,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: '#0000001f',
    },
    photoIcon: {
        width: 30,
        height: 30,
        tintColor: '#0084B4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        padding: 10,
        elevation: 5,
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        backgroundColor: 'white',
    },
    destinationContainer: {
        marginTop: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000aa',
    },
    modalView: {
        // margin: 50,
        // backgroundColor: "white",
        // borderRadius: 20,
        // padding: 35,
        // alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

});
