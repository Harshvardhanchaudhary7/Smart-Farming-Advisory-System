import { createContext, useContext, useState, useEffect} from "react";
import { navigateTo } from "../utils/navigation";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {

  const [weather, setWeather] = useState(null);
  
const showNotification = (title, body) => {

 const key =
  weather.location.name +
  weather.current.temp_c +
  weather.current.wind_kph +
  weather.forecast.forecastday[0].day.daily_chance_of_rain;

  const lastKey = localStorage.getItem("lastWeatherAlert");

if (lastKey === key) {
  return;
}

localStorage.setItem("lastWeatherAlert", key);

  if (Notification.permission === "granted") {

    const notification = new Notification(title, {
      body,
      icon: "/logo.png",
    });

 notification.onclick = () => {
  window.focus();
  navigateTo("/alerts");
};

  }

};


useEffect(() => {

  if (!weather) return;

  const current = weather.current;

  const forecast =
    weather.forecast.forecastday[0].day;

  if (forecast.daily_chance_of_rain >= 70) {

    showNotification(

      "🌧 Heavy Rain Alert",

      "Avoid irrigation today."

    );

  }

  if (current.temp_c >= 38) {

    showNotification(

      "🌡 High Temperature",

      "Water crops early morning."

    );

  }

  if (current.wind_kph >= 30) {

    showNotification(

      "💨 Strong Wind",

      "Avoid pesticide spraying."

    );

  }

}, [weather]);

  return (
<WeatherContext.Provider value={{ weather, setWeather,}}>
    {children}
 </WeatherContext.Provider>
  );
};

export const useWeather = () => {

  return useContext(WeatherContext);

};