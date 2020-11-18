import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export function ButtonField({ title, style, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text style={[styles.text]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0084B4',
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    }

});
