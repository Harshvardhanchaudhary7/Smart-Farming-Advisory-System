import React,{useState, useEffect} from 'react'
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { FaExclamationTriangle, FaTemperatureHigh, FaBell,} from "react-icons/fa";
import Footer from '../Components/Footer';
import { useWeather } from "../context/WeatherContext";
import { getWeatherAlerts } from "../utils/getWeatherAlerts";
import { showNotification } from "../utils/notification";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import API_URL from "../config";

const Alerts = () => {
const { t } = useTranslation();
const [isOpen, setIsOpen] = useState(false);
const { weather } = useWeather();
const [user, setUser] = useState(null);
useEffect(() => {

  const fetchProfile = async () => {

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

  fetchProfile();

}, []);


const allAlerts = getWeatherAlerts(weather);
const alerts = allAlerts.filter((alert)=>{

  if (!user) return true;
 if(alert.type==="rain" && !user?.rainAlert)
   return false;
 if(alert.type==="heat" && !user?.heatAlert)
   return false;
 if(alert.type==="crop" && !user?.cropAlert)
   return false;

 return true;
});

 

  return (
<div className="flex">
  <Sidebar
   isOpen={isOpen}
  setIsOpen={setIsOpen} />

  <div className="md:ml-72 flex-1 bg-gray-100 overflow-x-hidden">

        <Navbar title={t("weatherAlerts")}
        setIsOpen={setIsOpen} />
      
        <div className="p-6 mt-18">
 {/* Page Title */}
      <div className="flex items-center gap-3 mb-8">
            <FaBell className="text-red-500 text-3xl" />
             
             <h1 className="text-3xl font-bold">
            {t("weatherAlerts")}
             </h1>
            

          </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-lg">

  <div className="bg-white p-6 rounded-2xl shadow">

    <h3 className="text-gray-500">
     {t("totalAlerts")}
    </h3>

    <h1 className="text-4xl font-bold text-red-500">
       {alerts.length}
    </h1>

  </div>

  <div className="bg-white p-6 rounded-2xl shadow">

    <h3 className="text-gray-500">
     {t("activeAlerts")}
    </h3>

    <h1 className="text-4xl font-bold text-orange-500">
       {alerts.filter(alert => alert.status === "Active").length}
    </h1>

  </div>

</div>
{/* Heavy Rain Alert */}

       
{/* High Temperature Alert */}

     {alerts.length === 0 ? (

  <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

    <FaBell className="text-6xl text-green-500 mx-auto mb-4" />

    <h2 className="text-2xl font-bold text-green-600">
     {t("noWeatherAlerts")}
    </h2>

    <p className="text-gray-500 mt-2">
      {t("safeWeather")}
    </p>

  </div>

) : (

  alerts.map((alert, index) => (

    <div
      key={index}
      className={`bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 ${
        alert.type === "rain"
          ? "border-red-500"
          : alert.type === "heat"
          ? "border-orange-500"
          : alert.type === "wind"
          ? "border-blue-500"
          : "border-cyan-500"
      }`}
    >

      <div className="flex items-center gap-4">

        {alert.type === "rain" && (
          <FaExclamationTriangle className="text-red-500 text-4xl" />
        )}

        {alert.type === "heat" && (
          <FaTemperatureHigh className="text-orange-500 text-4xl" />
        )}

        {alert.type === "wind" && (
          <FaBell className="text-blue-500 text-4xl" />
        )}

        {alert.type === "humidity" && (
          <FaBell className="text-cyan-500 text-4xl" />
        )}

        <div>

          <h2 className="text-2xl font-bold">
            {t(alert.titleKey)}
          </h2>

          <span
  className={`px-3 py-1 rounded-full text-sm font-semibold ${
    alert.status === "Active"
      ? "bg-red-100 text-red-600"
      : "bg-orange-100 text-orange-600"
  }`}
>
  {t(alert.status.toLowerCase())}
</span>

        </div>

      </div>

      <p className="mt-4 text-gray-700">
        {t(alert.descriptionKey)}
      </p>

      <div className="mt-4 bg-gray-100 rounded-lg p-4">

        <strong>
          {t("recommendedAction")}:
        </strong>

        <p className="mt-2">
         {t(alert.actionKey)}
        </p>

      </div>

    </div>

  ))

)}


        </div>


       <Footer />
      </div>

    </div>
  )
}

export default Alerts
