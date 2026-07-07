import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const ChangePassword = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
const [showNew, setShowNew] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = async () => {

    if (newPassword !== confirmPassword) {

      toast.error("Passwords do not match");

      return;
    }

    try {

      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="flex">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="w-full md:ml-72 flex-1 bg-gray-100 min-h-screen">

        <Navbar
          title="Change Password"
          setIsOpen={setIsOpen}
        />

        <div className="p-6 mt-18">

          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
              Change Password
            </h1>

            <div className="relative mb-4">
  <input
    type={showCurrent ? "text" : "password"}
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <button
    type="button"
    onClick={() => setShowCurrent(!showCurrent)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showCurrent ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

<div className="relative mb-4">
  <input
    type={showNew ? "text" : "password"}
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <button
    type="button"
    onClick={() => setShowNew(!showNew)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showNew ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

       <div className="relative mb-6">
  <input
    type={showConfirm ? "text" : "password"}
    placeholder="Confirm New Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full border p-3 rounded-lg"
  />

  <button
    type="button"
    onClick={() => setShowConfirm(!showConfirm)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showConfirm ? <FaEyeSlash /> : <FaEye />}
  </button>
</div>

            <button
              onClick={handleChangePassword}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Update Password
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChangePassword;