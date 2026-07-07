import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg";
import profile_1 from "../assets/profile_1.jpg";
import { FaCamera, FaEdit,FaUser, FaImage } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const EditProfile = () => {

const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [showBannerMenu, setShowBannerMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [formData, setFormData] = useState({ 
  phone: "",
  location: "",
  farmName: "",
  landSize: "",
  soilType: "",
  crops: "",
  totalLand: "",
  activeCrops: "",
  yieldRate: "",
  profileImage: "",
  bannerImage: "",
});
useEffect(() => {
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
    console.log(res.data);
      setFormData({
        phone: res.data.phone || "",
        location: res.data.location || "",
        farmName: res.data.farmName || "",
        landSize: res.data.landSize || "",
        soilType: res.data.soilType || "",
        crops: res.data.crops || "",
        totalLand: res.data.totalLand || "",
        activeCrops: res.data.activeCrops || "",
        yieldRate: res.data.yieldRate || "",
        profileImage: res.data.profileImage || "",
        bannerImage: res.data.bannerImage || "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  fetchProfile();
}, []);

const handleSave = async () => {

  try {

    const token = localStorage.getItem("token");
    const data = new FormData();

Object.keys(formData).forEach((key) => {
  data.append(key, formData[key]);
});

if (profileFile) {
  data.append("profileImage", profileFile);
}

if (bannerFile) {
  data.append("bannerImage", bannerFile);
}

   const res = await axios.put(
      "http://localhost:5000/api/auth/profile",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("UPDATED USER:", res.data);

    toast.success(t("profileUpdated"));
    setFormData(res.data);
    navigate("/profile");

  } catch (error) {
    console.log(error);
  }

};
console.log(formData);
console.log(profileFile);

  return (
    <div className="flex">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="w-full md:ml-72 flex-1 bg-gray-100 min-h-screen">

        <Navbar
          title={t("editProfile")}
          setIsOpen={setIsOpen}
        />

        <div className="p-6 mt-18">

          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
              {t("editProfile")}
            </h1>

            {/* Banner Image */}

 <div className="relative mb-8">
 

{bannerPreview || formData.bannerImage ? (
  <img
    src={
      bannerPreview
        ? bannerPreview
        : `http://localhost:5000${formData.bannerImage}`
    }
    alt="Banner"
    className="w-full h-64 object-cover rounded-2xl"
  />
) : (
  <div className="w-full h-64 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500">
   <FaImage className="text-6xl text-gray-500" />
  </div>
)}

  <div className="absolute top-4 right-4">

  <button
    type="button"
    onClick={() =>
      setShowBannerMenu(!showBannerMenu)
    }
    className="bg-white p-3 rounded-full shadow-lg"
  >
    <FaEdit className="text-gray-700" />
  </button>

  {showBannerMenu && (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-44 z-50">

      <label
        htmlFor="bannerUpload"
        className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
      >
      {t("changeBanner")}
      </label>

      <button
        type="button"
        onClick={() => {
          setFormData({
            ...formData,
            bannerImage: "",
          });

          setBannerPreview("");
          setBannerFile(null);

          setShowBannerMenu(false);
        }}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-500"
      >
      {t("removeBanner")}
      </button>

    </div>
  )}

</div>



<input
  id="bannerUpload"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {

    const file = e.target.files[0];

    if (file) {
      setBannerFile(file);

      setBannerPreview(
        URL.createObjectURL(file)
      );
    }

  }}
/>

</div> 




{/* Profile Image */}

<div className="relative w-fit mb-8">


{profilePreview || formData.profileImage ? (
  <img
    src={
      profilePreview
        ? profilePreview
        : `http://localhost:5000${formData.profileImage}`
    }
    alt="Profile"
    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
  />
) : (
  <div className="w-28 h-28 rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center">
   <FaUser className="text-4xl text-gray-500" />
  </div>
)}



<div className="absolute bottom-0 right-0">

  <button
    type="button"
    onClick={() =>
      setShowProfileMenu(!showProfileMenu)
    }
    className="bg-green-600 p-2 rounded-full text-white"
  >
    <FaCamera />
  </button>

  {showProfileMenu && (
    <div className="absolute right-0 bottom-12 bg-white shadow-lg rounded-lg w-44 z-50">

      <label
        htmlFor="profileUpload"
        className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
      >
        {t("changePhoto")}
      </label>

      <button
        type="button"
        onClick={() => {
          setFormData({
            ...formData,
            profileImage: "",
          });

          setProfilePreview("");
          setProfileFile(null);

          setShowProfileMenu(false);
        }}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-500"
      >
        {t("removePhoto")}
      </button>

    </div>
  )}

</div>

<input
  id="profileUpload"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {

    const file = e.target.files[0];

    if (file) {
      setProfileFile(file);
      setProfilePreview(
        URL.createObjectURL(file)
      );
    }

  }}
/>

</div>

  

        <input type="text" placeholder={t("phoneNumber")}
                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value,  }) } className="w-full border p-3 rounded-lg mb-4" />

            <input
              type="text"
              placeholder={t("location")}
              value={formData.location}  onChange={(e) => setFormData({  ...formData, location: e.target.value, })}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <input
              type="text"
              placeholder={t("farmName")}
              value={formData.farmName}
                onChange={(e) =>
    setFormData({
      ...formData,
      farmName: e.target.value,
    })
  }
              className="w-full border p-3 rounded-lg mb-4"
            />

            <input
              type="text"
              placeholder={t("landSize")}
              value={formData.landSize}
                onChange={(e) =>
    setFormData({
      ...formData,
      landSize: e.target.value,
    })
  }
              className="w-full border p-3 rounded-lg mb-4"
            />

            <input
              type="text"
              placeholder={t("soilType")}
              value={formData.soilType}
               onChange={(e) =>
    setFormData({
      ...formData,
      soilType: e.target.value,
    })
  }
              className="w-full border p-3 rounded-lg mb-4"
            />

            <input
              type="text"
              placeholder={t("crops")}
              value={formData.crops}
                onChange={(e) =>
    setFormData({
      ...formData,
      crops: e.target.value,
    })
  } className="w-full border p-3 rounded-lg mb-4" />


 <input
  type="text"
  placeholder={t("totalLand")}
  value={formData.totalLand}
  onChange={(e) =>
    setFormData({
      ...formData,
      totalLand: e.target.value,
    })
  }
  className="w-full border p-3 rounded-lg mb-4"
/>

<input
  type="text"
  placeholder={t("activeCrops")}
  value={formData.activeCrops}
  onChange={(e) =>
    setFormData({
      ...formData,
      activeCrops: e.target.value,
    })
  }
  className="w-full border p-3 rounded-lg mb-4"
/>

<input
  type="text"
  placeholder={t("yieldRate")}
  value={formData.yieldRate}
  onChange={(e) =>
    setFormData({
      ...formData,
      yieldRate: e.target.value,
    })
  }
  className="w-full border p-3 rounded-lg mb-4"
/>

            <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg" >
              {t("saveChanges")}
            </button>

           <button onClick={() => navigate("/profile")} className="bg-gray-500 text-white px-6 py-3 rounded-lg ml-4">
            {t("cancel")}
          </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EditProfile;