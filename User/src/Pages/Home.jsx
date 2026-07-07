import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import {FaSeedling} from "react-icons/fa";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Home = () => {
 
const { t, i18n } = useTranslation();

const changeLanguage = (e) => {
  const selectedLanguage = e.target.value;

  i18n.changeLanguage(selectedLanguage);

  localStorage.setItem("language", selectedLanguage);
};

  return (
    
    <div className="min-h-screen bg-green-50">
   

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-5 bg-white shadow">

  <h1 className="flex items-center gap-2 text-3xl font-bold text-green-700">
    <FaSeedling />
   {t("appName")}
  </h1>

  <div className="flex items-center gap-4">

    <select
      value={i18n.language}
      onChange={changeLanguage}
      className="border border-green-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
    </select>

    <Link to="/login">
      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
       {t("login")}
      </button>
    </Link>

  </div>

</div>

      {/* Hero Section */}
      <motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="flex flex-col items-center justify-center text-center h-[80vh] px-5"
>

       <motion.h1
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.3 }}
  className="text-6xl font-bold text-green-700 mb-4"
>
        {t("homeTitle")}
        </motion.h1>

        <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.6 }}
        className="text-xl text-gray-600 max-w-3xl">
           {t("homeDescription")}
        </motion.p>

        <Link to="/login">
          <motion.button whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
           className="mt-8 bg-green-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-green-700">
           {t("getStarted")}
          </motion.button>
        </Link>

      </motion.div>
  <Footer />
    </div>
  );
};

export default Home;