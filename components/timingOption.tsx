import React from 'react';
import { Text, StyleSheet, View, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import TimingBellActive from '@/assets/svg/TimingBellActiveSvg';
import TimingBellUnactiveSvg from '@/assets/svg/TimingBellUnactiveSvg';
import { useGlobalContext } from '@/context/GlobalProvider';
import StandarButton from './StandarBtn';
import { ThemedText } from './ThemedText';

type TimingOptionProps = {
  name: string;
  time: string;
  focus: boolean;
  active: boolean;
};

const formatTime = (time: string, is12HourFormat: boolean) => {
  const [hours, minutes] = time.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  if (is12HourFormat) {
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  } else {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  }
};

export default function TimingOption({ name, data, focus, timeRemaining }: TimingOptionProps) {
  const colorScheme = useColorScheme() || 'light';
  const { useSlidebar, setSlidebarSelected, playerTime, setTimingSelected } = useGlobalContext(); 
  return (
    <StandarButton
      onPress={() => {
        useSlidebar();
        setSlidebarSelected('Timing');
        setTimingSelected(data);
      }}
      style={[
        styles.container,
        { borderColor: focus ? Colors[colorScheme].timingActive : Colors[colorScheme].TimingOption },
      ]}
    >
      <View style={{alignItems:'center', flexDirection:'row'}}>
        <Text style={[styles.name, { color: focus ? Colors[colorScheme].timingActive : Colors[colorScheme].TimingOption }]}>
          {name}
        </Text>
        {focus ?
          <ThemedText style={[styles.timeRemaining,{color:colorScheme === 'light' ? Colors[colorScheme].timingActive : '#FFF'}]}>
            {timeRemaining}
          </ThemedText>
          : ''}
      </View>
      <View>
        <View style={styles.rigtCont}>
          <Text
            style={[styles.timeText, { color: focus ? Colors[colorScheme].timingActive : Colors[colorScheme].TimingOption }]}
          >
            {formatTime(data.time, playerTime)}

          </Text>
          {data.notificationStatus != 'unactive' ? (
            <TimingBellActive fill={focus ? Colors[colorScheme].timingActive : Colors[colorScheme].TimingOption} />
          ) : (
            <TimingBellUnactiveSvg fill={focus ? Colors[colorScheme].timingActive : Colors[colorScheme].TimingOption} />
          )}
        </View>
      </View>
    </StandarButton>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 16,
  },
  rigtCont: {
    flexDirection: 'row',
  },
  timeRemaining: {
    fontSize: 12,
    opacity: .5,
    marginLeft: 20
  }
});
