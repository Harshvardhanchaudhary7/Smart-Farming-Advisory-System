import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useWeather } from "../context/WeatherContext";
import { FaRobot, FaSyncAlt, FaSpinner,} from "react-icons/fa";

import { FaSeedling, FaTint, FaFlask, FaBug, FaChartLine, FaTemperatureHigh, FaCloudRain, FaWind,} from "react-icons/fa";
import {showNotification} from "../utils/notification";
import { getNotificationText } from "../utils/notificationText";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import API_URL from "../config";

const CropAdvisory = () => {
  const { t } = useTranslation();
const [temperature, setTemperature] = useState("");
const [rainfall, setRainfall] = useState("");
const [humidity, setHumidity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState("");
const [soil, setSoil] = useState("Black Soil");
const [season, setSeason] = useState("Summer");
const [farmSize, setFarmSize] = useState("");
const { weather } = useWeather();
const [user, setUser] = useState(null);

useEffect(() => {
  if (!weather) return;

  setTemperature(weather.current.temp_c);
  setHumidity(weather.current.humidity);

  setRainfall(
    weather.forecast.forecastday[0].day.daily_chance_of_rain
  );
}, [weather]);

useEffect(() => {

  const fetchUser = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/auth/profile`,
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

  fetchUser();

}, []);

const [recommendation, setRecommendation] = useState({
  summary: "",
  fertilizer: "",
  irrigation: "",
  diseaseRisk: "",
  expectedYield: "",
  actions: [],
});

const getAIRecommendation = async () => {

  if (!weather) {
    toast.error(t("weatherUnavailable"));
    return;
  }

  try {

    setLoading(true);

 const res = await axios.post(
 `${API_URL}/api/ai/recommend`,
  {
    crop,
    soil,
    farmSize,

    language: user?.language || "en",

    weather: {
      temp: weather.current.temp_c,
      humidity: weather.current.humidity,
      rainChance:
        weather.forecast.forecastday[0].day.daily_chance_of_rain,
      wind: weather.current.wind_kph,
    },
  }
);
console.log("AI Response:", res.data);
    setRecommendation(res.data);
  const token = localStorage.getItem("token");

await axios.post(
  `${API_URL}/api/history`,
  {
    crop,
    soil,
    season,
    farmSize,

    temperature: weather.current.temp_c,
    rainfall: weather.forecast.forecastday[0].day.totalprecip_mm,
    humidity: weather.current.humidity,

    weatherCondition: weather.current.condition.text,

    location: weather.location.name,

    aiSummary: res.data.summary,

    aiActions: res.data.actions,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
 
const notification = getNotificationText(
  user?.language || "en"
);
showNotification(
  notification.title,
  notification.body
);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};

const resetForm = () => {
  setCrop("");
  setSoil("Loamy Soil");
  setSeason("Summer");
  setFarmSize("");

  // Clear AI result
  setRecommendation({
    summary: "",
    fertilizer: "",
    irrigation: "",
    diseaseRisk: "",
    expectedYield: "",
    actions: [],
  });
};

  return (
    <div className="flex">
      <Sidebar 
      isOpen={isOpen}
      setIsOpen={setIsOpen}/>

      <div className="md:ml-72 flex-1 bg-gray-100 overflow-x-hidden">
        <Navbar title={t("cropAdvisory")}
       setIsOpen={setIsOpen} />

        <div className="p-6 mt-18">

          {/* Header */}

          <div className="bg-green-600 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center gap-4">
              <FaSeedling size={40} />

              <div>
                <h1 className="text-3xl font-bold">
                 {t("cropAdvisorySystem")}
                </h1>

                <p className="text-green-100">
               {t("cropAdvisoryDescription")}
                </p>
              </div>
            </div>
          </div>

          {/* Weather Cards */}

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

  {/* Temperature */}
  <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
    <FaTemperatureHigh className="text-red-500 text-3xl mb-3" />
    <p className="text-gray-500">{t("temperature")}</p>

    <h2 className="font-bold text-3xl">
      {weather ? `${weather.current.temp_c}°C` : "--"}
    </h2>
  </div>

  {/* Rainfall */}
  <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
    <FaCloudRain className="text-blue-500 text-3xl mb-3" />
    <p className="text-gray-500">{t("rainfall")}</p>

    <h2 className="font-bold text-3xl">
      {weather
        ? `${weather.forecast.forecastday[0].day.totalprecip_mm} mm`
        : "--"}
    </h2>
  </div>

  {/* Humidity */}
  <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
    <FaTint className="text-cyan-500 text-3xl mb-3" />
    <p className="text-gray-500">{t("humidity")}</p>

    <h2 className="font-bold text-3xl">
      {weather ? `${weather.current.humidity}%` : "--"}
    </h2>
  </div>

  {/* Wind */}
  <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
    <FaWind className="text-green-500 text-3xl mb-3" />
    <p className="text-gray-500">{t("wind")}</p>

    <h2 className="font-bold text-3xl">
      {weather ? `${weather.current.wind_kph} km/h` : "--"}
    </h2>
  </div>

</div>

          {/* Main Section */}

          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* Form Section */}

            <div className="bg-white p-6 rounded-2xl shadow">

              <h2 className="text-2xl font-bold mb-6">
               {t("enterFarmDetails")}
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder={t("currentCrop")}
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />

                <select value={soil}
              onChange={(e) => setSoil(e.target.value)}
              className="w-full border p-3 rounded-lg">
                  <option>{t("loamySoil")}</option>
                  <option>{t("claySoil")}</option>
                  <option>{t("sandySoil")}</option>
                  <option>{t("blackSoil")}</option>
                </select>

              <input type="text" value={`${temperature} °C`} readOnly
                 className="w-full border p-3 rounded-lg bg-gray-100"/>

               <input type="text" value={`${rainfall}%`} readOnly
                 className="w-full border p-3 rounded-lg bg-gray-100"/>

               <input type="text" value={`${humidity}%`} readOnly
                 className="w-full border p-3 rounded-lg bg-gray-100"/>
             <select value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full border p-3 rounded-lg">
                  <option>{t("summer")}</option>
                  <option>{t("winter")}</option>
                  <option>{t("monsoon")}</option>
                  <option>{t("spring")}</option>
                </select>

                <input
                  type="number"
                  placeholder={t("farmSize")}
                  value={farmSize}
                  onChange={(e)=>setFarmSize(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />

                <button
  disabled={loading}
  onClick={getAIRecommendation}
  className="w-full bg-green-600 text-white py-3 rounded-lg flex justify-center items-center gap-3"
>
  {loading && (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  )}

  {loading ? t("generatingAdvice") : t("getRecommendation")}
</button>
            
              <button
  onClick={getAIRecommendation}
  className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700"
>
{t("generateAgain")}
</button>

              </div>

            </div>

            {/* AI Recommendation */}

            <div className="bg-white p-6 rounded-2xl shadow">

              <h2 className="text-2xl font-bold mb-6">
                {t("aiRecommendation")}
              </h2>

              {!recommendation.summary ? (

                <div className="text-gray-500">
                {t("fillForm")}
                </div>

              ) : (

                <>
                  {/* AI Summary */}

                  <div className="bg-green-100 p-4 rounded-xl mb-4">

                    <h3 className="font-bold text-green-700 mb-2">
                      {t("summary")}
                    </h3>

                    
                    <p> {recommendation.summary} </p>
                    

                  </div>

                  {/* Recommendation Cards */}

                  <div className="space-y-4">

                    <div className="flex items-center gap-4 bg-green-100 p-4 rounded-xl">
                      <FaSeedling className="text-green-600 text-3xl" />
                      <div>
                        <p className="text-gray-500">
                          {t("recommendedCrop")}
                        </p>
                        <h3 className="font-bold">
                          {crop}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-blue-100 p-4 rounded-xl">
                      <FaFlask className="text-blue-600 text-3xl" />
                      <div>
                        <p className="text-gray-500">
                          {t("fertilizer")}
                        </p>
                        <h3 className="font-bold">
                         {recommendation.fertilizer}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-cyan-100 p-4 rounded-xl">
                      <FaTint className="text-cyan-600 text-3xl" />
                      <div>
                        <p className="text-gray-500">
                          {t("irrigation")}
                        </p>
                        <h3 className="font-bold">
                         {recommendation.irrigation}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-orange-100 p-4 rounded-xl">
                      <FaBug className="text-orange-600 text-3xl" />
                      <div>
                        <p className="text-gray-500">
                          {t("diseaseRisk")}
                        </p>
                        <h3 className="font-bold">
                         {recommendation.diseaseRisk}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-purple-100 p-4 rounded-xl">
                      <FaChartLine className="text-purple-600 text-3xl" />
                      <div>
                        <p className="text-gray-500">
                          {t("expectedYield")}
                        </p>
                        <h3 className="font-bold">
                         {recommendation.expectedYield}
                        </h3>
                      </div>
                    </div>

                  </div>

                  {/* Action Plan */}

                  <div className="bg-white border mt-4 p-4 rounded-xl">

                    <h3 className="font-bold text-lg mb-2">
                     {t("recommendedActions")}
                    </h3>

                    <ul className="space-y-2 text-gray-700">

                    {recommendation.actions.map((action, index) => (
                         <li key={index}> • {action} </li>
                    ))}

                    </ul>

                  </div>




{recommendation.summary && (
  <button
    onClick={resetForm}
    className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4 hover:bg-blue-700 flex items-center justify-center gap-2"
  >
    <FaSyncAlt />
   {t("generateNewAdvice")}
  </button>
)}

                </>
              )}

            </div>

          </div>

        </div>

        <Footer />
      </div>
    </div>
  );
};

export default CropAdvisory;