import { Tabs, usePathname } from 'expo-router';
import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaInsetsContext } from 'react-native-safe-area-context';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import SlidebarControler from '@/components/slidebarComponents/slidebarControler';

export default function TabLayout() {
  const colorScheme = useColorScheme() || 'light';
  const pathname = usePathname();

  const getStatusBarColor = () => {
    if (pathname === '/index' && colorScheme === 'light') {
      return '#3DB2EB';
    } else {
      return colorScheme === 'light' ? '#FFF' : '#053529';
    }
  };

  const statusBarColor = getStatusBarColor();

  return (
    <SafeAreaProvider>
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, paddingBottom: insets?.bottom || 0 }}>

            <StatusBar 
              barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} 
              backgroundColor={statusBarColor} 
            />
            <SlidebarControler />
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                headerShown: false,
                tabBarStyle: { display: 'none' }, // Oculta las tabs
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: 'index',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'timing' : 'timing-outline'} color={color} />
                  ),
                }}
              />
            </Tabs>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </SafeAreaProvider>
  );
}
