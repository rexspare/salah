import React, { useEffect } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';

interface DateScrollCompProps {
  cantity?: number;
  position?: number;
}

export default function Pragnator({ cantity = 0, position = 0 }: DateScrollCompProps) {
  const colorScheme = useColorScheme() || 'light';

  // Create shared values for animations
  const widths = Array.from({ length: cantity }, (_, index) => useSharedValue(index === position ? 64 : 16));
  const opacities = Array.from({ length: cantity }, (_, index) => useSharedValue(index === position ? 1 : 0.25));
  const backgroundColors = Array.from({ length: cantity }, (_, index) => useSharedValue(index === position ? Colors[colorScheme].focusColor : Colors[colorScheme].textColor));

  useEffect(() => {
    widths.forEach((width, index) => {
      width.value = withTiming(index === position ? 64 : 16, { duration: 200 });
    });

    opacities.forEach((opacity, index) => {
      opacity.value = withTiming(index === position ? 1 : 0.25, { duration: 200 });
    });

    backgroundColors.forEach((backgroundColor, index) => {
      backgroundColor.value = withTiming(index === position ? Colors[colorScheme].focusColor : Colors[colorScheme].textColor, { duration: 200 });
    });
  }, [position, cantity, colorScheme]);

  return (
    <View style={styles.mainCont}>
      {Array.from({ length: cantity }, (_, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          width: widths[index].value,
          opacity: opacities[index].value,
          backgroundColor: backgroundColors[index].value,
        }));

        return (
          <Animated.View
            key={index}
            style={[styles.option, animatedStyle]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainCont: {
    flexDirection: 'row',
  },
  option: {
    height: 16,
    marginHorizontal: 2,
    borderRadius: 20,
  },
});
