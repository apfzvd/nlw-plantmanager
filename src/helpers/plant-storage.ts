import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const PLANT_KEY = '@plantmanager::plants';

export interface IPlant {
    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: string[];
    frequency: {
      times: number;
      repeat_every: string;
    };
}

export interface SavedPlant extends IPlant {
    dateTimeNotification: Date;
    hour?: string;
}

interface StoragePlantProps {
    [id: string]: {
        data: SavedPlant;
    }
}

export const addPlantToStorage = async (plant: SavedPlant): Promise<void> => {
    try {
        const data = await AsyncStorage.getItem(PLANT_KEY);
        const oldPlants: StoragePlantProps = data ? JSON.parse(data) : {};

        const newPlants = {
            ...oldPlants,
            [plant.id]: {
                data: plant,
            }
        }

        await AsyncStorage.setItem(PLANT_KEY, JSON.stringify(newPlants));
    } catch (error) {
        throw new Error(error);        
    }
}

export const fetchSavedPlants = async (): Promise<StoragePlantProps> => {
    try {
        const data = await AsyncStorage.getItem(PLANT_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        throw new Error(error);        
    }
}

export const fetchSavedPlantsList = async (): Promise<SavedPlant[] | undefined> => {
    try {
        const plants = await fetchSavedPlants();
        return Object
            .keys(plants)
            .map(plantId => ({
                ...plants[plantId].data,
                hour: format(new Date(plants[plantId].data.dateTimeNotification), 'HH:mm')
            }))
            .sort((a, b) => Math.floor(
                new Date(a.dateTimeNotification).getTime() / 1000 -
                Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
            ));
    } catch (error) {
        throw new Error(error);
    }
}