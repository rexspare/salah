import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import TimmingIconSvg from '@/assets/svg/TimmingIconSvg';
import SadiqabadSvg from '@/assets/svg/SadiqabadSvg';
import TimingOption from '@/components/timingOption';
import IndexDecoration from '@/components/IndexDecoration';
import DateScroll from '@/components/DateScroll';
import * as Location from 'expo-location';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() || 'light';
  
  const { fetchTimingData, setNextPrayer, timingData, city, nextPrayer, timeRemaining, gregorianDates, checkLocationPermission } = useGlobalContext();
  
  useEffect(() => {
    checkLocationPermission()
    fetchTimingData();
    
  }, [])

  const handleDateChange = () => {
    fetchTimingData();
    setNextPrayer('');
  };
  
  return (
    <SafeAreaView style={[{ backgroundColor: Colors[colorScheme].background, flex: 1 }]}>
      <ThemedView style={[{ flex: 1 }, styles.container]}>
        <IndexDecoration />
        <View style={{ zIndex: 2, flex: 1 }}>
          <View>
            <View style={styles.mainTitle}>
              <ThemedText type="title">{nextPrayer}</ThemedText>
            </View>
            <View style={styles.timeLeft}>
              <TimmingIconSvg fill={colorScheme === 'light' ? 'rgba(0, 0, 0, .7)' : 'rgba(255, 255, 255, .7)'} />
              <Text
                style={[
                  { color: colorScheme === 'light' ? 'rgba(0, 0, 0, .7)' : 'rgba(255, 255, 255, .7)' },
                  styles.timeLeftText,
                ]}
              >
                {timeRemaining ? `${timeRemaining} until ${nextPrayer}` : 'Loading...'}
              </Text>
            </View>

            <View style={styles.Sadiqabad}>
              <Text style={[{ color: Colors[colorScheme].focusColor }, styles.SadiqabadText]}>{city}</Text>
              <SadiqabadSvg fill={Colors[colorScheme].focusColor} />
            </View>
            <DateScroll onDateChange={handleDateChange} />
            <View style={styles.timeData}>
              <Text style={[styles.timeStile, { color: Colors[colorScheme].timingActive }]}>
                {gregorianDates?.hijri.weekday.en} {gregorianDates?.hijri.day}, {gregorianDates?.hijri.year} {gregorianDates?.hijri.designation.abbreviated}
              </Text>
              <Text style={[styles.timeDate, { color: Colors[colorScheme].timingActive }]}>
              {gregorianDates?.gregorian.weekday.en} {gregorianDates?.gregorian.day}, {gregorianDates?.gregorian.month.en} {gregorianDates?.gregorian.year} 
              </Text>
            </View>
          </View>
          <ScrollView style={styles.mainCont}>
            {timingData['Fajr'] ? (
              <>
                <TimingOption name="Fajr" data={timingData['Fajr']} timeRemaining={timeRemaining} focus={nextPrayer === 'Fajr'} />
                <TimingOption name="Sunrise" data={timingData['Sunrise']} timeRemaining={timeRemaining} focus={nextPrayer === 'Sunrise'} />
                <TimingOption name="Dhuhr" data={timingData['Dhuhr']} timeRemaining={timeRemaining} focus={nextPrayer === 'Dhuhr'} />
                <TimingOption name="Asr" data={timingData['Asr']} timeRemaining={timeRemaining} focus={nextPrayer === 'Asr'} />
                <TimingOption name="Maghrib" data={timingData['Maghrib']} timeRemaining={timeRemaining} focus={nextPrayer === 'Maghrib'} />
                <TimingOption name="Isha" data={timingData['Isha']} timeRemaining={timeRemaining} focus={nextPrayer === 'Isha'} />
              </>
            ) : (
              <Text style={[{ color: Colors[colorScheme].timingActive }, styles.timeDate]}>No data available</Text>
            )}
          </ScrollView>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainCont: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 300,
  },
  mainTitle: {
    marginBottom: 16,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12,
  },
  Sadiqabad: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
  },
  SadiqabadText: {
    fontSize: 13.27,
    fontWeight: '600',
    marginRight: 6,
  },
  timeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeLeftText: {
    marginLeft: 16,
    fontSize: 16.5,
    fontWeight: '600',
  },
  timeData: {
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 26,
    marginTop: 10,
  },
  timeStile: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeDate: {
    fontSize: 14,
    fontWeight: '600',
  },
});
