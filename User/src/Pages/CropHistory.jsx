import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaSearch, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import ConfirmModal from "../Components/ConfirmModal";

const CropHistory = () => {
   const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

const [selectedHistoryId, setSelectedHistoryId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const filteredHistory = history.filter((item) => {

  const matchCrop =
    item.crop
      .toLowerCase()
      .includes(search.toLowerCase());

  if (dateFilter === "all")
    return matchCrop;

  const created = new Date(item.createdAt);

  const today = new Date();

  const diff =
    (today - created) /
    (1000 * 60 * 60 * 24);

  if (dateFilter === "today")
    return matchCrop && diff < 1;

  if (dateFilter === "7days")
    return matchCrop && diff <= 7;

  if (dateFilter === "30days")
    return matchCrop && diff <= 30;

  return matchCrop;

});

const deleteHistory = async (id) => {

  

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/history/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHistory((prev) =>
      prev.filter((item) => item._id !== id)
    );

  } catch (err) {

    console.log(err);

    toast.error(t("deleteHistoryFailed"));

  }

};

const confirmDelete = async () => {

  await deleteHistory(selectedHistoryId);

  setShowDeleteModal(false);

  setSelectedHistoryId(null);

};

const seasonMap = {
  Summer: t("summer"),
  Winter: t("winter"),
  Monsoon: t("monsoon"),
  Spring: t("spring"),
  Autumn: t("autumn"),
};

  return (

    <div className="flex">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="md:ml-72 flex-1 bg-gray-100">

        <Navbar
          title={t("cropHistory")}
          setIsOpen={setIsOpen}
        />
    <div className="p-6 mt-18">

  <h1 className="text-3xl font-bold mb-8">
    {t("cropHistory")}
  </h1>

<div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">

  {/* Search */}

  <div className="relative w-full lg:w-[450px]">

    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

    <input
      type="text"
      placeholder={t("searchCrop")}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
    />

  </div>

  {/* Date Filter */}

  <select
    value={dateFilter}
    onChange={(e) => setDateFilter(e.target.value)}
    className="border rounded-xl px-5 py-3 shadow-sm"
  >

    <option value="all">{t("allHistory")}</option>
    <option value="today">{t("today")}</option>
    <option value="7days">{t("last7Days")}</option>
    <option value="30days">{t("last30Days")}</option>

  </select>

</div>

  {history.length === 0 ? (

    <div className="bg-white rounded-2xl shadow p-12 text-center">

      <h2 className="text-2xl font-bold text-gray-600">
        {t("noCropHistory")}
      </h2>

      <p className="text-gray-500 mt-3">
        {t("generateRecommendation")}
      </p>

    </div>

  ) : (

    <div className="space-y-6">

      {filteredHistory.map((item) => (

        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-lg p-6"
        >

          <div className="flex justify-between items-start">

  <div>

    <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">

       {item.crop}

    </h2>

    <p className="text-gray-500">

     {new Date(item.createdAt).toLocaleString(
  localStorage.getItem("language") === "hi"
    ? "hi-IN"
    : "en-US" )}

    </p>

  </div>

  <div className="flex items-center gap-3">

    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

      {seasonMap[item.season] || item.season}

    </span>

    <button
      onClick={() => {

    setSelectedHistoryId(item._id);

    setShowDeleteModal(true);

}}
      className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition"
    >

      <FaTrash />

    </button>

  </div>

</div>

          <div className="grid md:grid-cols-4 gap-4 mt-6">

            <div>

              <p className="text-gray-500">
                {t("soil")}
              </p>

              <h3 className="font-bold">
                {item.soil}
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                {t("temperature")}
              </p>

              <h3 className="font-bold">
                {item.temperature}°C
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                {t("humidity")}
              </p>

              <h3 className="font-bold">
                {item.humidity}%
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                {t("rainfall")}
              </p>

              <h3 className="font-bold">
                {item.rainfall} mm
              </h3>

            </div>

          </div>

          <div className="mt-6">

            <h3 className="font-bold text-lg">

            {t("summary")}

            </h3>

            <p className="text-gray-700 mt-2">

              {item.aiSummary}

            </p>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

<ConfirmModal
  isOpen={showDeleteModal}
  title={t("deleteHistory")}
  message={t("deleteHistoryConfirm")}
  confirmText={t("delete")}
  onConfirm={confirmDelete}
  onCancel={() => {
    setShowDeleteModal(false);
    setSelectedHistoryId(null);
  }}
/>

        <Footer />

      </div>

    </div>

  );

};

export default CropHistory;