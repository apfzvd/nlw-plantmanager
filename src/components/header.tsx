import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors, fonts } from '../../styles';

import profileImg from '../assets/ana.png';

interface HeaderProps {}

const Header = ({  }: HeaderProps) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.name}>Ana Paula</Text>
            </View>

            <Image style={styles.image} source={profileImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 40,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    name: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 34,
    }
  });
  

export default Header;