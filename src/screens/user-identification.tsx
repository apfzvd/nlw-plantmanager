import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, fonts } from '../../styles';

import KeyboardLayout from '../components/keyboard-layout';
import Button from '../components/button';

const UserIdentification = () => {
    const navigation = useNavigation();
    const [hasValue, setHasValue] = useState(false);

    return (
        <KeyboardLayout style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.emoji}>
                    😊
                </Text>

                <Text style={styles.title}>
                    Como podemos {`\n`}
                    chamar você?
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    autoFocus
                    onChangeText={(text) => setHasValue(!!text)}
                />

                <Button
                    disabled={!hasValue}
                    style={styles.button}
                    text="Começar"
                    onPress={() => navigation.navigate('Confirmation')}
                />
            </View>
        </KeyboardLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    form: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 24,
    },
    title: {
        fontSize: 28,
        lineHeight: 32,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 20,
    },
    input: {
       borderBottomWidth: 1,
       borderColor: colors.green,
       color: colors.heading,
       width: '100%',
       fontSize: 18,
       marginTop: 50,
       padding: 10,
       textAlign: 'center', 
    },
    button: {
        marginTop: 40,
    },
})

export default UserIdentification;