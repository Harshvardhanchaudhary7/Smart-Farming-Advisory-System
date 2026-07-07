import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,confirmText,
}) => {

  const { t } = useTranslation();

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6">

        <div className="flex items-center gap-3">

          <FaExclamationTriangle className="text-red-500 text-3xl"/>

          <h2 className="text-2xl font-bold">

            {title}

          </h2>

        </div>

        <p className="text-gray-600 mt-4">

          {message}

        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >

            {t("cancel")}

          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >

           {confirmText}

          </button>

        </div>

      </div>

    </div>

  );

};

export default ConfirmModal;