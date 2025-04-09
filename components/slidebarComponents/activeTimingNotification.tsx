import { StyleSheet, View, Text, useColorScheme, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import SpeakerSvg from '@/assets/svg/SpeakerSvg';
import TimingBellActive from '@/assets/svg/TimingBellActiveSvg';
import TimingBellUnactiveSvg from '@/assets/svg/TimingBellUnactiveSvg';
import { useState, useEffect } from 'react';
import MinScroll from '../MinScroll';
import { scheduleNotification, registerForPushNotificationsAsync } from '../notificationService';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function ActiveTimingNotification() {
  const colorScheme = useColorScheme() || 'light';
  const { timingData, timingSelected, setTimingData } = useGlobalContext();
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    async function getToken() {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);
    }
    getToken();
  }, []);

  const color = colorScheme === 'light' ? '#000' : '#FFF';
  const colorSubtitle = colorScheme === 'light' ? 'rgba(92, 92, 92, 1)' : 'rgba(255, 255, 255, .6)';

  const updateNotificationStatus = async (status) => {
    // Crea un nuevo objeto con el estado de notificación actualizado para el temporizador seleccionado
    const updatedTimingData = {
      ...timingData,
      [timingSelected.name]: {
        ...timingData[timingSelected.name],
        notificationStatus: status
      }
    };
    // Actualiza el estado con el nuevo objeto de datos de temporización
    setTimingData(updatedTimingData);

    // Envía una notificación basada en el estado
    if (status === 'active') {
      await scheduleNotification(`${timingSelected.name} is at 3.49pm`, 'This is an example notification', false);
    } else if (status === 'activeAdan') {
      await scheduleNotification(`${timingSelected.name} Adhan Notification`, 'Adhan and notification are active.', true);
    }
  };

  return (
    <View>
      <Text style={[{ color: Colors[colorScheme].focusColor }, styles.textSelected]}>{timingSelected.name} Time</Text>
      <ThemedText style={styles.title}>Notifications & Adhan</ThemedText>

      <View style={styles.statusCont}>
        <TouchableOpacity
          onPress={() => updateNotificationStatus('unactive')}
          style={[styles.statusOption, { backgroundColor: Colors[colorScheme].opacityBtn }, timingData[timingSelected.name].notificationStatus === 'unactive' ? { borderColor: Colors[colorScheme].focusColor } : { borderColor: Colors[colorScheme].opacityBtn }]}
        >
          <TimingBellUnactiveSvg fill={timingData[timingSelected.name].notificationStatus === 'unactive' ? Colors[colorScheme].focusColor : color} />
          <ThemedText style={[styles.statusTitle, timingData[timingSelected.name].notificationStatus === 'unactive' ? { color: Colors[colorScheme].focusColor } : null]}>
            Silent
          </ThemedText>
          <ThemedText style={styles.statusSubtitle}>No notifications</ThemedText>
          <ThemedText style={styles.statusSubtitle}>or adhans.</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => updateNotificationStatus('active')}
          style={[styles.statusOption, { backgroundColor: Colors[colorScheme].opacityBtn }, timingData[timingSelected.name].notificationStatus === 'active' ? { borderColor: Colors[colorScheme].focusColor } : { borderColor: Colors[colorScheme].opacityBtn }]}
        >
          <TimingBellActive fill={timingData[timingSelected.name].notificationStatus === 'active' ? Colors[colorScheme].focusColor : color} />
          <ThemedText style={[styles.statusTitle, timingData[timingSelected.name].notificationStatus === 'active' ? { color: Colors[colorScheme].focusColor } : null]}>Notifications</ThemedText>
          <ThemedText style={styles.statusSubtitle}>Banner notification only</ThemedText>
          <ThemedText style={styles.statusSubtitle}>(with default sound).</ThemedText>
          <ThemedText style={styles.statusSubtitle}>No Adhan.</ThemedText>
        </TouchableOpacity>
      </View>
      {timingSelected.name !== 'Sunrise' ?
        <TouchableOpacity
          onPress={() => updateNotificationStatus('activeAdan')}
          style={[{ backgroundColor: Colors[colorScheme].opacityBtn }, styles.notificationSelected, timingData[timingSelected.name].notificationStatus === 'activeAdan' ? { borderColor: Colors[colorScheme].focusColor } : { borderColor: Colors[colorScheme].opacityBtn }]}
        >
          <SpeakerSvg fill={timingData[timingSelected.name].notificationStatus === 'activeAdan' ? Colors[colorScheme].focusColor : color} />
          <View style={{ marginLeft: 5 }}>
            <ThemedText style={[styles.notificationName, timingData[timingSelected.name].notificationStatus === 'activeAdan' ? { color: Colors[colorScheme].focusColor } : null]}>Adhan + Notification</ThemedText>
            <ThemedText style={[{ color: colorSubtitle }, styles.notificationSubtitle]}>Adhan by Mishary Rashid Al-Afasy + banner notification.</ThemedText>
          </View>
        </TouchableOpacity>
        : ''}
      {timingSelected.name !== 'Sunrise' ?
        <View style={{ opacity: timingData[timingSelected.name].notificationStatus !== 'unactive' ? 1 : .06, marginTop: 27 }}>
          <ThemedText style={styles.ReminderText}>Pre-Adhan Reminder</ThemedText>
          <MinScroll />
        </View>
        : ''}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 16,
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8
  },
  statusCont: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statusSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    opacity: .6
  },
  statusOption: {
    backgroundColor: '#07513E',
    borderWidth: 2,
    paddingVertical: 30,
    width: '47%',
    borderRadius: 12,
    alignItems: 'center'
  },
  textSelected: {
    fontSize: 12,
    fontWeight: '500'
  },
  notificationSelected: {
    height: 79,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
    borderWidth: 2
  },
  notificationName: {
    fontSize: 16,
    fontWeight: '500'
  },
  notificationSubtitle: {
    fontSize: 12
  },
  ReminderText: {
    marginBottom: 16,
    fontWeight: '500'
  }
});
