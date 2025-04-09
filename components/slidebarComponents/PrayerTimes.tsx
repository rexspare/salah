import { StyleSheet, View, Text, useColorScheme, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { useEffect, useState, useRef } from 'react';
import Switch from '../Switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '@/context/GlobalProvider';
import StandarButton from '../StandarBtn';
import {timings} from '@/config/offset'
export default function PrayerTimes() {
  const colorScheme = useColorScheme() || 'light';
  const [active, setActive] = useState(false);
  const { playerTime, customMinutes, setPlayerTime, handleMadhabChange, Madhab, calculationMethod } = useGlobalContext();

  // Animación para la altura
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(0)).current;
  // Cambiar altura animada
  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: active ? 150 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
    Animated.timing(animatedTop, {
      toValue: active ? 8 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
    console.log(timings[calculationMethod], 'aaaadasdaa', calculationMethod,timings.calculationMethod)
  }, [active]);

  const opacityText = colorScheme === 'light'
    ? .7
    : .7;

  const handleTimeChange = async () => {
    try {
      await AsyncStorage.setItem('playerTime', JSON.stringify(!playerTime));
      setPlayerTime(!playerTime);
    } catch (error) {
      console.error('Error saving notifications state', error);
    }
  };

  return (
    <View>
      <Text style={[{ color: Colors[colorScheme].focusColor }, styles.textSelected]}>Settings</Text>
      <ThemedText style={styles.title}>Prayer Times</ThemedText>
      <ThemedText style={styles.subtitle}>Please select how you would like your prayer times to be calculated</ThemedText>
      <View style={[styles.optionCont, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor }]}>
        <ThemedText style={[styles.optionText, { opacity: opacityText }]}>12-hour Time</ThemedText>
        <Switch onPress={() => { handleTimeChange() }} status={playerTime} />
      </View>
      <StandarButton onPress={() => setActive(!active)} style={[styles.optionCont, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor }]}>
        <ThemedText style={[styles.optionText, { opacity: opacityText }]}>Madhab / Asr Time</ThemedText>
        <ThemedText style={[styles.optionText, { opacity: opacityText, fontSize: 12 }]}>{Madhab}</ThemedText>
      </StandarButton>
      <Animated.View style={[styles.locationCont, { maxHeight: animatedHeight, marginTop:animatedTop }]}>
        <StandarButton
          onPress={() => { handleMadhabChange('Earlier Asr'); setActive(false) }}
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
          onPress={() => { handleMadhabChange('Later Asr'); setActive(false) }}
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
      </Animated.View>
      <StandarButton style={[styles.optionCont, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor }]}>
        <ThemedText style={[styles.optionText, { opacity: opacityText }]}>Calculation Method</ThemedText>
        <ThemedText numberOfLines={1} style={[styles.optionText, { opacity: opacityText, fontSize: 12,maxWidth:150 }]}>{calculationMethod}</ThemedText>
      </StandarButton>
      <StandarButton style={[styles.optionCont, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor }]}>
        <ThemedText style={[styles.optionText, { opacity: opacityText }]}>High Altitude Method</ThemedText>
        <ThemedText style={[styles.optionText, { opacity: opacityText, fontSize: 12 }]}></ThemedText>
      </StandarButton>
      <StandarButton style={[styles.optionCont, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor }]}>
        <ThemedText style={[styles.optionText, { opacity: opacityText }]}>Custom Angles</ThemedText>
        <ThemedText style={[styles.optionText, { opacity: opacityText, fontSize: 12 }]}></ThemedText>
      </StandarButton>
      <StandarButton style={[styles.optionCont, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor }]}>
        <ThemedText style={[styles.optionText, { opacity: opacityText }]}>Custom Adjustments</ThemedText>
        <ThemedText style={[styles.optionText, { opacity: opacityText, fontSize: 12 }]}>({`${timings[calculationMethod]?.Fajr}, ${timings[calculationMethod]?.Sunrise}, ${timings[calculationMethod]?.Dhuhr}, ${timings[calculationMethod]?.Asr}, ${timings[calculationMethod]?.Maghrib}, ${timings[calculationMethod]?.Isha}`})</ThemedText>
      </StandarButton>
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
    marginBottom: 8
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 16,
    borderWidth: 2
  },
  locationCont: {
    overflow: 'hidden',  // Es necesario para ocultar el contenido cuando el maxHeight es 0
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  option: {
    width: '47%',
    height: 96,
    borderRadius: 8,
    padding: 7,
    marginTop: 8,
    borderWidth: 2,
    justifyContent: 'center',
  },
});
