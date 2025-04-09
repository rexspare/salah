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

  const styles = {
    footer: {
      backgroundColor: statusBarColor, 
      height: 85,
      paddingBottom: 15,
      paddingTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        android: {
          elevation: 56,
        },
      }),
    },
    tabBarItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBarLabel: {
      fontSize: 12,
      marginTop: -2,
    },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, paddingBottom: insets?.bottom || 0 }}>
            {/* Cambia el color del StatusBar según la ruta y el tema */}
            <StatusBar 
              barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} 
              backgroundColor={statusBarColor} 
            />
            <SlidebarControler />
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                headerShown: false,
                tabBarStyle: styles.footer,
                tabBarItemStyle: styles.tabBarItem,
                tabBarLabelStyle: styles.tabBarLabel,
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: 'Timing',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'timing' : 'timing-outline'} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="player"
                options={{
                  title: 'Prayer',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'player' : 'player-outline'} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="qibla"
                options={{
                  title: 'Qibla',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'Qibla' : 'Qibla-outline'} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="setting"
                options={{
                  title: 'Setting',
                  tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
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
