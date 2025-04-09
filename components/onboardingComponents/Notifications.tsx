import React, { useState, useEffect } from 'react';
import { StyleSheet, View, useColorScheme, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import NotificationSvg from '@/assets/svg/NotificationSvg';
import Switch from '../Switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function NotificationsStart({ onNotificationStartChange }) {
    const [status, setStatus] = useState(false);
    const colorScheme = useColorScheme() || 'light';
    const { setOnBoardingBtnText } = useGlobalContext();
    const requestNotificationPermissions = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Permiso no concedido', 'Necesitas conceder permisos de notificaciones para usar esta función.');
            return false;
        }

        return true;
    };

    const sendNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Fajr at 3:44 am",
                body: "This is an example notification",
            },
            trigger: null,
        });
    };
    useEffect(() => {
        loadNotification();
    }, [onNotificationStartChange]);

    const loadNotification = async () => {
        if (onNotificationStartChange) {
            toggleNotifications();
            setOnBoardingBtnText('Loading...')
        } else {
            setOnBoardingBtnText('Select Permission')
        }
    };

    const toggleNotifications = async () => {
        try {
            const newStatus = !status;
            if (newStatus) {
                const hasPermissions = await requestNotificationPermissions();
                if (!hasPermissions) return;
                await sendNotification();
            }
            try {
                await AsyncStorage.setItem('notifications', JSON.stringify(newStatus));
            } catch (error) {
                console.error('Error saving Madhab state', error);
            }
            setStatus(newStatus);
        } catch (error) {
            console.error('Error al guardar el estado de las notificaciones', error);
        }
    };

    return (
        <View style={styles.mainCont}>
            <NotificationSvg fill={Colors[colorScheme].focusColor} />
            <View style={[styles.locationCont, { backgroundColor: Colors[colorScheme].opacityBtn }]}>
                <ThemedText style={styles.optionText}>Enable Notifications</ThemedText>
                <Switch onPress={loadNotification} status={status} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainCont: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    locationCont: {
        marginTop: 10,
        borderRadius: 8,
        height: 49,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 7,
        width: '100%',
    },
    optionText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
