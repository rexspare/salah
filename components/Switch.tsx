import React, { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import StandarButton from './StandarBtn';
interface SwitchProps {
  onPress: () => void;
  status: boolean;
}

export default function Switch({ onPress, status }: SwitchProps) {
  const translateX = useSharedValue(0);
  const backgroundColor = useSharedValue<string>('#C0C0C0');
  const colorScheme = useColorScheme() || 'light';

  useEffect(() => {
    if (status) {
      translateX.value = withTiming(15.5, { duration: 300 });
      backgroundColor.value = withTiming(Colors[colorScheme].focusColor, { duration: 300 });
    } else {
      translateX.value = withTiming(0, { duration: 300 });
      backgroundColor.value = withTiming('#C0C0C0', { duration: 300 });
    }
  }, [status, colorScheme, translateX, backgroundColor]);

  const animatedSwitchCircleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  return (
    <StandarButton onPress={onPress} style={styles.switchCont}>
      <Animated.View style={[styles.animatedCont, animatedBackgroundStyle]}>
        <Animated.View style={[styles.switchCircle, animatedSwitchCircleStyle]} />
      </Animated.View>
    </StandarButton>
  );
}

const styles = StyleSheet.create({
  switchCont: {
    height: 22,
    width: 38,
  },
  animatedCont: {
    flex: 1,
    borderRadius: 14.9,
    backgroundColor: '#C0C0C0',
    paddingHorizontal: 1.3,
    justifyContent: 'center',
  },
  switchCircle: {
    height: 20,
    aspectRatio: 1 / 1,
    backgroundColor: '#FFF',
    borderRadius: 100,
  },
});
