
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export function InputField({ children, style, ...props }) {
    return (
        <TextInput {...props} style={[styles.input, style]} />
    )
};

const styles = StyleSheet.create({
    input: {
        padding: 8,
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 10,
        borderColor: '#0000001f',
        backgroundColor: '#E8E8E8',
    }

});
