import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as Location from 'expo-location';
import { QiblaDirection, TimingData } from "@/config/httprouter";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GregorianDates } from '@/config/httprouter';
// Define la interfaz para el contexto global
interface GlobalContextProps {
  slidebarActive: boolean;
  setSlidebarActive: (value: boolean) => void;
  useSlidebar: () => void;
  changeNotificationConfig: () => void;
  slidebarSelected: boolean;
  setSlidebarSelected: (value: boolean) => void;
  changeFeedbackConfig: () => void;
  hapticFeedback: boolean;
  setHapticFeedback: (value: boolean) => void;
  onBoardingBtnText: string;
  setOnBoardingBtnText: (value: string) => void;
  city: string;
  latitud: number;
  setIndexDateSelected: Array;
  longitude: number;
  qiblaDirection: number;
  indexDateSelected: number;
  notification: boolean;
  setNotification: (value: string) => void;
  AsrTime: string;
  setAsrTime: (value: string) => void;
  playerTime: string;
  setPlayerTime: (value: string) => void;
  timingData: string;
  setTimingData: (value: string) => void;
  updateLocation: () => Promise<void>;
  updateQiblaPosition: () => Promise<void>;
}

// Crear el contexto global con un valor inicial indefinido
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Hook para acceder al contexto
export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// Tipar las props del GlobalProvider
interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [slidebarActive, setSlidebarActive] = useState(false);
  const [slidebarSelected, setSlidebarSelected] = useState('');
  const [hapticFeedback, setHapticFeedback] = useState(false);
  const [onBoardingBtnText, setOnBoardingBtnText] = useState('Next');
  const [city, setCity] = useState('Next');
  const [country, setCountry] = useState('Next');
  const [latitud, setLatitud] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [notification, setNotification] = useState(true);
  const [AsrTime, setAsrTime] = useState('Next');
  const [playerTime, setPlayerTime] = useState('Next');
  const [timingData, setTimingData] = useState({});
  const [timeOption, setTimeOption] = useState<any>(null);
  const [timingSelected, setTimingSelected] = useState({});
  const [indexDateSelected, setIndexDateSelected] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(0);
  const [dateActive, setDateActive] = useState(0);
  const [currentDate, setCurrentDate] = useState();
  const [gregorianDates, setGregorianDates] = useState();
  const [Madhab, setMadhab] = useState();
  const [nextPrayer, setNextPrayer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [calculationMethod, setCalculationMethod] = useState('');
  const useSlidebar = () => {
    setSlidebarActive(!slidebarActive);
  };
  const getCurrentDate = async () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    // Format: DD/MM/YYYY
    const formattedDate = `${day}-${month}-${year}`;
    const gettedGregorianDates = await GregorianDates(formattedDate);
    setGregorianDates(gettedGregorianDates.data.data)
    console.log(gettedGregorianDates.data.data, 'gettedCurrentDategettedCura2rentDate')
    setCurrentDate(formattedDate);
  };
  const loadHapticFeedbackConfig = async () => {
    try {
      const hapticFeedback = await AsyncStorage.getItem('hapticFeedback');
      if (hapticFeedback !== null) {
        setHapticFeedback(JSON.parse(hapticFeedback))
      } else {
        await AsyncStorage.setItem('hapticFeedback', JSON.stringify(true));
        setHapticFeedback(true)
      }
    } catch (error) {
      console.error("Error loading Madhab state", error);
    }
  };
  const loadMadhabChange = async () => {
    try {
      const MadhabChange = await AsyncStorage.getItem('AsrTime');
      if (MadhabChange !== null) {
        setMadhab(MadhabChange.replace(/^"|"$/g, ''))
      } else {
        await AsyncStorage.setItem('AsrTime', 'Earlier Asr');
        setHapticFeedback(true)
      }
    } catch (error) {
      console.error("Error loading Madhab state", error);
    }
  };
  const handleMadhabChange = async (madhabValue) => {
    setMadhab(madhabValue);
    await AsyncStorage.setItem('AsrTime', JSON.stringify(madhabValue));
  };

  const changeFeedbackConfig = async () => {
    await AsyncStorage.setItem('hapticFeedback', JSON.stringify(!hapticFeedback));
    setHapticFeedback(!hapticFeedback)
  }
  const loadNotificationsConfig = async () => {
    try {
      const hapticFeedback = await AsyncStorage.getItem('notifications');
      if (hapticFeedback !== null) {
        setNotification(JSON.parse(hapticFeedback))
      } else {
        await AsyncStorage.setItem('notifications', JSON.stringify(true));
        setNotification(true)
      }
    } catch (error) {
      console.error("Error loading Madhab state", error);
    }
  };
  const changeNotificationConfig = async () => {
    await AsyncStorage.setItem('notifications', JSON.stringify(!notification));
    setNotification(!notification)
  }

  const loadConfig = async () => {
    try {
      const time = await AsyncStorage.getItem('playerTime');
      if (time !== null) {
        setPlayerTime(time)
      } else {

      }
    } catch (error) {
      console.error("Error loading Madhab state", error);
    }
  };

  // Función para obtener la ubicación actual
  const updateLocation = async () => {
    try {
      Location.requestForegroundPermissionsAsync()
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLatitud(latitude);
      setLongitude(longitude);

      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (reverseGeocode.length > 0) {
        const { city, country } = reverseGeocode[0];
        setCity(city ?? 'Unknown City');
        setCountry(country ?? 'Unknown Country');
      } else {
        setCity('Location not found');
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Función para obtener la dirección de la Qibla
  const updateQiblaPosition = async () => {
    try {
      const qiblaResponse = await QiblaDirection(latitud, longitude);
      const qiblaDir = qiblaResponse.data.data.direction;
      setQiblaDirection(qiblaDir);
    } catch (error) {
      console.error("Error fetching Qibla direction:", error);
    }
  };
  const fetchTimingData = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      try {
        const response = await TimingData(indexDateSelected, latitude, longitude, Madhab, country);
        setTimeOption(response.data.data.timings);
        console.log(response.data.data.meta, 'response.data.data.metaresponsaae.data.data.metasdasda')
        setCustomMinutes(response.data.data.meta.offset)
        setCalculationMethod(response.data.data.meta.method.name)
      } catch (error) {
        console.error('Error al obtener los datos de TimingData:', error);
      }


    } catch (error) {
      console.error('Error fetching timing data:', error);
    }
  };
  useEffect(() => {
    if (timeOption) {
      const formatTime = (hours, minutes) => {
        // Asegura que los minutos estén en formato de dos dígitos
        const formattedMinutes = String(minutes).padStart(2, '0');
        return `${hours}:${formattedMinutes}`;
      };

      const timeToMinutes = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
      };

      const transformedTimeOption = Object.fromEntries(
        Object.entries(timeOption).map(([prayer, time]) => {
          const [hours, minutes] = time.split(':').map(Number);
          const additionalMinutes = Number(customMinutes[prayer] || 0);
          const totalMinutes = hours * 60 + minutes + additionalMinutes;
          const newHours = Math.floor(totalMinutes / 60);
          const newMinutes = totalMinutes % 60;
          const formattedTime = formatTime(newHours, newMinutes);

          return [
            prayer,
            {
              time: formattedTime, // Usa el tiempo formateado
              notificationStatus: 'active',
              name: prayer,
              date: indexDateSelected,
            },
          ];
        })
      );

      setTimingData(transformedTimeOption);

      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const prayerTimes = {
        Fajr: transformedTimeOption['Fajr'].time,
        Sunrise: transformedTimeOption['Sunrise'].time,
        Dhuhr: transformedTimeOption['Dhuhr'].time,
        Asr: transformedTimeOption['Asr'].time,
        Maghrib: transformedTimeOption['Maghrib'].time,
        Isha: transformedTimeOption['Isha'].time,
      };

      let nextPrayer = '';
      let minTimeDiff = Infinity;

      Object.entries(prayerTimes).forEach(([prayer, time]) => {
        const prayerMinutes = timeToMinutes(time);
        const timeDiff = prayerMinutes - currentMinutes;

        if (timeDiff > 0 && timeDiff < minTimeDiff) {
          minTimeDiff = timeDiff;
          nextPrayer = prayer;
        }
      });

      if (nextPrayer) {
        setNextPrayer(nextPrayer);

        let timeDiffMs = minTimeDiff * 60 * 1000;
        const updateTimeRemaining = () => {
          if (timeDiffMs <= 0) {
            setTimeRemaining('00hs 00m 00s');
            clearInterval(intervalId);
            return;
          }

          const hours = Math.floor(timeDiffMs / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiffMs % (1000 * 60)) / 1000);

          setTimeRemaining(`- ${hours}hs ${minutes}m ${seconds}s`);

          timeDiffMs -= 1000;
        };

        const intervalId = setInterval(updateTimeRemaining, 1000);
        updateTimeRemaining();
        return () => clearInterval(intervalId);
      }
    }
  }, [timeOption, customMinutes]);
  const checkLocationPermission = async () => {
    try {
      // Obtener el estado del permiso de ubicación sin solicitarlo
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === 'granted') {

      } else {
        setSlidebarSelected('locationNotAllowed');
      }
    } catch (error) {
      console.error('Error al verificar el estado de los permisos de ubicación:', error);
      setSlidebarSelected('locationNotAllowed');
    }
  };


  useEffect(() => {
    loadConfig()
    loadMadhabChange()
    updateLocation();
    loadHapticFeedbackConfig()
    loadNotificationsConfig()
    getCurrentDate()
    updateQiblaPosition()
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        updateLocation,
        updateQiblaPosition,
        slidebarActive,
        setSlidebarActive,
        useSlidebar,
        setTimeOption,
        timeOption,
        setSlidebarSelected,
        slidebarSelected,
        setOnBoardingBtnText,
        onBoardingBtnText,
        changeFeedbackConfig,
        hapticFeedback,
        notification,
        AsrTime,
        setAsrTime,
        playerTime,
        setPlayerTime,
        timingData,
        setTimingData,
        qiblaDirection,
        city,
        latitud,
        longitude,
        playerTime,
        setPlayerTime,
        changeNotificationConfig,
        setTimingSelected,
        timingSelected,
        setIndexDateSelected,
        indexDateSelected,
        setDateActive,
        dateActive,
        setCustomMinutes,
        customMinutes,
        currentDate,
        gregorianDates,
        handleMadhabChange,
        Madhab,
        fetchTimingData,
        setNextPrayer,
        nextPrayer,
        timeRemaining,
        checkLocationPermission,
        calculationMethod
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
