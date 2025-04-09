import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalProvider from '@/context/GlobalProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import AppOpeningAnimation from '@/components/slash/AppOpeningAnimation';
import * as Notifications from 'expo-notifications';

// Prevent the splash screen from auto-hiding before asset loading is complete.
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const router = useRouter();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    const checkFirstTime = async () => {
      const firstTime = await AsyncStorage.getItem('isFirstTime');
      if (firstTime === null) {
        await AsyncStorage.setItem('isFirstTime', 'true');
        setIsFirstTime(true);
      } else {
        setIsFirstTime(false);
      }
    };

    checkFirstTime();
  }, []);

  useEffect(() => {
    const hideSplash = async () => {
      try {
        if (isFirstTime !== false) {
          router.replace('/(auth)/');
        } else{
          router.replace('/(tabs)/');
        }
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    if (isFirstTime !== null) {
      hideSplash();
    }
  }, [isFirstTime]);

  if (isFirstTime === null) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
      <AppOpeningAnimation/>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GlobalProvider>
    </ThemeProvider>
  );
}
