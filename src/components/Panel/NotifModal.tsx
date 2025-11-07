"use client";
import React from "react";

type NotifictionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const NotifModal: React.FC<NotifictionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-300 rounded-2xl text-center px-10 py-8 w-[400px] max-w-[90%] shadow-xl animate-fadeIn">
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <p className="text-base font-semibold text-black mb-8 leading-relaxed">
          آیا مطمئن هستید که می‌خواهید همه مطالب سایت را به عنوان خوانده شده
          علامت بزنید؟
        </p>

        <div className="flex justify-center items-center gap-8">
          <button onClick={onClose} className="text-sm text-black transition">
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

export default NotifModal;
