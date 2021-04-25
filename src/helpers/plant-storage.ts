import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
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
        notificationId: string;
    }
}

const getPlantFequency = (plant: SavedPlant) => {
    const { times, repeat_every } = plant.frequency;

    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    if (repeat_every === 'week') {
        const interval = Math.trunc(7 / times);
        nextTime.setDate(now.getDate() + interval);
    } else {
        nextTime.setDate(now.getDate() + 1)
    }

    const seconds = Math.abs(Math.ceil((now.getTime() - nextTime.getTime()) / 1000));
    
    return {
        seconds,
        nextTime,
    }
}

const scheduleNotification = async (plant: SavedPlant) => {
    const { seconds } = getPlantFequency(plant);

    try {
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heeeeeey!',
                body: `Está na hora de cuidar da sua ${plant.name}!`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
            }
        });

        return notificationId;
    } catch (error) {
        throw new Error(error);
    }
}

export const addPlantToStorage = async (plant: SavedPlant): Promise<void> => {
    try {
        const data = await AsyncStorage.getItem(PLANT_KEY);
        const oldPlants: StoragePlantProps = data ? JSON.parse(data) : {};
        const notificationId = await scheduleNotification(plant);

        const newPlants = {
            ...oldPlants,
            [plant.id]: {
                data: plant,
                notificationId,
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

export const fetchSavedPlantsList = async (): Promise<SavedPlant[]> => {
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

export const deleteSavedPlant = async (id: number): Promise<SavedPlant[]> => {
    try {
        const data = await AsyncStorage.getItem(PLANT_KEY);
        const plants: StoragePlantProps = data ? JSON.parse(data) : {};
        const { notificationId } = plants[id];

        await Notifications.cancelScheduledNotificationAsync(notificationId);

        delete plants[id];

        await AsyncStorage.setItem(PLANT_KEY, JSON.stringify(plants));

        const updatedList = await fetchSavedPlantsList();
        return updatedList;
    } catch (error) {
        throw new Error(error);        
    }
}