import React, {useState, useEffect}from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FaUserEdit, FaLock, FaBell, FaLanguage, FaDownload, FaSignOutAlt, FaUser, FaHistory,} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import API_URL from "../config";


const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState({
  rainAlert: true,
  heatAlert: true,
  cropAlert: true,
});
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

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
  });
      setUser(res.data);
    const savedLanguage =
  localStorage.getItem("language") ||
  res.data.language ||
  "en";

i18n.changeLanguage(savedLanguage);
  setNotifications({
  rainAlert: res.data.rainAlert,
  heatAlert: res.data.heatAlert,
  cropAlert: res.data.cropAlert,
});
    } catch (err) {
      console.log(err);
    }};

  fetchProfile();

}, []);

const updateNotification = (field) => {

  setNotifications((prev) => ({
    ...prev,
    [field]: !prev[field],
  }));

};

const downloadHistoryPDF = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/api/history/download`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.download = "CropHistory.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

  } catch (err) {

    console.log(err);

    toast.error(t("downloadHistoryFailed"));

  }
};

const saveSettings = async () => {
  try {

    const token = localStorage.getItem("token");

    await axios.put(
      `${API_URL}/api/auth/profile`,
      notifications,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   toast.success(t("settingsSaved"));

  } catch (error) {

    console.log(error);

    toast.error(t("settingsFailed"));

  }
};



  return (
    <div className="flex">
      <Sidebar 
      isOpen={isOpen}
      setIsOpen={setIsOpen}/>

      <div className="md:ml-72 flex-1 bg-gray-100 overflow-x-hidden">
        <Navbar title={t("settings")}
      setIsOpen={setIsOpen} />

        <div className="p-6 mt-18">

          {/* Header */}
          <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-lg mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              {t("settings")}
              </h1>

            <p className="text-green-100">
              {t("manageAccount")}
            </p>
          </div>

          {/* Farmer Info */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <div className="flex items-center gap-4">
             {user?.profileImage ? (
  <img
   src={`${API_URL}${user.profileImage}`}
    alt="Profile"
    className="w-20 h-20 rounded-full object-cover border-4 border-green-500"/>
) : ( <div className="bg-green-100 p-4 rounded-full">
    <FaUser className="text-green-600 text-2xl" />
  </div>
)}

              <div>
                <h2 className="text-xl font-bold">
                  {user?.name}
                </h2>

                <p className="text-gray-500">
                 {t("farmerId")}  : {user?.farmerId}
                </p>

              <p className="text-green-600 font-medium">
  {user?.createdAt
    ? `${t("memberSince")} ${new Date(user.createdAt).getFullYear()}`
    : t("newMember")}
</p>
              </div>
            </div>
          </div>

          {/* Security */}
<div className="bg-white rounded-2xl shadow p-6 mb-8">

  <h2 className="text-2xl font-bold mb-6">
   {t("security")}
  </h2>

  <div className="space-y-4">

    <button
      onClick={() => navigate("/profile/edit")}
      className="w-full flex items-center gap-3 border rounded-xl p-4 hover:bg-gray-50"
    >
      <FaUserEdit className="text-green-600 text-xl" />

      <div className="text-left">
        <p className="font-semibold">
          {t("editProfile")}
        </p>

        <p className="text-sm text-gray-500">
         {t("updateProfile")}
        </p>
      </div>
    </button>

    <button
      onClick={() => navigate("/change-password")}
      className="w-full flex items-center gap-3 border rounded-xl p-4 hover:bg-gray-50"
    >
      <FaLock className="text-blue-600 text-xl" />

      <div className="text-left">
        <p className="font-semibold">
          {t("changePassword")}
        </p>

        <p className="text-sm text-gray-500">
         {t("updatePassword")}
        </p>
      </div>
    </button>

  </div>

</div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">

            <h2 className="text-2xl font-bold mb-6">
              {t("notificationPreferences")}
            </h2>

            <div className="space-y-6">

              {/* Rain Alert */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaBell className="text-red-500" />
                  <span>{t("heavyRain")}</span>
                </div>
              <label className="relative inline-flex items-center cursor-pointer">
  <input
  type="checkbox"
  className="sr-only peer"
  checked={notifications.rainAlert}
  onChange={() => updateNotification("rainAlert")}
/>

  <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-all duration-300"></div>

  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-7"></div>
</label>
              </div>

              {/* Temperature Alert */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaBell className="text-orange-500" />
                  <span>{t("highTemperature")}</span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
  <input
  type="checkbox"
  className="sr-only peer"
  checked={notifications.heatAlert}
  onChange={() => updateNotification("heatAlert")}
/>

  <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-all duration-300"></div>

  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-7"></div>
</label>
              </div>

              {/* Crop Advisory */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaBell className="text-green-500" />
                  <span>{t("cropNotification")}</span>
                </div>

               <label className="relative inline-flex items-center cursor-pointer">
<input
  type="checkbox"
  className="sr-only peer"
  checked={notifications.cropAlert}
  onChange={() => updateNotification("cropAlert")}
/>

  <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-all duration-300"></div>

  <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-7"></div>
</label>
              </div>

            </div>
          </div>

          {/* Language */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">

            <h2 className="text-2xl font-bold mb-6">
              {t("languageSettings")}
            </h2>

            <div className="flex items-center gap-4">

              <FaLanguage className="text-purple-600 text-2xl" />

<select
  value={i18n.language}
  onChange={async (e) => {

    const language = e.target.value;

    // Change language instantly
    i18n.changeLanguage(language);

    // Save locally
    localStorage.setItem("language", language);

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/auth/profile`,
        {
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (err) {

      console.log(err);

    }

  }}
  className="border rounded-xl p-3 w-64"
>

  <option value="en">

    {t("english")}

  </option>

  <option value="hi">

    {t("hindi")}

  </option>

</select>

            </div>
          </div>

          {/* Reports */}
          <div className="bg-white rounded-2xl shadow p-6 mb-8">

            <h2 className="text-2xl font-bold mb-6">
             {t("reports")}
            </h2>

            <div className="flex flex-col md:flex-row gap-4">

         
<button onClick={async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/history/crop-report`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "AICropReport.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
      alert(t("downloadCropFailed"));
    }
  }}
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
  <FaDownload />{t("downloadCropReport")}
</button>


<button onClick={async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/history/weather-report`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        "WeatherReport.pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
      alert(t("downloadWeatherFailed"));
    }
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
> <FaDownload /> {t("downloadWeatherReport")}
</button>

<button
  onClick={downloadHistoryPDF}
  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
<FaDownload /> {t("downloadHistoryPDF")}
</button>

            </div>
          </div>

          {/* Save Changes */}
          <div className="mb-8">
  <button  onClick={saveSettings}
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow" >
  {t("saveChanges")}
  </button>
</div>

{/* History */}

<div className="bg-white rounded-2xl shadow p-6 mb-8">

  <h2 className="text-2xl font-bold mb-6">

   {t("history")}

  </h2>

  <button
    onClick={() => navigate("/crop-history")}
    className="w-full flex items-center gap-4 border rounded-xl p-4 hover:bg-green-50 transition"
  >

    <FaHistory className="text-green-600 text-2xl" />

    <div className="text-left">

      <h3 className="font-semibold">

        {t("viewCropHistory")}

      </h3>

      <p className="text-sm text-gray-500">

        {t("viewPreviousRecommendations")}

      </p>

    </div>

  </button>

</div>

          {/* Danger Zone */}
          <div className="bg-white border border-red-200 rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold text-red-600 mb-6">
              {t("dangerZone")}
            </h2>

            <p className="text-gray-500 mb-5">
              {t("logoutMessage")}
            </p>

            <button
 onClick={() => {
    localStorage.removeItem("token");

    // Keep the selected language
    i18n.changeLanguage(
      localStorage.getItem("language") || "en"
    );

    navigate("/login");
}}
  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
>
              <FaSignOutAlt />
               {t("logout")}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;