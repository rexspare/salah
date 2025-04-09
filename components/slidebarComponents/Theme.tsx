import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import { useState } from 'react';
import Switch from '../Switch';
import { useNavigation, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemedText } from '../ThemedText';
import { useTheme } from '@/app/ThemeContext';
export default function Theme() {
  const { toggleTheme, isDarkTheme } = useTheme();
  
  const colorScheme = useColorScheme();
  const [active, setActive] = useState(colorScheme === 'dark');


  return (
    <View>
      <Text style={[{ color: active ? DarkTheme.colors.text : DefaultTheme.colors.text }, styles.textSelected]}>Settings</Text>
      <ThemedText style={styles.title}>Theme</ThemedText>
      <ThemedText style={styles.subtitle}>Please select the theme from the following categories</ThemedText>
      <View style={[styles.optionCont, { backgroundColor: active ? DarkTheme.colors.card : DefaultTheme.colors.card, borderColor: active ? DarkTheme.colors.border : DefaultTheme.colors.border }]}>
        <ThemedText style={[styles.optionText, { opacity: active ? 0.7 : 0.7 }]}>Enable Dark mode</ThemedText>
        <Switch onPress={toggleTheme} status={active} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
    lineHeight: 16,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.6,
    marginBottom: 8,
  },
  textSelected: {
    fontSize: 12,
    fontWeight: '500',
  },
  optionCont: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 16,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
