import React,{useState,useEffect} from 'react'
import {FaHome, FaCloudSun, FaBell, FaUser, FaSeedling, FaCog, FaTimes} from "react-icons/fa";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useWeather } from "../context/WeatherContext";
import { getWeatherAlerts } from "../utils/getWeatherAlerts";
import { useTranslation } from "react-i18next";



const Sidebar = ({ isOpen, setIsOpen }) => {

  const { t } = useTranslation();

const { weather } = useWeather();

const alerts = getWeatherAlerts(weather);

const alertCount = alerts.length;

  
  return (
   <>
   <div
  className={`fixed top-0 left-0 h-screen w-72 bg-green-800 text-white p-5 z-50 transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } md:translate-x-0`}
>

    
       <div className="flex justify-between items-center mb-10">

  <h1 className="flex items-center gap-2 text-2xl font-bold">
    <FaSeedling />
    {t("appName")}
  </h1>

  <button
    className="md:hidden text-white text-2xl"
    onClick={() => setIsOpen(false)}
  >
    <FaTimes />
  </button>

</div>

    <ul className='space-y-6'>

    <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    `flex items-center gap-3 p-4 rounded-xl transition ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-700"
    }`
  }
>
  <FaHome />
 {t("dashboard")}
</NavLink>
     
  <NavLink
  to="/weather"
  className={({ isActive }) =>
    `flex items-center gap-3 p-4 rounded-xl transition ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-700"
    }`
  }
>
  <FaCloudSun />
 {t("weather")}
</NavLink>

    <NavLink
  to="/alerts"
  className={({ isActive }) =>
    `flex items-center justify-between p-4 rounded-xl transition ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-700"
    }`
  }
>
  <div className="flex items-center gap-3">
    <FaBell />
    {t("alerts")}
  </div>

  {/* <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
    2
  </span> */}

  {alertCount > 0 && (
  <span className="bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
    {alertCount}
  </span>
)}

</NavLink>

<NavLink
  to="/crop-advisory"
  className={({ isActive }) =>
    `flex items-center gap-3 p-4 rounded-xl transition ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-700 text-white"
    }`
  }
> 
  <FaSeedling />
  {t("cropAdvisory")}
</NavLink>

   <NavLink
  to="/profile"
  className={({ isActive }) =>
    `flex items-center gap-3 p-4 rounded-xl transition ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-700"
    }`
  }
>
  <FaUser />
   {t("profile")}
</NavLink>

<NavLink
  to="/settings"
  className={({ isActive }) =>
    `flex items-center gap-3 p-4 rounded-xl transition ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-green-700 text-white"
    }`
  }
>
  <FaCog />
  {t("settings")}
</NavLink>

    </ul>
      
    </div>
    </>
  )
}

export default Sidebar
