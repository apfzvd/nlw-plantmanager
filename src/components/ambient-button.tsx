import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { colors, fonts } from '../../styles';

interface AmbientButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

const AmbientButton = ({ title, active = false, style, ...rest }: AmbientButtonProps) => {
    return (
        <RectButton style={[styles.button, active && styles.activeButton,style]} {...rest}>
            <Text style={[styles.buttonText, active && styles.activeText]}>
                {title}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.shape,
      height: 40,
      width: 76,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    activeButton: {
        backgroundColor: colors.green_light,
    },
    buttonText: {
        color: colors.heading,
        fontFamily: fonts.text,
    },
    activeText: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
    }
  });
  

export default AmbientButton;