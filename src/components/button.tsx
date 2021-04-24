import React from 'react';

import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { colors, fonts } from '../../styles';

interface ButtonProps extends TouchableOpacityProps {
    text?: String;
    children?: JSX.Element;
    spacing?: 'none' | 'standard' | 'full';
}

const Button = ({ text, children, style, spacing = 'standard', disabled, ...rest }: ButtonProps) => {
    return (
        <TouchableOpacity 
            style={[styles.button, styles[spacing], disabled && styles.disabled, style]} 
            activeOpacity={0.7}
            disabled={disabled}
            {...rest}
        >
            {children ? children : <Text style={styles.buttonText}>{text}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 17,
    },
    disabled: {
        backgroundColor: colors.green_light,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: fonts.heading,
    },
    none: {
        height: 56,
    },
    standard: {
        height: 56,
        width: 311,
    },
    full: {
        height: 56,
        width: '100%',
    },
})

export default Button