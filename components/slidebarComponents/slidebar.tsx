import React, { useEffect, useState, ReactNode } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Dimensions, Keyboard } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useGlobalContext } from '@/context/GlobalProvider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import StandarButton from '../StandarBtn';
interface SlideBarProps {
  status: boolean;
  children: ReactNode;
}

export default function SlideBar({ status, children }: SlideBarProps) {
  const { useSlidebar } = useGlobalContext();
  const translateY = useSharedValue(0);
  const backgroundColor = useSharedValue('rgba(0,0,0,0)');
  const [display, setDisplay] = useState<'flex' | 'none'>('flex');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideKeyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showKeyboardListener.remove();
      hideKeyboardListener.remove();
    };
  }, []);

  useEffect(() => {
    if (status) {
      translateY.value = withTiming(keyboardVisible ? -150 : 0, { duration: 300 });
      backgroundColor.value = withTiming('rgba(0,0,0,0.5)', { duration: 300 });
      setDisplay('flex');
    } else {
      translateY.value = withTiming(624, { duration: 300 });
      backgroundColor.value = withTiming('rgba(0,0,0,0)', { duration: 300 });

      const timer = setTimeout(() => {
        setDisplay('none');
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [status, keyboardVisible, translateY, backgroundColor]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const animatedContainerStyle2 = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  const windowHeight = Dimensions.get('window').height;
  const calculatedHeight = windowHeight - 624;
  
  return (
    <Animated.View style={[styles.container, animatedContainerStyle2, { display }]}>
      <StandarButton onPress={useSlidebar} style={{ height: calculatedHeight }}>
        <View />
      </StandarButton>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      >
        <Animated.View style={animatedContainerStyle}>
          <ThemedView style={styles.mainCont}>
            <View style={styles.slidebarLine} />
            {children}
          </ThemedView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    zIndex: 100,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  mainCont: {
    height: 624,
    borderTopEndRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 22,
    paddingTop: 40,
    position: 'relative',
  },
  slidebarLine: {
    width: 139,
    position: 'absolute',
    height: 5,
    borderRadius: 100,
    backgroundColor: '#C0C0C0',
    top: 22,
    left: '40.64%',
  },
});
