import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, fonts } from '../../styles';

import { Feather } from '@expo/vector-icons';
import waterImg from '../assets/watering.png';

import Layout from '../components/layout';
import Button from '../components/button';

const Welcome = () => {
    const navigation = useNavigation();
    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Gerencie {`\n`}
                    suas plantas de {`\n`}
                    forma fácil
                </Text>

                <Image style={styles.image} source={waterImg} resizeMode="contain" />

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
                    sempre que precisar.
                </Text>

                <Button
                    spacing="none"
                    style={styles.welcomeButton}
                    onPress={() => navigation.navigate('UserIdentification')}
                >
                    <Feather name="chevron-right" style={styles.buttonIcon} />
                </Button>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20, 
    },
    title: {
        fontSize: 28,
        lineHeight: 34,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        marginBottom: 20,
    },
    welcomeButton: {
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    buttonIcon: {
        color: '#fff',
        fontSize: 28,
    },
    image: {
        height: '50%',
    },
})

export default Welcome;