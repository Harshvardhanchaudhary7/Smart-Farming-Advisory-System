import React,{useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {Link} from "react-router-dom";
import { FaSeedling } from "react-icons/fa";
import registerImage from "../assets/registerImage.jpg";
import { useTranslation } from "react-i18next";
import { FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Register = () => {

  const { t } = useTranslation();  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
         toast.error(t("passwordNotMatch"));
        return;
        }
     try {

    await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

   toast.success(t("registrationSuccess"));
    navigate("/login");

  } catch (error) {
  toast.error( error.response?.data?.message || t("registrationFailed"));
  }
  
};

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
     <motion.div
  initial={{ opacity: 0, x: -80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="hidden md:block w-1/2 relative overflow-hidden"
>

  <img
    src={registerImage}
    alt="Register"
    className="w-full h-screen object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Text Content */}
  <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
  className="absolute bottom-20 left-10 text-white z-10"
>

    <h1 className="text-6xl font-bold">
       {t("joinSmartFarming")}
    </h1>

    <h2 className="text-3xl">
       {t("advisorySystem")}
    </h2>

    <p className="mt-4 text-xl">
       {t("startJourney")}
    </p>

  </motion.div>

</motion.div>
{/* RIGHT */}

<div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50">

        <motion.div
  initial={{
    opacity: 0,
    scale: 0.9,
    y: 40,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0,
  }}
  transition={{
    duration: 0.6,
  }}
  className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
>

          <div className="flex justify-center items-center gap-3 mb-6">

  <motion.div
  initial={{ rotate: -90, opacity: 0 }}
  animate={{ rotate: 0, opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  <FaUserPlus className="text-green-600 text-4xl" />
</motion.div>

  <h2 className="text-4xl font-bold">

    {t("createAccount")}

  </h2>

</div>

          <input  type= "text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("fullName")} className="w-full border p-3 rounded-lg mt-8" />

          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("email")} className="w-full border p-3 rounded-lg mt-4" />

          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("password")} className="w-full border p-3 rounded-lg mt-4" />

          <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t("confirmPassword")}className="w-full border p-3 rounded-lg mt-4" />

          <button onClick={handleRegister} className=" w-full bg-green-600  hover:bg-green-700 text-white py-3 rounded-lg mt-6" >
           {t("createAccount")}
          </button>
         
          <p className="text-center mt-4">
            {t("alreadyHaveAccount")}
            <Link to="/login" className="text-green-600 ml-1" > {t("login")}
            </Link>
          </p>
        </motion.div>
      </div>

    </div>
  )
}

export default Register;
