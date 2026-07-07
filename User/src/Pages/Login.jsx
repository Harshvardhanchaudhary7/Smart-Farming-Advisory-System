import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import {Link} from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import loginImage from "../assets/loginImage.jpg";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import API_URL from "../config";

function Login() {

  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

  const savedEmail =
    localStorage.getItem("rememberEmail");

  if (savedEmail) {

    setEmail(savedEmail);

    setRememberMe(true);

  }

}, []);

  const handleLogin = async () =>{
    try {
      const res = await axios.post(
         `${API_URL}/api/auth/login`,
         {
          email,
          password,
         });
         console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

if (rememberMe) {

  localStorage.setItem(
    "rememberEmail",
    email
  );

} else {

  localStorage.removeItem(
    "rememberEmail"
  );

}

     toast.success(t("loginSuccess"));
      navigate("/dashboard");
    } catch (error) {
      toast.error( error.response?.data?.message || t("loginFailed"));
    }
  };
    return (
    <div className='min-h-screen flex'>

        {/* LEFT */}

<motion.div
  initial={{ opacity: 0, x: -80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="hidden md:block w-1/2 relative"
>

  <img
    src={loginImage}
    alt="Farm"
    className="w-full h-screen object-cover"
  />

  <div className="absolute inset-0 bg-black/40"></div>

 <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
  className="absolute bottom-20 left-10 text-white"
>

    <h1 className="text-6xl font-bold">
      {t("appName")}
    </h1>

    <h2 className="text-3xl">
       {t("advisorySystem")}
    </h2>

    <p className="mt-4 text-xl">
      {t("empoweringFarmers")}
    </p>

  </motion.div>

</motion.div>

      {/* RIGHT */}

      <div className='w-full md:w-1/2 flex justify-center items-center bg-gray-50 p-6'>

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
  className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md"
>

         <div className="flex justify-center items-center gap-3 mb-4">

   <motion.div
  initial={{ rotate: -90, opacity: 0 }}
  animate={{ rotate: 0, opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  <FaSignInAlt className="text-green-600 text-4xl" />
</motion.div>

    <h2 className="text-4xl font-bold">

        {t("welcomeBack")}

    </h2>

</div>

          <p className="text-center text-gray-500 mt-2">
            {t("loginToAccount")}
          </p>
      
      <input type='email' placeholder={t("email")} value={email} onChange={(e) => setEmail(e.target.value)} className='w-full border border-gray-300 rounded-lg p-3 mt-8 focus:outline-none focus:ring-2  focus:ring-green-500' />

      <input type='password' placeholder={t("password")} value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border border-gray-300 rounded-lg p-3 mt-8 focus:outline-none focus:ring-2 focus:ring-green-500' />

          <div className="flex justify-between mt-4 text-sm">

            <label className="flex items-center gap-2">

              <input type="checkbox" checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked) }/>
              {t("rememberMe")}
            </label>

           <button onClick={() => navigate("/forgot-password")}
            className="text-green-600 hover:underline">
               {t("forgotPassword")}
          </button>

          </div>
          <motion.button   whileHover={{ scale: 1.03, }}
                           whileTap={{ scale: 0.97, }}
          onClick={handleLogin} className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-6 font-semibold'>
            {t("login")}
          </motion.button>

            <p className="text-center mt-6 text-gray-600">
            {t("dontHaveAccount")}
            <Link to="/register" className=" text-green-600 font-semibold ml-1">
              {t("register")}
            </Link>
          </p>
      </motion.div>

      </div>

    </div>
    );
}

export default Login;