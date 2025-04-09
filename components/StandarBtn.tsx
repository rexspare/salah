import React, { ReactNode } from 'react';
import { TouchableOpacity, Vibration, StyleProp, ViewStyle } from 'react-native';
import { useGlobalContext } from '@/context/GlobalProvider';

type StandarButtonProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  activeOpacity?: number;
};

const StandarButton: React.FC<StandarButtonProps> = ({ onPress, style, children, activeOpacity = 0.7 }) => {
  const { hapticFeedback } = useGlobalContext();

  const handlePress = () => {
    if (hapticFeedback) {
      Vibration.vibrate(50);
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style} activeOpacity={activeOpacity}>
      {children}
    </TouchableOpacity>
  );
};

export default StandarButton;
