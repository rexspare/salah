import React, { useState, useEffect } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import MadhabSvg from '@/assets/svg/MadhabSvg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StandarButton from '../StandarBtn';
import { useGlobalContext } from '@/context/GlobalProvider';
export default function Madhab() {
    const colorScheme = useColorScheme() || 'light';
    const { handleMadhabChange, Madhab } = useGlobalContext();
    // Cargar el estado de Madhab desde AsyncStorage al montar el componente
    useEffect(() => {
        handleMadhabChange('Earlier Asr')
    }, []);

    return (
        <View style={styles.mainCont}>
            <MadhabSvg fill={Colors[colorScheme].focusColor} />

            <View style={styles.locationCont}>
                <StandarButton
                    onPress={() => handleMadhabChange('Earlier Asr')}
                    style={[styles.option, { 
                        backgroundColor: Colors[colorScheme].opacityBtn, 
                        borderColor: Madhab === 'Earlier Asr' ? Colors[colorScheme].focusColor : Colors[colorScheme].opacityBtn 
                    }]}
                >
                    <ThemedText style={[styles.title, { 
                        color: Madhab === 'Earlier Asr' ? Colors[colorScheme].focusColor : Colors[colorScheme].textColor, 
                        opacity: Madhab === 'Earlier Asr' ? 1 : 0.5 
                    }]}>
                        Earlier Asr Time
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Maliki, Shafi’i & Hanbali
                    </ThemedText>
                </StandarButton>
                <StandarButton
                    onPress={() => handleMadhabChange('Later Asr')}
                    style={[styles.option, { 
                        backgroundColor: Colors[colorScheme].opacityBtn, 
                        borderColor: Madhab === 'Later Asr' ? Colors[colorScheme].focusColor : Colors[colorScheme].opacityBtn 
                    }]}
                >
                    <ThemedText style={[styles.title, { 
                        color: Madhab === 'Later Asr' ? Colors[colorScheme].focusColor : Colors[colorScheme].textColor, 
                        opacity: Madhab === 'Later Asr' ? 1 : 0.5 
                    }]}>
                        Later Asr Time
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Hanafi
                    </ThemedText>
                </StandarButton>
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
    title: {
        fontSize: 14,
        fontWeight: '600',
        opacity: 0.5,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '600',
        opacity: 0.5,
    },
    option: {
        width: '47%',
        height: 96,
        borderRadius: 8,
        padding: 7,
        borderWidth: 2,
        justifyContent: 'center',
    },
    locationCont: {
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    optionText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
