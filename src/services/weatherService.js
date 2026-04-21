import axios from "axios";

 const API_KEY = "f775be3b1765ca5565a0436819716251";
  

export const getCurrentWeather = async (city) => {
  return await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
};

export const getForecast = async (lat, lon) => {
  return await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
};