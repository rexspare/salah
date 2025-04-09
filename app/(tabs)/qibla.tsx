import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Animated, useColorScheme, Easing } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import QiblaRowSvg from '@/assets/svg/QiblaRowSvg';
import QiblaIconSvg from '@/assets/svg/QiblaIconSvg';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useFocusEffect } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [heading, setHeading] = useState(new Animated.Value(0));
  const [directionText, setDirectionText] = useState('');
  const [facingMakkah, setFacingMakkah] = useState(false);
  const magnetometerSubscription = useRef(null);

  const { city, qiblaDirection, updateQiblaPosition, updateLocation } = useGlobalContext();
  const colorScheme = useColorScheme() || 'light';
  const themeBackgroundColor = useThemeColor(
    { light: 'rgba(0,0,0,.1)', dark: '#FFF' },
    'text'
  );

  useEffect(() => {
    updateLocation();
    updateQiblaPosition();
  }, [updateLocation, updateQiblaPosition]);

  useFocusEffect(
    React.useCallback(() => {
      let lastUpdateTime = 0;
      const updateInterval = 200;
      let lastAngle = 0;
      const threshold = 8;

      const subscribeToMagnetometer = () => {
        if (magnetometerSubscription.current) return;

        magnetometerSubscription.current = Magnetometer.addListener((data) => {
          const now = Date.now();
          if (now - lastUpdateTime < updateInterval) return;
          lastUpdateTime = now;

          const { x, y } = data;
          let angle = Math.atan2(y, x) * (180 / Math.PI);
          angle = (angle >= 0 ? angle : angle + 360);
          angle = 360 - angle;

          if (Math.abs(angle - lastAngle) > threshold) {
            lastAngle = angle;

            Animated.timing(heading, {
              toValue: angle,
              duration: 200,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }).start();

            const angleDifference = (angle - qiblaDirection + (360 - 105)) % 360;
            const isFacingQibla = Math.abs(angleDifference) < threshold || Math.abs(angleDifference - 360) < threshold;

            if (isFacingQibla) {
              if (!facingMakkah) {
                setFacingMakkah(true);
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              }
              setDirectionText('You are facing Makkah');
              console.log('You are facing Makkah');
            } else {
              setFacingMakkah(false);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              if (angleDifference > 180) {
                setDirectionText('Turn Left'); // Shorter path to turn left
              } else {
                setDirectionText('Turn Right'); // Shorter path to turn right
              }
            }
          }
        });
      };

      subscribeToMagnetometer();

      return () => {
        if (magnetometerSubscription.current) {
          magnetometerSubscription.current.remove();
          magnetometerSubscription.current = null;
        }
        Animated.timing(heading).stop();
      };
    }, [heading, qiblaDirection])
  );

  const rotate = heading.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={[styles.mainCont, { backgroundColor: Colors[colorScheme].background }]}>
      <View style={styles.compass}>
        <View style={styles.QiblaRowSvg}>
          <QiblaRowSvg fill={Colors[colorScheme].focusColor} />
        </View>

        <Animated.View style={[styles.compassCont, { backgroundColor: themeBackgroundColor, transform: [{ rotate }] }]}>
          <Text style={[styles.compassText, styles.eText]}>W</Text>
          <Text style={[styles.compassText, styles.sText]}>S</Text>
          <Text style={[styles.compassText, styles.nText]}>N</Text>
          <Text style={[styles.compassText, styles.wText]}>E</Text>
          {qiblaDirection !== null && (
            <View style={[styles.qiblaIcon, { transform: [{ rotate: `${qiblaDirection + 90}deg` }] }]}>
              <QiblaIconSvg />
            </View>
          )}
        </Animated.View>
      </View>
      <ThemedText type="subtitle" style={{ marginBottom: 5 }}>
        Your location
      </ThemedText>
      <ThemedText type="title" lightColor="#14B17F" darkColor="#FF9141">
        {city}
      </ThemedText>
      {directionText ? (
        <ThemedText type="subtitle" style={{ marginTop: 10 }}>
          {directionText}
        </ThemedText>
      ) : null}
      {facingMakkah && (
        <ThemedText type="title" style={{ marginTop: 10, color: '#14B17F' }}>
          You are facing Makkah
        </ThemedText>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  QiblaRowSvg: {
    position: 'absolute',
    zIndex: 1,
    transform: [{ translateY: -30 }],
  },
  mainCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compass: {
    width: '78%',
    aspectRatio: 1 / 1,
    borderRadius: 150,
    maxWidth: 306,
    maxHeight: 306,
    backgroundColor: 'rgba(240,228,229,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 55,
  },
  compassCont: {
    position: 'relative',
    width: '84%',
    aspectRatio: 1 / 1,
    maxWidth: 312,
    borderRadius: 150,
  },
  compassText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 20,
    fontWeight: '600',
    position: 'absolute',
  },
  eText: {
    left: '50%',
    top: 0,
    transform: [{ translateX: -7 }, { translateY: 3 }],
  },
  sText: {
    top: '50%',
    left: 10,
    transform: [{ translateY: -11 }, { rotate: '90deg' }],
  },
  nText: {
    top: '50%',
    right: 10,
    transform: [{ translateY: -11 }, { rotate: '-90deg' }],
  },
  wText: {
    left: '50%',
    alignItems: 'center',
    width: '100%',
    bottom: 2,
  },
  qiblaIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
    padding: 10,
    alignItems: 'center',
  },
});

