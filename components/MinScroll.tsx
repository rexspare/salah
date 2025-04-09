import { StyleSheet, View, ScrollView, useColorScheme } from 'react-native';
import RigthArrowSvg from '@/assets/svg/RigthArrowSvg';
import LeftArrowSvg from '@/assets/svg/LeftArrowSvg';
import { Colors } from '@/constants/Colors';
import ScrollComp from './ScrollComp';

export default function MinScroll() {
  const colorScheme = useColorScheme() || 'light';

  return (
    <View style={styles.mainCont}>
      <View style={{ paddingRight: 10 }}>
        <LeftArrowSvg fill={Colors[colorScheme].focusColor} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 0 }}>
        <ScrollComp second='None' active={false} />
        <ScrollComp second='5' third='min' active={true} />
        <ScrollComp second='10' third='min' active={false} />
        <ScrollComp second='15' third='min' active={false} />
        <ScrollComp second='25' third='min' active={false} />
        <ScrollComp second='30' third='min' active={false} />
      </ScrollView>
      <View style={{ paddingLeft: 10 }}>
        <RigthArrowSvg fill={Colors[colorScheme].focusColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
