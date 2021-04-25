import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, fonts } from '../../styles';

import { fetchSavedPlantsList, SavedPlant } from '../helpers/plant-storage';

import Layout from '../components/layout';
import Header from '../components/header';
import WateringTip from '../components/watering-tip';
import { alertMessage } from '../helpers/alert-message';
import { format, formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import PlantCard from '../components/plant-card';

const ListSavedPlants = () => {
    const navigation = useNavigation();
    const [savedPlants, setSavedPlants] = useState<SavedPlant[]>();
    const [nextWateringText, setNextWateringText] = useState('');

    const fetchSaved = async () => {
        try {
            const plants = await fetchSavedPlantsList() || [];

            const nextWateringDiff = formatDistance(
                new Date(plants[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );
            
            setNextWateringText(`Não se esqueça de regar a ${plants[0].name} em ${nextWateringDiff}.`)
            setSavedPlants(plants);
        } catch (error) {
            alertMessage('Ops, algo deu errado')
        }
    }

    useEffect(() => {
        fetchSaved();
    }, [])

    return (
        <Layout>
            <View style={styles.container}>
                <Header />

                <View style={styles.spotlight}>
                    <WateringTip floatUp={false} tip={nextWateringText} />
                </View>

                <View style={styles.plantList}>
                    <Text style={styles.title}>Próximas regadas</Text>

                    <FlatList
                        data={savedPlants}
                        renderItem={({ item }) => 
                            <PlantCard
                                type="row"
                                name={item.name}
                                photo={item.photo}
                                wateringTime={format(new Date(item.dateTimeNotification), 'HH:mm')}
                            />
                        }
                        keyExtractor={item => `${item.id}`}
                    />
                </View>

            </View>
        </Layout>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
    },
    spotlight: {
        marginVertical: 40,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginVertical: 15,
    },
    plantList: {
        flex: 1,
    },
})

export default ListSavedPlants;