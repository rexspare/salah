import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { ConfigOption } from '@/components/configOption';
import PlayerConfigSvg from '@/assets/svg/PlayerConfigSvg';
import ConfigNotificationSvg from '@/assets/svg/ConfigNotificationSvg';
import ThemesConfigSvg from '@/assets/svg/ThemesConfigSvg';
import OtherConfigSvg from '@/assets/svg/OtherConfigSvg';
import SupportConfigSvg from '@/assets/svg/SupportConfigSvg';
import FaqConfigSvg from '@/assets/svg/FaqConfigSvg';
import ReportConfigSvg from '@/assets/svg/ReportConfigSvg';
import RequestConfigSvg from '@/assets/svg/RequestConfigSvg';
import PrivacyConfigSvg from '@/assets/svg/PrivacyConfigSvg';
import ShareConfigSvg from '@/assets/svg/ShareConfigSvg';

export default function SettingsScreen() {
  const colorScheme = useColorScheme() || 'light';

  const configOptions = [
    { icon: <PlayerConfigSvg fill={Colors[colorScheme].configSvg} />, title: 'Prayer Times' },
    { icon: <ConfigNotificationSvg fill={Colors[colorScheme].configSvg} />, title: 'Notifications' },
    { icon: <ThemesConfigSvg fill={Colors[colorScheme].configSvg} />, title: 'Themes' },
    { icon: <OtherConfigSvg fill={Colors[colorScheme].configSvg} />, title: 'Calculation Method' },
    { icon: <OtherConfigSvg fill={Colors[colorScheme].configSvg} />, title: 'Custom Adjustments' },
    {
      icon: <SupportConfigSvg fill={Colors[colorScheme].configSvg} />,
      title: 'Support Us',
      subtitle: 'Experience our ad-free prayer app, designed by Muslims with a commitment to privacy. Support the free version and share in the blessings.',
      button: 'Recurring',
      secondButton: 'One off',
    },
    {
      icon: <FaqConfigSvg fill={Colors[colorScheme].configSvg} />,
      title: 'FAQs & Feedback',
      subtitle: 'For questions or feedback, visit our FAQs section. Your input is valuable and helps improve our app.',
      button: 'FAQs',
    },
    {
      icon: <ReportConfigSvg fill={Colors[colorScheme].configSvg} />,
      title: 'Report Issue',
      subtitle: 'Salah is an ad-free prayer app, created by Muslims with a strong emphasis on privacy. Support the free version of the Salah app and be part of the reward.',
      button: 'Report issue',
    },
    {
      icon: <RequestConfigSvg fill={Colors[colorScheme].configSvg} />,
      title: 'Request Feature',
      subtitle: 'If you have ideas for new features, please share them with us using the "Request Feature" option.',
      button: 'Request feature',
    },
    { icon: <PrivacyConfigSvg fill={Colors[colorScheme].configSvg} />, title: 'Privacy Policy', center: true },
    { icon: <ShareConfigSvg fill={Colors[colorScheme].configSvg} />, title: 'Share the reward', center: true },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <ThemedView>
        <View style={styles.mainTitle}>
          <ThemedText type='title'>Settings</ThemedText>
        </View>
        <ScrollView style={styles.mainCont}>
          <View style={{ paddingBottom: 75 }}>
            {configOptions.map((option, index) => (
              <ConfigOption
                key={index}
                icon={option.icon}
                title={option.title}
                subtitle={option.subtitle}
                button={option.button}
                secondButton={option.secondButton}
                center={option.center}
              />
            ))}
            <ThemedText type='littleText' style={{ textAlign: 'center', color: Colors[colorScheme].focusColor }}>
              Salah v1.0.0
            </ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCont: {
    padding: 16,
    paddingTop: 0,
  },
  mainTitle: {
    paddingTop: 12,
    paddingHorizontal: 16,
    marginBottom: 23,
  },
});
