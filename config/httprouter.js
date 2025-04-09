import axios from 'axios';

export const QiblaDirection = (latitude, longitude) => {
  return axios.get(`http://api.aladhan.com/v1/qibla/${latitude}/${longitude}`,);
};
export const GregorianDates = (date) => {
  return axios.get(`http://api.aladhan.com/v1/gToH/${date}`,);
};

export const TimingData = (date, latitude, longitude, Madhab, country) => {
  return axios.get(`http://api.aladhan.com/v1/timings/${date}`, {
    params: {
      latitude: latitude,
      longitude: longitude,
      method: country === 'United Kingdom' ? 1 : undefined, // Añade el método si es UK
      school: Madhab === 'Earlier Asr' ? 0 : 1, // 0 es Hanafi, 1 es Shafi'i
    }
  });
};
