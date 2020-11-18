
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export function TextButton({ title, style, onPress }) {
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
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: '#0084B4',
        fontWeight: '500',
    }

});
