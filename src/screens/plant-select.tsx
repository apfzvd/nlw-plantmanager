import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { api } from '../services/api';
import { colors, fonts } from '../../styles';

import Layout from '../components/layout';
import Header from '../components/header';
import AmbientButton from '../components/ambient-button';
import PlantCard from '../components/plant-card';
import Loading from '../components/loading';

interface AmbientItems {
    key: string;
    title: string;
}

interface Plant {
    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: string[];
    frequency: {
      times: number;
      repeat_every: string;
    }
  }

const PlantSelect = () => {
    const [selectedAmbient, setSelectedAmbient] = useState('all');
    const [data, setData] = useState<AmbientItems[]>([]);
    const [plantsData, setPlantsData] = useState<Plant[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchPlants = async () => {
        const { data } = await api.get('/plants', 
            { params: { ['_sort']: 'name', ['_order']: 'asc', ['_page']: currentPage, ['_limit']: 8 } }
        );

        if (currentPage > 1) {
            setPlantsData(oldData => [...oldData, ...data])
            setPlants(oldData => [...oldData, ...data])
        } else {
            setPlantsData(data);
            setPlants(data);
        }

        setLoadingMore(false);
    };

    const paginatePlants = ({ distanceFromEnd }) => {
        if (distanceFromEnd < 1) {
            return;
        }

        setLoadingMore(true);
        setCurrentPage(prevPage => prevPage + 1);
        fetchPlants();
    };

    useEffect(() => {
        const fetchAmbients = async () => {
            setLoading(true);
            const { data } = await api.get('/plants_environments', 
                { params: { ['_sort']: 'title', ['_order']: 'asc' } }
            );
            setData([
                {
                    key: 'all',
                    title: 'Todos'
                },
                ...data,
            ]);

            setLoading(false);
        };

        fetchAmbients();
        fetchPlants();
    }, []);

    useEffect(() => {
        if (selectedAmbient === 'all') {
            return setPlants(plantsData);
        }

        setPlants(plantsData?.filter(plant => plant.environments.includes(selectedAmbient)));
    }, [selectedAmbient])

    return (
        <Layout>
            <View style={styles.container}>
                <Header />

                <Text style={styles.title}>
                    Em qual hambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>

                {loading && <Loading />}

                {!loading && <View>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => 
                            <AmbientButton 
                                style={styles.ambientButton}
                                title={item.title}
                                active={selectedAmbient === item.key}
                                onPress={() => setSelectedAmbient(item.key)}
                            />
                        }
                        keyExtractor={item => item.key}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.ambientList}
                    />
                </View>}

                {!loading && <View style={styles.plantList}>
                    <FlatList
                        data={plants}
                        renderItem={({ item }) => 
                            <PlantCard name={item.name} photo={item.photo} />
                        }
                        keyExtractor={item => `${item.id}`}
                        numColumns={2}
                        onEndReachedThreshold={0.1}
                        onEndReached={paginatePlants}
                        ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green_dark} /> : null}
                    />
                </View>}
            </View>
        </Layout>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20, 
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 15,
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    ambientList: {
       height: 40,
       marginVertical: 32, 
    },
    ambientButton: {
        marginRight: 10,
    },
    plantList: {
        flex: 1,
    },
})

export default PlantSelect;