import React, {useState, useEffect} from 'react'
import banner from '../assets/banner.jpg';
import profile_1 from '../assets/profile_1.jpg';
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import {FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSeedling, FaTractor, FaEdit, FaLock, FaFileDownload, FaSignOutAlt, FaImage,} from "react-icons/fa";
import Footer from '../Components/Footer';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API_URL from "../config";

const Profile = () => {
    const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  

  useEffect (() => {
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
     } catch (error) {
      console.log(error);
     } 
    };
    fetchProfile();
  }, []);
if (!user) {
  return (
    <div className="p-10">
      <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold text-green-600">
    {t("loadingProfile")}
      </div>
      </div>
    </div>
  );
}
  return (
     <div className="flex">
  <Sidebar 
   isOpen={isOpen}
  setIsOpen={setIsOpen} />

  <div className="md:ml-72 flex-1 bg-gray-100 overflow-x-hidden">
        <Navbar title={t("profile")}
                setIsOpen={setIsOpen} />

        <div className="p-6 mt-18">

          {/* Banner Section */}

         <div className="rounded-2xl overflow-hidden relative min-h-[420px] md:h-64">
        
{user?.bannerImage ? (
  <img
    src={`${API_URL}${user.bannerImage}`}
    alt="Banner"
    className="absolute inset-0 w-full h-full object-cover"
  />
) : (
  <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-700">
    <FaImage className="text-6xl text-gray-500" />
  </div>
)}

        <div className="absolute inset-0 bg-black/40"></div>

         <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-8 h-full text-white text-center md:text-left">

      {user?.profileImage ? (
  <img
    src={`${API_URL}${user.profileImage}`}
    alt="Profile"
    className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white object-cover"
  />
) : (
  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-sm text-gray-600">
   <FaUser className="text-4xl text-gray-500" />
  </div>
)}

              <div className="flex-1">
                <h1 className="text-3xl font-bold">
                {user.name}
                </h1>
                <p className="text-green-300 mt-2">
               {t("verifiedFarmer")}
                </p>

                <p className="mt-2">
                 {t("farmerId")}:  {user?.farmerId}
                </p>

                <p>
                 {t("memberSince")}:{" "}
                 {user?.createdAt ? new Date(  user.createdAt
                  ).toLocaleDateString(   localStorage.getItem("language") === "hi" ?
                  "hi-IN" :  "en-US",  {  month: "short",  year: "numeric", }
                ) : ""}
                </p>
              </div>

              <button onClick={() => navigate("/profile/edit")} className="border border-white px-6 py-3 rounded-xl text-white flex items-center gap-2 hover:bg-white hover:text-black transition" >
               <FaEdit /> {t("editProfile")}
              </button>

            </div>
          </div>
{/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <div className="bg-white p-5 rounded-2xl shadow">
              <h3 className="text-gray-500">{t("totalLand")}</h3>
              <h1 className="text-3xl font-bold text-green-700 mt-2">
                {user.totalLand}
              </h1>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <h3 className="text-gray-500">{t("activeCrops")}</h3>
              <h1 className="text-3xl font-bold text-green-700 mt-2">
              {user.activeCrops}
              </h1>
            </div>
           <div className="bg-white p-5 rounded-2xl shadow">
              <h3 className="text-gray-500">{t("yieldRate")}</h3>
              <h1 className="text-3xl font-bold text-green-700 mt-2">
               {user.yieldRate}
              </h1>
            </div>

          </div>

          {/* Information Section */}

          <div className="grid lg:grid-cols-2 gap-6 mt-6">

            {/* Personal Information */}

            <div className="bg-white p-6 rounded-2xl shadow">
           <h2 className="text-xl font-bold mb-6">
                {t("personalInformation")}
              </h2>

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <FaUser className="text-green-600" />
                  <span>{user.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone className="text-green-600" />
                  <span>{user.phone}</span>
                </div>
              <div className="flex items-center gap-3">
                  <FaEnvelope className="text-green-600" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>{user.location}</span>
                </div>

              </div>

            </div>

            {/* Farm Information */}

            <div className="bg-white p-6 rounded-2xl shadow">

              <h2 className="text-xl font-bold mb-6">
               {t("farmInformation")}
               </h2>

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <FaTractor className="text-green-600" />
                  <span>{user.farmName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaSeedling className="text-green-600" />
                  <span>{user.landSize}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaSeedling className="text-green-600" />
                  <span>{user.soilType}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaSeedling className="text-green-600" />
                  <span>{user.crops}</span>
                </div>

              </div>

            </div>

          </div>



        </div>

     <Footer />

      </div>
    </div>


  )
}

export default Profile
