import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { useState } from 'react';
import Switch from '../Switch';
import { useGlobalContext } from '@/context/GlobalProvider';
export default function Other() {
  const colorScheme = useColorScheme() || 'light';
  const { hapticFeedback, changeFeedbackConfig } = useGlobalContext();
  const opacityText = colorScheme === 'light'
    ? .7
    : .7;

  return (
    <View>
      <Text style={[{ color: Colors[colorScheme].focusColor }, styles.textSelected]}>Settings</Text>
      <ThemedText style={styles.title}>Other</ThemedText>
      <ThemedText style={styles.subtitle}>Here are any other setting for the app you can adjust.</ThemedText>
      <View style={[styles.optionCont,{ backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor }]}>
        <ThemedText style={[styles.optionText,{opacity:opacityText}]}>Haptic Feedback</ThemedText>
        <Switch onPress={()=>{changeFeedbackConfig()}} status={hapticFeedback}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 500,
    marginTop: 8,
    marginBottom: 4,
    lineHeight: 16,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    opacity: .6,
    marginBottom:8
  },
  textSelected: {
    fontSize: 12,
    fontWeight: '500'
  },
  optionCont: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection: 'row',
    marginTop: 16,
    borderWidth:2
  },
  optionText:{
    fontSize:14,
    fontWeight:'600'
  }
});



