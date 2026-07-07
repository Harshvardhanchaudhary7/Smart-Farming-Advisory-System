import React, {useState, useEffect} from 'react'
import { WiDaySunny, WiCloud, WiRain, WiSunrise, WiSunset, WiHumidity, WiStrongWind,} from "react-icons/wi";
import { FaSeedling, FaTint, FaCloudRain, FaTemperatureHigh, FaWind, FaCheckCircle, FaLightbulb,} from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { useWeather } from "../context/WeatherContext";
import { useTranslation } from "react-i18next";
import { translateWeather } from "../utils/weatherTranslation.js";
import toast from "react-hot-toast";
import API_URL from "../config";

const Weather = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { weather, setWeather } = useWeather();
  const [city, setCity] = useState("");

  useEffect(() => {

    getCurrentLocation();

}, []);

const fetchWeather = async () => {
  try {

    if (!city.trim()) return;

    const res = await axios.get(
      `${API_URL}/api/weather?city=${city}`
    );

    setWeather(res.data);

    localStorage.setItem("selectedCity", res.data.location.name);

  } catch (error) {

    console.log(error);

    toast.error(t("cityNotFound"));

  }
};

const getCurrentLocation = () => {

  if (!navigator.geolocation) {
    toast.error(t("geolocationNotSupported"));
    return;
  }

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {

        const res = await axios.get(
          `${API_URL}/api/weather?city=${lat},${lon}`
        );

        setWeather(res.data);
        localStorage.setItem( "selectedCity", res.data.location.name);

        setCity(res.data.location.name);

      } catch (error) {

        console.log(error);

      }

    },

    () => {

      toast.error(t("locationDenied"));

    }

  );

};

const getFarmingAdvice = () => {

  if (!weather) {
    return {
      icon: <FaSeedling className="text-green-600 text-3xl" />,
      title: t("loading"),
      advice: "Fetching weather information...",
      action: "Please wait."
    };
  }

  const temp = weather.current.temp_c;
  const humidity = weather.current.humidity;
  const wind = weather.current.wind_kph;
  const rain = weather.forecast.forecastday[0].day.daily_chance_of_rain;

  // Heavy Rain
  if (rain >= 70) {
    return {
      icon: <FaCloudRain className="text-blue-600 text-3xl" />,
      title: t("heavyRainExpected"),
      advice: t("heavyRainAdvice"),
      action: t("heavyRainAction2")
    };
  }

  // High Temperature
  if (temp >= 38) {
    return {
      icon: <FaTemperatureHigh className="text-red-500 text-3xl" />,
      title: t("highTemperatureTitle"),
      advice:t("highTemperatureDescription"),
      action:t("highTemperatureAction2")
    };
  }

  // Strong Wind
  if (wind >= 30) {
    return {
      icon: <FaWind className="text-gray-600 text-3xl" />,
      title:  t("strongWindTitle"),
      advice: t("strongWindAdvice"),
      action: t("strongWindAction2")
    };
  }

  // High Humidity
  if (humidity >= 80) {
    return {
      icon: <FaTint className="text-cyan-500 text-3xl" />,
      title: t("highHumidityTitle"),
      advice: t("highHumidityAdvice"),
      action: t("highHumidityAction2")
    };
  }

  // Low Humidity
  if (humidity <= 30) {
    return {
      icon: <FaTint className="text-orange-500 text-3xl" />,
      title: t("dryWeatherTitle"),
      advice: t("dryWeatherAdvice"),
      action: t("dryWeatherAction2")
    };
  }

  // Good Weather
  return {
    icon: <FaCheckCircle className="text-green-600 text-3xl" />,
    title: t("goodWeatherTitle"),
    advice: t("goodWeatherAdvice"),
    action: t("goodWeatherAction2")
  };

};

const farmingAdvice = getFarmingAdvice();


  return (
  <div className="flex">
  <Sidebar
  isOpen={isOpen}
  setIsOpen={setIsOpen}  />

  <div className="md:ml-72 flex-1 bg-gray-100 overflow-x-hidden">
        <Navbar title={t("weather")}
        setIsOpen={setIsOpen} />

        <div className="p-6 mt-18">
 {/* Header */}
          <h1 className="text-3xl font-bold mb-2">
            {t("weatherForecast")}
          </h1>
    <div className="flex items-center gap-2 mb-6">
            <FaMapMarkerAlt className="text-gray-600 text-xl" />
   
 <input
  type="text"
  placeholder={t("searchCity")}
  value={city}
  onChange={(e) => setCity(e.target.value)}
  className="border p-3 rounded-lg w-80"
/>

 <button
  onClick={fetchWeather}
  className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
 {t("search")}
</button>

  <span className="text-gray-600">
    {weather && (
  <span>
    {weather.location.name}, {weather.location.region}
  </span>
)}
  </span>
            
   </div>
  {/* Main Section */}
       <div className="grid lg:grid-cols-3 gap-6">
   {/* Current Weather */}
     <div className="lg:col-span-2 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-2xl shadow-lg p-6">

     <div className="flex justify-between items-center">
       <div>
        <h1 className="text-6xl font-bold">
            {weather ? `${Math.round(weather.current.temp_c)}°C` : "--°C"}
          </h1>
         <p className="text-xl mt-2">
         {weather
? translateWeather(
weather.current.condition.text,
localStorage.getItem("language")
)
: t("loading")}
           </p>
       </div>
        {/* <WiDaySunny className="text-8xl" /> */}
        <img
  src={`https:${weather?.current.condition.icon}`}
  alt="Weather"
  className="w-28 h-28"
/>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <div className="flex items-center gap-2">
                  <WiHumidity className="text-3xl" />
                  {t("humidity")}: {weather?.current.humidity}%
                </div>
        <div className="flex items-center gap-2">
                  <WiStrongWind className="text-3xl" />
                  {t("wind")}: {weather?.current.wind_kph} km/h
        </div>

         <div className="flex items-center gap-2">
                  <WiSunrise className="text-3xl" />
                 {t("sunrise")}: {weather?.forecast.forecastday[0].astro.sunrise}
         </div>

         <div className="flex items-center gap-2">
           <WiSunset className="text-3xl" />
            {t("sunset")}: {weather?.forecast.forecastday[0].astro.sunset}
        </div>
        </div>

  </div>
{/* 5 Days Forecast */}
   
     <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

              <h2 className="font-bold text-xl mb-6">
                {t("fiveDayForecast")}
              </h2>
  
      <div className="space-y-5">

      
  {weather?.forecast?.forecastday?.map((day, index) => (

    <div
      key={index}
      className="flex justify-between items-center"
    >

      <span>
        {index === 0
          ? t("today")
          : new Date(day.date).toLocaleDateString(
            localStorage.getItem("language") === "hi"
            ? "hi-IN": "en-US", {
              weekday: "short",
            })}
      </span>

      <img
        src={`https:${day.day.condition.icon}`}
        alt=""
        className="w-10 h-10"
      />

      <span>
        {Math.round(day.day.maxtemp_c)}°C /
        {Math.round(day.day.mintemp_c)}°C
      </span>

    </div>

  ))}

</div>

            </div>

          </div>
 {/* Hourly Forecast */}

     <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

     <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaClock />
            {t("hourlyForecast")}
        </h2>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">

  {weather?.forecast?.forecastday[0]?.hour
    .filter((_, index) => index % 4 === 0)
    .map((hour, index) => (

      <div key={index}>

        <p>
          {new Date(hour.time).toLocaleTimeString(
            localStorage.getItem("language")==="hi"
                 ? "hi-IN": "en-US", {
            hour: "numeric",
              })}
        </p>

        <img
          src={`https:${hour.condition.icon}`}
          alt="Weather"
          className="w-12 h-12 mx-auto"
        />

        <p>
          {Math.round(hour.temp_c)}°C
        </p>

      </div>

  ))}

</div>
          </div>

<div className="bg-green-100 border-l-4 border-green-600 p-6 rounded-2xl shadow mt-8">

  <div className="flex items-center gap-3">

  {farmingAdvice.icon}

  <h2 className="text-2xl font-bold text-green-700">
    {farmingAdvice.title}
  </h2>

</div>

  <p className="mt-3 text-gray-700">
    {farmingAdvice.advice}
  </p>

  <div className="mt-4 bg-white p-4 rounded-lg">
   <div className="flex items-center gap-2 mb-2">

  <FaLightbulb className="text-yellow-500" />

  <strong>{t("recommendedAction")}</strong>

</div>
    {farmingAdvice.action}
  </div>

</div>



        </div>

          <Footer />
      </div>
    </div>

 
  )
}

export default Weather
