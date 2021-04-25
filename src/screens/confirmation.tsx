import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { colors, fonts } from '../../styles';

import Layout from '../components/layout';
import Button from '../components/button';

interface IConfirmScreen {
    emoji: string; 
    title: string;
    subtitle: string;
    actionText: string;
    nextRoute: string;
}

const Confirmation = () => {
    const navigation = useNavigation();
    const { params: { emoji, title, subtitle, actionText, nextRoute } } = useRoute() as { params: IConfirmScreen };
    
    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.emoji}>
                    {emoji}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>

                <Button text={actionText} onPress={() => navigation.navigate(nextRoute)} />
            </View>
        </Layout>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20, 
    },
    emoji: {
        fontSize: 64,
    },
    title: {
        fontSize: 28,
        lineHeight: 34,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 64,
        marginBottom: 16,
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        marginBottom: 40,
    },
    ConfirmationButton: {
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

export default Confirmation;