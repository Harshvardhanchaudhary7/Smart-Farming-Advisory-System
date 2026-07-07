import React, {useState} from 'react';
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Navbar = ({title, setIsOpen}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logout = () => {
     localStorage.removeItem("token");
     navigate("/login");
  };
 
  return (
    
    <div className="sticky top-0 z-40 flex justify-between items-center pl-14 md:pl-6 pr-3 py-3 md:p-6 bg-white shadow">

      <div className="flex items-center gap-3">

      <button className="md:hidden  text-green-600 text-xl"
       onClick={() => setIsOpen(true)}>
          <FaBars />
        </button>
     

        <h2 className="text-lg md:text-3xl font-bold">
          {title}
        </h2>
      
      </div>

      <button onClick={logout} className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-6 py-2 rounded-lg text-sm md:text-base">
         {t("logout")}
      </button>

    </div>
  )
}

export default Navbar
