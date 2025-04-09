import { StyleSheet, View, Text, useColorScheme, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { useState } from 'react';
import StandarButton from '../StandarBtn';
export default function Onboarding({ title, autopilot, text, children, onClick, btn }) {
    const colorScheme = useColorScheme() || 'light';
    const backgroundColor = colorScheme === 'light'
        ? 'rgba(223, 223, 223, .7)'
        : 'rgba(255, 255, 255, .5)';

    return (
        <View style={styles.mainCont}>
            <View style={{alignItems:'center', height:68, }}>
                <ThemedText style={styles.title}>{title}</ThemedText>
                {autopilot && <ThemedText style={[styles.autopilot,{backgroundColor:backgroundColor}]}>AUTOPILOT</ThemedText>}
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingTop: 50, alignItems: 'center',
                 }}>
                    {children}
                </View>
            </ScrollView>
            <View>
                <ThemedText style={styles.text} >
                    {text}
                </ThemedText>
                <StandarButton onPress={onClick} style={[styles.nextBtn, { backgroundColor: Colors[colorScheme].focusColor }]}>
                    <Text style={styles.nextText}>{btn}</Text>
                </StandarButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainCont: {
        flex: 1,
        paddingTop: 12,
        width: '100%',
    },
    autopilot:{
        fontSize:18,
        fontWeight:'600',
        opacity:.5,
        paddingHorizontal:8,
        paddingVertical:5,
        borderRadius:4
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: '700',
        textAlign: 'center'
    },
    nextBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 48,
        borderRadius: 12,
        marginBottom: 30,
        marginTop: 14
    },
    nextText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center'
    }
});



