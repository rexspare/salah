import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps, ReactNode } from 'react';
import { Share , Text, View, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import PlayerConfigSvg from '@/assets/svg/PlayerConfigSvg';
import { ThemedText } from '@/components/ThemedText';
import { useGlobalContext } from '@/context/GlobalProvider';
import StandarButton from './StandarBtn';
type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

interface ConfigOptionProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  icon?: ReactNode;
  button?: string;
  secondButton?: string;
}

export function ConfigOption({
  title,
  subtitle,
  center,
  icon,
  button,
  secondButton,
}: ConfigOptionProps) {
  const colorScheme = useColorScheme() || 'light';
  const { useSlidebar, setSlidebarSelected } = useGlobalContext();

  const handlePress = () => {
    if (title === 'Share the reward') {
      Share.share({
        message: 'Share this with your friends!',
      });
    } else {
      if (!button) {
        useSlidebar();
        setSlidebarSelected(title);
      }
    }
  };

  return (
    <StandarButton
      onPress={handlePress}
      style={[styles.container, { backgroundColor: Colors[colorScheme].opacityBtn, borderColor: Colors[colorScheme].borderColor }]}
      activeOpacity={button ? 1 : 0.2}
    >
      <View style={styles.titleCont}>
        <View style={styles.svgCont}>{icon}</View>
        <ThemedText
          style={[
            styles.title,
            center ? styles.titleCenter : undefined,
            { color: Colors[colorScheme].configSvg }
          ]}
          type='defaultSemiBold'
        >
          {title}
        </ThemedText>
      </View>
      {subtitle && (
        <ThemedText style={styles.subtitle} type='opacitySemiBold'>
          {subtitle}
        </ThemedText>
      )}

      <View style={styles.buttonCont}>
        {button && (
          <>
            <StandarButton
              onPress={() => { useSlidebar(); setSlidebarSelected(title); }}
              style={[styles.button, { backgroundColor: Colors[colorScheme].focusColor }]}
            >
              <Text style={{ color: Colors[colorScheme].buttonText }}>{button}</Text>
            </StandarButton>

            {secondButton && (
              <StandarButton
                style={[
                  styles.button,
                  { borderColor: Colors[colorScheme].focusColor, borderWidth: 1, marginLeft: 8 },
                ]}
              >
                <Text style={{ color: Colors[colorScheme].focusColor }}>{secondButton}</Text>
              </StandarButton>
            )}
          </>
        )}
      </View>
    </StandarButton>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  buttonCont: {
    flexDirection: 'row',
  },
  titleCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
  },
  titleCenter: {
    flex: 1,
    textAlign: 'center',
    paddingRight: 24,
  },
  svgCont: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 32,
    padding: 5,
    marginTop: 8,
    minWidth: 83,
  },
});
