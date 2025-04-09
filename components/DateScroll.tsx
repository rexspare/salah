import { StyleSheet, View, ScrollView, useColorScheme } from 'react-native';
import RigthArrowSvg from '@/assets/svg/RigthArrowSvg';
import LeftArrowSvg from '@/assets/svg/LeftArrowSvg';
import { Colors } from '@/constants/Colors';
import ScrollComp from './ScrollComp';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function DateScroll({ onDateChange }) {
  const { setDateActive, setIndexDateSelected } = useGlobalContext();
  const colorScheme = useColorScheme() || 'light';
  const [active, setActive] = useState(0);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const today = currentDate.getDate();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const generatedDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentDate);
      date.setDate(today + i);

      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

      return {
        first: daysOfWeek[date.getDay()],
        second: date.getDate().toString(),
        third: (date.getDate() - 1).toString(),
        fullDate: formattedDate, // Fecha completa en formato DD-MM-YYYY
        active: i === 0,
      };
    });

    setDates(generatedDates);
    setActive(0);
    setIndexDateSelected(generatedDates[0].fullDate); // Pasa la fecha inicial al componente padre
  }, []);

  const handleDateClick = (index) => {
    setActive(index);
    onDateChange(); 
    setIndexDateSelected(dates[index].fullDate)
  };

  return (
    <View style={styles.mainCont}>
      <View style={{ paddingRight: 10 }}>
        <LeftArrowSvg fill={Colors[colorScheme].focusColor} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 0 }}>
        {dates.map((date, index) => (
          <ScrollComp
            key={index}
            first={date.first}
            second={date.second}
            third={date.third}
            active={active === index}
            onClick={() => handleDateClick(index)}
          />
        ))}
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
    padding: 10,
  },
});
