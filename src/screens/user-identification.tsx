import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors, fonts } from '../../styles';

import KeyboardLayout from '../components/keyboard-layout';
import Button from '../components/button';

const UserIdentification = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');

    const handleSetName = (text: string) => {
        setName(text);
    };

    const handleNavigate = async () => {
        await AsyncStorage.setItem('@plantmanager::user', name);
        navigation.navigate('Confirmation', {
            emoji: '😁',
            title: 'Prontinho',
            subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
            actionText: 'Começar',
            nextRoute: 'PlantSelect',
        });
    };

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
                    onChangeText={handleSetName}
                />

                <Button
                    disabled={!name}
                    style={styles.button}
                    text="Começar"
                    onPress={handleNavigate}
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