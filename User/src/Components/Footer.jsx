import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope,FaSeedling} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
  return (
    <footer className="bg-white border-t mt-16">

      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-green-700">
               <FaSeedling />  {t("appName")}
            </h2>

            <p className="text-gray-500 mt-3">
              {t("footerDescription")}
            </p>

            <div className="flex gap-4 mt-5 text-xl text-green-700">

              <FaFacebook className="cursor-pointer" />
              <FaInstagram className="cursor-pointer" />
              <FaTwitter className="cursor-pointer" />
              <FaEnvelope className="cursor-pointer" />

            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-3">{t("quickLinks")}</h3>

            <ul className="space-y-2 text-gray-600">
              <li>{t("quickLinks")}</li>
              <li>{t("dashboard")}</li>
              <li>{t("weather")}</li>
              <li>{t("alerts")}</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-3">{t("resources")}</h3>

            <ul className="space-y-2 text-gray-600">
              <li>{t("helpCenter")}</li>
              <li>{t("privacyPolicy")}</li>
              <li>{t("termsConditions")}</li>
              <li>{t("support")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-3">{t("contact")}</h3>

            <ul className="space-y-2 text-gray-600">
              <li>Ranchi, Jharkhand</li>
              <li>+91 xxxxxxxxxx</li>
              <li>support@smartfarming.com</li>
            </ul>
          </div>

        </div>

        <div className="border-t mt-8 pt-5 text-center text-gray-500">

          © {new Date().getFullYear()} Smart Farming Advisory System.
         {t("allRightsReserved")}

        </div>

      </div>

    </footer>
  );
};

export default Footer;
