"use client";
import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

type NotifictionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const SellerNotificationModal: React.FC<NotifictionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#444444] rounded-2xl text-center px-10 py-8 w-[400px] max-w-[90%] shadow-xl animate-fadeIn">
        <div className="flex justify-center mb-4">
          <ExclamationTriangleIcon className="w-14 h-14 text-yellow-400" />
        </div>

        <p className="text-base font-semibold text-white mb-8 leading-relaxed">
          آیا مطمئن هستید که می‌خواهید همه مطالب سایت را به عنوان خوانده شده
          علامت بزنید؟
        </p>

        <div className="flex justify-center items-center gap-8">
          <button
            onClick={onClose}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#FFA500] hover:bg-[#ffba26] transition text-black px-6 py-1.5 rounded-md font-semibold text-sm"
          >
            موافقت
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerNotificationModal;
