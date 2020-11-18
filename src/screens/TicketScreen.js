
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { ButtonField } from '../components/ButtonField';

const data = [
    { "halte": "Blok M" },
    { "halte": "Mesjid Agung" },
    { "halte": "Bundaran Senayan" },
    { "halte": "Gelora Bung Karno" },
    { "halte": "Polda Metro Jaya" },
    { "halte": "Bendungan Hilir" },
    { "halte": "Karet Sudirman" },
    { "halte": "Dukuh Atas" },
    { "halte": "Tosari" },
    { "halte": "Bundaran HI" },
    { "halte": "Sarinah" },
    { "halte": "Bank Indonesia" },
    { "halte": "Monumen Nasional" },
    { "halte": "Harmoni" },
    { "halte": "Sawah Besar" },
    { "halte": "Mangga Besar" },
    { "halte": "Olimo" },
    { "halte": "Glodok" },
    { "halte": "Kota" },
]

export function TicketScreen({ navigation }) {
    const [originHalte, setOriginHalte] = useState('Blok M');
    const [destinationHalte, setDestinationHalte] = useState('Blok M');

    let total = 0
    if (originHalte !== '' && destinationHalte !== '') {
        total = 'Rp3.500'
    }

    const purchase = async () => {
        try {
            await AsyncStorage.setItem('ticket', JSON.stringify({
                id: Date.now(),
                origin: originHalte,
                destination: destinationHalte,
                total: total
            }))
            setOriginHalte('')
            setDestinationHalte('')
            navigation.goBack()
        } catch (e) {
            console.log(e);
        }
    }

    const loadData = async () => {
        var item = await AsyncStorage.getItem('ticket')
        console.log('item :', item);
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.ticketText}>Buy Ticket</Text>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.subText}>Origin</Text>
                    <View style={styles.selectContainer}>
                        <Picker
                            selectedValue={originHalte}
                            style={{ marginLeft: 10, color: 'gray' }}
                            onValueChange={(itemValue, itemIndex) => setOriginHalte(itemValue)}
                        >
                            {
                                data.map((item, i) => {
                                    return (
                                        <Picker.Item key={i} label={item.halte} value={item.halte} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.subText}>Destination</Text>
                    <View style={styles.selectContainer}>
                        <Picker
                            selectedValue={destinationHalte}
                            style={{ marginLeft: 10, color: 'gray' }}
                            onValueChange={(itemValue, itemIndex) => setDestinationHalte(itemValue)}
                        >
                            {
                                data.map((item, i) => {
                                    return (
                                        <Picker.Item key={i} label={item.halte} value={item.halte} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>
                <Text style={styles.totalText}>Total Amount :  {total} </Text>
            </View>
            <ButtonField
                title={"Purchase"}
                onPress={purchase}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    ticketText: {
        fontSize: 24,
        color: 'gray',
        marginBottom: 25,
        textAlign: 'center',
    },
    subText: {
        fontSize: 18,
        color: 'gray',
        marginLeft: 5,
        marginBottom: 10,

    },
    selectContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#0000001f',
        backgroundColor: '#E8E8E8',

    },
    totalText: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 30,
        alignItems: 'center',
    },
});
