import { StyleSheet, View, useColorScheme, Dimensions } from 'react-native';
import StarsDecoration from '@/assets/svg/StarsDecoration';
import WabeDecoration from '@/assets/svg/WabeDecoration';

export default function IndexDecoration() {
  const colorScheme = useColorScheme() || 'light';
  const screenWidth = Dimensions.get('window').width + 20;

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      {colorScheme === 'light' ? <WabeDecoration /> : <StarsDecoration />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    transform: [{ translateX: - 0 }],
  },
});
