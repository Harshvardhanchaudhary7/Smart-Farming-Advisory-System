import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import API_URL from "../config";

const ForgotPassword = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();
const [password, setPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async () => {

    if (password !== confirmPassword) {

      toast.error(t("passwordNotMatch"));

      return;

    }

    try {

      const res = await axios.put(
        `${API_URL}/api/auth/forgot-password`,
        {
          email,
          password,
          confirmPassword,
        }
      );

      toast.success(res.data.message);

      navigate("/login");

    } catch (error) {

     toast.error( error.response?.data?.message || t("passwordResetFailed"));

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <div className="flex items-center justify-center gap-3 mb-6">

          <FaLock className="text-4xl text-green-600" />

          <h2 className="text-3xl font-bold">

            {t("forgotPassword")}

          </h2>

        </div>

        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border rounded-lg p-3 mt-4"
        />

        <div className="relative mt-4">

  <input
    type={showPassword ? "text" : "password"}
    placeholder={t("newPassword")}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border rounded-lg p-3 pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

       <div className="relative mt-4">

  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder={t("confirmPassword")}
    value={confirmPassword}
    onChange={(e) =>
      setConfirmPassword(e.target.value)
    }
    className="w-full border rounded-lg p-3 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
  >
    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

        <button
          onClick={handleResetPassword}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-6"
        >

          {t("resetPassword")}

        </button>

        <p className="text-center mt-5">

          <Link
            to="/login"
            className="text-green-600 font-semibold"
          >

            {t("backToLogin")}

          </Link>

        </p>

      </div>

    </div>

  );

};

export default ForgotPassword;