import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, useColorScheme, View, Image, ImageSourcePropType } from 'react-native';

const images: Record<string, ImageSourcePropType> = {
  'image1.png': require('@/assets/images/metal-faucet-dripping-water 1.png'),
  'image2.png': require('@/assets/images/6705765 1.png'),
  'image3.png': require('@/assets/images/6606041 1.png'),
  'image4.png': require('@/assets/images/hand-drawn-flat-design-prayer-mat-illustration 1.png'),
  'image5.png': require('@/assets/images/6599101 1.png'),  // Añade aquí más imágenes según sea necesario
};

interface PlayerOptionProps {
  title: string;
  subtitle: string;
  backgroundColor: string;
  img: keyof typeof images;
}

export function PlayerOption({ title, subtitle, backgroundColor, img }: PlayerOptionProps) {
  const colorScheme = useColorScheme() || 'light';
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: Colors[colorScheme].PlayerText }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme].PlayerText }]}>{subtitle}</Text>
      </View>
      <View style={styles.imgCont}>
        <Image source={images[img]} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 119,
    borderRadius: 12.5,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingTop: 22,
    paddingLeft: 19,
    paddingBottom: 18,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15.54,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 11.66,
    fontWeight: '600',
    maxWidth: 110,
  },
  imgCont: {
    marginRight: 20,
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
