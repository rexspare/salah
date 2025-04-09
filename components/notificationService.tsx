import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av'; // Importar para asegurarnos de que el sonido se pueda manejar correctamente
import { Asset } from 'expo-asset';
// Configura notificaciones para mostrar el aviso
export async function registerForPushNotificationsAsync() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (finalStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  } catch (error) {
    console.error('Error during push notification registration:', error);
  }
}

// Envía una notificación local
async function preloadSound({adhan}) {
  const { sound } = await Audio.Sound.createAsync(
    require('@/assets/mp3/Misharycut.mp3')
  );
  if(adhan) await sound.playAsync(); 
 
}

export async function scheduleNotification(title, body, adhan) {
  preloadSound({adhan})
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  } catch (error) {
    console.error('Error during notification scheduling:', error);
  }
}
