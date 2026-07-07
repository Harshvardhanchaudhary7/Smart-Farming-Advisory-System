import React, { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useWeather } from "../context/WeatherContext";
import { getWeatherAlerts } from "../utils/getWeatherAlerts";

import { FaTemperatureHigh, FaCloudRain, FaWind, FaSeedling, FaCloudSun, FaExclamationTriangle, FaMapMarkerAlt, FaClock, FaSun, FaCheckCircle,
  FaTint, FaBug, FaRobot,FaUser} from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import axios from "axios";
import {requestNotificationPermission} from "../utils/notification";
import {showNotification} from "../utils/notification";
import { useTranslation } from "react-i18next";
import { translateWeather } from "../utils/weatherTranslation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { t } = useTranslation();
 const [isOpen, setIsOpen] = useState(false);
 const { weather } = useWeather();
  const [user, setUser] = useState(null);
  

   useEffect(() => {
    requestNotificationPermission();

  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  fetchProfile();

}, []);

const allAlerts = getWeatherAlerts(weather);
const alerts = allAlerts.filter((alert)=>{
  if(alert.type==="rain" && !user?.rainAlert)
    return false;
  if(alert.type==="heat" && !user?.heatAlert)
    return false;
  if(alert.type==="crop" && !user?.cropAlert)
    return false;

  return true;

});

 
useEffect(() => {

  if (!user) return;

  if (alerts.length === 0) return;

  alerts.forEach(async (alert) => {

    // Don't show the same notification twice
    if (user.lastNotificationType === alert.type) {
      return;
    }

    // Respect user settings
    if (alert.type === "rain" && !user.rainAlert) return;

    if (alert.type === "heat" && !user.heatAlert) return;

    if (alert.type === "crop" && !user.cropAlert) return;

    // Show browser notification
    showNotification(
      alert.title,
      alert.description
    );

    const token = localStorage.getItem("token");

    // Save the last notification in MongoDB
    await axios.put(
      "http://localhost:5000/api/auth/profile",
      {
        lastNotificationType: alert.type,
        lastNotificationTime: new Date(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update local state
    setUser((prev) => ({
      ...prev,
      lastNotificationType: alert.type,
      lastNotificationTime: new Date(),
    }));

  });

}, [alerts, user]);

  const weatherStatus =
  weather?.current.temp_c <= 35
    ? t("good")
    : t("hot");

const irrigation =
  weather?.forecast.forecastday[0].day.daily_chance_of_rain >= 60
    ? t("notRequired")
    : t("requiredToday")

const diseaseRisk =
  weather?.current.humidity >= 80
    ? t("high")
    : weather?.current.humidity >= 60
    ? t("moderate")
    : t("low");

const cropHealth =
  weather?.current.temp_c <= 35 &&
  weather?.current.humidity <= 70
    ? t("healthy")
    : t("needsAttention");

  const getGreeting = () => {
    if (!weather) return t("welcomeFarmer");
    const hour = Number(
      weather.location.localtime.split(" ")[1].split(":")[0]
    );
    if (hour >= 5 && hour < 12) return t("goodMorning");
    if (hour >= 12 && hour < 17) return t("goodAfternoon");
    if (hour >= 17 && hour < 21) return t("goodEvening");
    return t("goodNight");
  };

  return (
    <div className="flex">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 md:ml-72 bg-gray-100 min-h-screen">

        <Navbar
         title={t("dashboard")}
          setIsOpen={setIsOpen}
        />

        <div className="p-4 md:p-6 mt-18">

          {/* Header */}

          <div className="flex items-center gap-5 mb-8">

  <img
  src={
  user?.profileImage
    ? `http://localhost:5000${user.profileImage}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.name || "Farmer"
      )}&background=16a34a&color=fff`
}
    alt="Profile"
    className="w-16 h-16 rounded-full border-4 border-green-600 object-cover"
  />

  <div>
    <h2 className="text-lg text-gray-500">
     {t("welcomeBack")}
    </h2>

    <h1 className="text-4xl font-bold text-gray-800">

      {user?.name} 

    </h1>

    <p className="text-gray-500">

      {new Date().toLocaleDateString(
    localStorage.getItem("language") === "hi"
      ? "hi-IN"
      : "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  )}

    </p>

  </div>

</div>

          {/* Hero Card */}

          <motion.div initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
           className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl shadow-xl text-white p-8 mb-8">

            <div className="flex flex-col lg:flex-row justify-between items-center">

              {/* Left */}

              <div>

                <div className="flex flex-wrap gap-3 mb-5">

                  <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">

                    <FaExclamationTriangle />

                    <span>

                      {alerts.length === 0
                        ? t("weatherSuitable")
                        : `${alerts.length} ${t("weatherAlerts")}`}

                    </span>

                  </div>

                </div>

                <h2 className="text-3xl font-bold flex items-center gap-3">

                  <FaSun className="text-yellow-300" />

                  {getGreeting()}

                </h2>

                {weather && (

                  <div className="mt-6 space-y-3">

                    <div className="flex items-center gap-3">

                      <FaMapMarkerAlt />

                      <span>

                        {weather.location.name},{" "}
                        {weather.location.region}

                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <FaCloudSun />

                      <span>

                        {translateWeather(
                         weather.current.condition.text,
                        localStorage.getItem("language")
                     )}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <FaClock />

                     <span>
                     {t("updated")} {weather.current.last_updated}
                  </span>

                    </div>
                  </div>

                )}

              </div>

            </div>
          </motion.div>

          {/* Weather Cards */}


          <motion.div initial={{ opacity: 0, y: 30 }}
                       animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.2, duration: 0.5 }}
           className="bg-white rounded-3xl shadow-lg p-6 mb-8">

  <div className="flex items-center gap-3 mb-6">

    <FaSeedling className="text-green-600 text-3xl"/>

    <h2 className="text-2xl font-bold">
      {t("todaySummary")}
    </h2>

  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

    <div className="flex items-center gap-3">

      <FaCheckCircle className="text-green-600 text-xl"/>

      <div>

        <p className="text-gray-500 text-sm">
          {t("weatherStatus")}
        </p>

        <h3 className="font-bold">
          {weatherStatus}
        </h3>

      </div>

    </div>

    <div className="flex items-center gap-3">

      <FaTint className="text-blue-500 text-xl"/>

      <div>

        <p className="text-gray-500 text-sm">
          {t("irrigation")}
        </p>

        <h3 className="font-bold">
          {irrigation}
        </h3>

      </div>

    </div>

    <div className="flex items-center gap-3">

      <FaBug className="text-orange-500 text-xl"/>

      <div>

        <p className="text-gray-500 text-sm">
         {t("diseaseRisk")}
        </p>

        <h3 className="font-bold">
          {diseaseRisk}
        </h3>

      </div>

    </div>

    <div className="flex items-center gap-3">

      <FaSeedling className="text-green-500 text-xl"/>

      <div>

        <p className="text-gray-500 text-sm">
          {t("cropCondition")}
        </p>

        <h3 className="font-bold">
          {cropHealth}
        </h3>

      </div>

    </div>

    <div className="flex items-center gap-3">

      <FaExclamationTriangle className="text-red-500 text-xl"/>

      <div>

        <p className="text-gray-500 text-sm">
          {t("activeAlerts")}
        </p>

        <h3 className="font-bold">
          {alerts.length}
        </h3>

      </div>

    </div>

    <div className="flex items-center gap-3">

      <FaRobot className="text-purple-600 text-xl"/>

      <div>

        <p className="text-gray-500 text-sm">
         {t("aiRecommendation")}
        </p>

        <h3 className="font-bold">
           {t("available")}
        </h3>

      </div>

    </div>

  </div>

</motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <motion.div   initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 whileHover={{  y: -6, scale: 1.03, }} className="bg-white rounded-2xl shadow p-5">

              <div className="flex items-center gap-2 text-gray-500">

                <FaTemperatureHigh className="text-red-500" />
                <div className="flex items-center gap-2 text-gray-500">

                {t("temperature")}

                </div>
              </div>

              <h2 className="text-4xl font-bold text-green-700 mt-3">
                {weather ? `${weather.current.temp_c}°C` : "--"}
              </h2>

            </motion.div>

            <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  whileHover={{
    y: -6,
    scale: 1.03,
  }}
  className="bg-white rounded-2xl shadow p-5"
>

              <div className="flex items-center gap-2 text-gray-500">

                <WiHumidity className="text-blue-500 text-2xl" />
                {t("humidity")}
              </div>

              <h2 className="text-4xl font-bold text-green-700 mt-3">

                {weather ? `${weather.current.humidity}%` : "--"}

              </h2>

            </motion.div>

            <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  whileHover={{
    y: -6,
    scale: 1.03,
  }}
  className="bg-white rounded-2xl shadow p-5"
>
              <div className="flex items-center gap-2 text-gray-500">

                <FaCloudRain className="text-indigo-500" />
               {t("rainfall")}
              </div>

              <h2 className="text-4xl font-bold text-green-700 mt-3">

                {weather
                  ? `${weather.forecast.forecastday[0].day.totalprecip_mm} ${t("millimeter")}`
                  : "--"}

              </h2>

            </motion.div>

            <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  whileHover={{
    y: -6,
    scale: 1.03,
  }}
  className="bg-white rounded-2xl shadow p-5"
>
              <div className="flex items-center gap-2 text-gray-500">

                <FaWind className="text-green-500" />
                {t("wind")}
              </div>

              <h2 className="text-4xl font-bold text-green-700 mt-3">

                {weather ? `${weather.current.wind_kph} km/h` : "--"}

              </h2>

            </motion.div>

          </div>
          {/* Weather Alerts */}

          <div className="mt-10">

            <div className="flex items-center gap-2 mb-5">

              <FaExclamationTriangle className="text-red-500 text-2xl" />

              <h2 className="text-2xl font-bold">
                 {t("weatherAlerts")}
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {alerts.length === 0 ? (

                <div className="bg-green-100 border-l-4 border-green-500 rounded-2xl p-5 shadow">

                  <h3 className="font-bold text-green-700 flex items-center gap-2">

                    <FaExclamationTriangle />
                    {t("noWeatherAlerts")}
                  </h3>

                  <p className="mt-2 text-gray-700">
                   {t("safeWeather")}
                  </p>

                </div>

              ) : (

                alerts.map((alert, index) => (

                  <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    delay: index * 0.2,
  }}
                    key={index}
                    className={`rounded-2xl p-5 shadow border-l-4 ${
                      alert.type === "rain"
                        ? "bg-red-100 border-red-500"
                        : alert.type === "heat"
                        ? "bg-orange-100 border-orange-500"
                        : alert.type === "wind"
                        ? "bg-blue-100 border-blue-500"
                        : "bg-cyan-100 border-cyan-500"
                    }`}
                  >

                    <h3 className="font-bold text-lg flex items-center gap-2">

                      {alert.type === "rain" && (
                        <FaCloudRain className="text-red-500" />
                      )}

                      {alert.type === "heat" && (
                        <FaTemperatureHigh className="text-orange-500" />
                      )}

                      {alert.type === "wind" && (
                        <FaWind className="text-blue-500" />
                      )}

                      {alert.type === "humidity" && (
                        <WiHumidity className="text-cyan-500 text-2xl" />
                      )}

                     {t(alert.titleKey)}

                    </h3>

                    <p className="mt-3 text-gray-700">

                     {t(alert.descriptionKey)}

                    </p>

                   

                  </motion.div>

                ))

              )}

            </div>

          </div>

          {/* Quick Actions */}

          <div className="mt-10">

            <div className="flex items-center gap-2 mb-5">

              <FaCloudSun className="text-yellow-500 text-2xl" />

              <h2 className="text-2xl font-bold">
               {t("quickActions")}
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-5">
               
<motion.div
  whileHover={{
    scale: 1.04, }}>
  <Link
                to="/crop-advisory"
                className="bg-green-600 hover:bg-green-700 transition text-white rounded-2xl shadow-lg p-6 flex items-center justify-center gap-3 font-semibold text-lg"
              >
                <FaSeedling />
                {t("cropAdvisory")}
              </Link>
              </motion.div>
              
              <motion.div
  whileHover={{
    scale: 1.04, }}>
              
              <Link
                to="/weather"
                className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-2xl shadow-lg p-6 flex items-center justify-center gap-3 font-semibold text-lg"
              >
                <FaCloudRain />
               {t("weatherForecast")}
              </Link> </motion.div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>

  );
};
export default Dashboard;