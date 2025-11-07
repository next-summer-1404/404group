import { CheckCircleIcon, ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import NotifModal from "./NotifModal";

const Notif = () => {
  const notifications = [
    {
      id: 1,
      message: "فروشنده امیر محمد طلایی یک خانه برای رزواگمی کرده است",
      date: "۱۲ مرداد / ۱۴۰۱",
      time: "۱۲:۳۳",
      read: false,
    },
    {
      id: 2,
      message: "به سایت دانا خوش آمدید",
      date: "۱۲ مرداد / ۱۴۰۱",
      time: "۱۲:۳۳",
      read: false,
    },
    {
      id: 3,
      message: "فروشنده امیر محمد طلایی یک خانه برای رزواگمی کرده است",
      date: "۱۲ مرداد / ۱۴۰۱",
      time: "۱۲:۳۳",
      read: true,
    },
    {
      id: 4,
      message: "به سایت دانا خوش آمدید",
      date: "۱۲ مرداد / ۱۴۰۱",
      time: "۱۲:۳۳",
      read: true,
    },
    {
      id: 5,
      message: "فروشنده امیر محمد طلایی یک خانه برای رزواگمی کرده است",
      date: "۱۲ مرداد / ۱۴۰۱",
      time: "۱۲:۳۳",
      read: true,
    },
  ];

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="p-3 text-right h-auto rounded-2xl">
        <div className="h-20 flex items-center justify-between">
          <p className="font-medium text-xl ">لیست اعلان‌های شما</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label className=" text-sm whitespace-nowrap">نوع اعلان:</label>
              <div className="relative">
                <select
                  className="w-[180px] rounded-2xl border border-[#555555]
                           bg-white 
                           text-sm pl-8 pr-3 py-2
                           outline-none appearance-none
                           transition-all duration-200"
                >
                  <option>همه</option>
                  <option>خوانده شده</option>
                  <option>خوانده نشده</option>
                </select>
                <ChevronDownIcon className="w-5 h-5 text-[#888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#8CFF45] text-[#393939]
                       rounded-2xl px-6 py-2
                       text-sm font-semibold
                       hover:bg-[#aaff6b] active:scale-95
                       transition-all"
            >
              علامت‌گذاری به عنوان خوانده شده
            </button>
          </div>
        </div>

        <div className="border-t border-dashed border-[#555] mt-2" />

        <NotifModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      </div>
      <div className="rounded-xl p-3 mt-5">
        <div className="bg-gray-200 rounded-xl p-2 flex gap-[580px]">
          <p className=" text-md">اعلان</p>
          <p className=" text-md">تاریخ</p>
        </div>

        <div className="mt-3">
          <div className="text-sm text-gray-500 border-b border-dashed border-gray-200 pb-1 mb-2 text-right">
            خوانده نشده
          </div>
          {unread.map((n) => (
            <div
              key={n.id}
              className="grid grid-cols-2 items-center py-3 px-2 border-b border-gray-200"
            >
              <div className="text-right">
                <p className="text-sm">{n.message}</p>
              </div>

              <div className="flex items-center justify-evenly gap-60 text-left text-xs">
                <span>
                  {n.time} ـ {n.date}
                </span>
                <div className="inline-flex items-center gap-1 bg-[#8CFF45] text-[#393939] text-xs font-semibold px-3 py-1 rounded-full">
                  <CheckCircleIcon className="w-4 h-4" />
                  علامت‌گذاری به‌عنوان خوانده شده
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-500 border-b border-dashed border-gray-200 pb-1 mb-2 text-right">
            خوانده شده
          </div>
          {read.map((n) => (
            <div
              key={n.id}
              className="grid grid-cols-2 items-center py-3 px-2 border-b border-gray-200"
            >
              <div className="text-right">
                <p className="text-sm">{n.message}</p>
              </div>

              <div className=" text-xs">
                {n.time} ـ {n.date}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end items-center gap-2 mt-4">
          <button className="bg-[#8CFF45] text-[#393939] px-3 py-1 rounded text-xs font-semibold">
            ۱
          </button>
          {[2, 3, 4].map((n) => (
            <button key={n} className="px-3 py-1 rounded text-xs  ">
              {n}
            </button>
          ))}
          <span className=" text-xs">...</span>
        </div>
      </div>
    </div>
  );
};

export default Notif;
