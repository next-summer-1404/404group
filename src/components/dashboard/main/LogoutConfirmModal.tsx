"use client";
import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

type LogoutConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#393939] text-center rounded-2xl px-10 py-8 w-[380px] max-w-[90%] shadow-xl animate-fadeIn">
        <div className="flex justify-center mb-4">
          <ExclamationTriangleIcon className="w-12 h-12 text-yellow-400" />
        </div>

        <p className="text-lg font-semibold text-[#111] mb-6">
          آیا از خروج خود مطمئن هستید؟
        </p>

        <div className="flex justify-center items-center gap-6">
          <button
            onClick={onClose}
            className="text-sm text-[#000] hover:text-black transition"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#FFA500] hover:bg-[#ffba26] transition text-[#000] px-5 py-1.5 rounded-md font-semibold text-sm"
          >
            خروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
