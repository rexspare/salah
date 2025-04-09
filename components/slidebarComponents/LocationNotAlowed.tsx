import { StyleSheet, View, Text, useColorScheme, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { useState } from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';
import StandarButton from '../StandarBtn';
import LocationSvg2 from '@/assets/svg/LocationSvg2';
import * as Location from 'expo-location'; // Importa Location de expo-location

export default function LocationNotAllowed() {
  const colorScheme = useColorScheme() || 'light';
  const [locationAllowed, setLocationAllowed] = useState(false);
  const { useSlidebar } = useGlobalContext();
  const handleLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      setLocationAllowed(true);
      // Aquí ejecuta la función useSlidebar si se otorgan los permisos
      useSlidebar();
    } else {
      Alert.alert(
        "Permisos no concedidos",
        "No podemos acceder a la ubicación. Por favor, habilítelos desde la configuración."
      );
    }
  };

  return (
    <View>
      <ThemedText style={styles.title}>Turn location Permissions to “Always”</ThemedText>
      <View style={{alignItems:'center'}}>
        <LocationSvg2 fill={Colors[colorScheme].focusColor} />
      </View>
      <ThemedText style={styles.subtitle}>
        Enable location permissions to find your local prayer times & calculate qibla directions. Enable notifications permissions to receive alert. Locations data are fully secure.
      </ThemedText>
      <StandarButton 
        onPress={handleLocationPermission} 
        style={[styles.submitBtn, { backgroundColor: Colors[colorScheme].focusColor }]}
      >
        <Text style={styles.btnText}>Change to “Always”</Text>
      </StandarButton>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 40,
    lineHeight: 16,
    alignItems: 'center',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'center'
  },
  submitBtn: {
    marginTop: 60,
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  }
});
