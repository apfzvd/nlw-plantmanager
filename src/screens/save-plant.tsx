import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { colors, fonts } from '../../styles';
import { alertMessage } from '../helpers/alert-message';

import Layout from '../components/layout';
import Button from '../components/button';
import WateringTip from '../components/watering-tip';

import { SvgFromUri } from 'react-native-svg';

import { addPlantToStorage, IPlant } from '../helpers/plant-storage';

const SavePlant = () => {
    const navigation = useNavigation();
    
    const [showDatePicker, setshowDatePicker] = useState(Platform.OS === 'ios');
    const [time, setTime] = useState(new Date());

    const { params: { plant } } = useRoute() as { params: { plant: IPlant }};

    const handleChangeTime = (_: Event, dateTime: Date | undefined) => {
        if (Platform.OS === 'android') {
            setshowDatePicker(oldState => !oldState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            return alertMessage('Ops, essa hora já passou! Escolha uma hora no futuro :D');
        }

        if (dateTime) {
            setTime(dateTime);
        }
    };

    const handleAddPlant = async () => {
        try {
            await addPlantToStorage({
                ...plant,
                dateTimeNotification: time,
            });

            navigation.navigate('Confirmation', {
                emoji: '😁',
                title: 'Tudo certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                actionText: 'Muito obrigado :D',
                nextRoute: 'ListSavedPlants',
            });
        } catch (error) {
            console.log('e', error)
            alertMessage('Ops, algo deu errado :('); 
        }
    };

    return (
        <Layout>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.plantContainer}>
                    <SvgFromUri uri={plant.photo} height={150} width={150} />
                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styles.plantActions}>
                    <WateringTip tip={plant.water_tips} />
                    
                    <Text style={styles.alertLabel}>
                        Ecolha o melhor horário para ser lembrado:
                    </Text>

                    {
                        showDatePicker && 
                            <DateTimePicker
                                value={time}
                                mode="time"
                                display="spinner"
                                onChange={handleChangeTime}
                            />
                    }

                    {
                        Platform.OS === 'android' && 
                            <TouchableOpacity style={styles.timeButton} onPress={() => setshowDatePicker(true)}>
                                <Text style={styles.timeText}>Mudar Horário {`${format(time, 'HH:mm')}`}</Text>
                            </TouchableOpacity>
                    }
                    
                    <Button text="Cadastrar Planta" onPress={handleAddPlant} />
                </View>
            </ScrollView>
        </Layout>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.shape,
    },
    plantContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plantActions: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        fontFamily: fonts.text,
        color: colors.heading,
        textAlign: 'center',
        fontSize: 16,
        marginTop: 15,
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 10,
    },
    timeButton: {
        marginBottom: 15,
        paddingVertical: 20,
    },
    timeText: {
        fontFamily: fonts.text,
        fontSize: 16,
        color: colors.heading,
        textDecorationLine: 'underline',
    },
})

export default SavePlant;