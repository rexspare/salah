// Componente LocationStart
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import * as Location from 'expo-location';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import LocationSvg from '@/assets/svg/LocationSvg';
import LitTlePlane from '@/assets/svg/LitTlePlane';
import { useGlobalContext } from '@/context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LocationStart({ onLocationStartChange }) {

    const colorScheme = useColorScheme() || 'light';
    const { setOnBoardingBtnText } = useGlobalContext();
    const [location, setLocation] = useState<string | null>(null);
    const [active, setActive] = useState(true);
    useEffect(() => {
        setOnBoardingBtnText('Enable Locations Permissions');
        const loadNotification = async () => {
            if (onLocationStartChange) {
                getLocation();
                handleMadhabChange('test')
            }

        };

        loadNotification();
    }, [onLocationStartChange]);
    
    const handleMadhabChange = async (madhabValue) => {
        try {
            setActive(madhabValue);
            await AsyncStorage.setItem('AsrTime', JSON.stringify(madhabValue)); // Asegúrate de que la clave sea consistente
        } catch (error) {
            console.error('Error saving Madhab state', error);
        }
    };
    const getLocation = () => {
        (async () => {
            let currentLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = currentLocation.coords;

            let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
            if (reverseGeocode.length > 0) {
                const { city, country } = reverseGeocode[0];
                setLocation(`${city || 'City not found'}`);
                setOnBoardingBtnText('Loading...');
            } else {
                setLocation('Location not found');
            }
        })();
    }
    return (
        <View style={styles.mainCont}>
            <LocationSvg fill={Colors[colorScheme].focusColor} />
            <View style={[styles.locationCont, { backgroundColor: Colors[colorScheme].opacityBtn }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ThemedText style={styles.first}>Location </ThemedText>
                    <LitTlePlane fill={Colors[colorScheme].textColor} />
                </View>
                <ThemedText style={styles.second}>{location || 'Enable Location services'}</ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainCont: {
        flex: 1,
        width: '100%',
    },
    locationCont: {
        borderRadius: 8,
        height: 49,
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 7,
    },
    first: {
        fontSize: 12,
        fontWeight: '600',
        marginRight: 3,
        opacity: 0.5,
    },
    second: {
        fontSize: 16,
        fontWeight: '600',
        opacity: 0.5,
    },
});
