'use client';
import React from "react";

type Passenger = {
  name: string;
  gender: string;
  phone: string;
};

type PassengersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  passengers?: Passenger[];
};

const PassengersModal: React.FC<PassengersModalProps> = ({
  isOpen,
  onClose,
  passengers = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[10000]">
      <div className="bg-[#202020] text-[#E5E7EB] rounded-2xl p-6 w-[650px] border border-[#333] shadow-2xl relative">
        {/* عنوان و دکمه بستن */}
        <div className="flex justify-between items-center mb-4 border-b border-dashed border-[#333] pb-2">
          <h2 className="text-[#8CFF45] font-semibold text-lg">
            جزئیات مسافران
          </h2>
          <button
            onClick={onClose}
            className="text-[#ff4556] border border-[#ff4556]/40 rounded-full px-3 py-1 text-sm hover:bg-[#ff4556]/10 transition"
          >
            بستن ✕
          </button>
        </div>

        {/* جدول مسافران */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-[#aaa] border-b border-dashed border-[#444]">
                <th className="py-2 px-3 text-right font-normal">نام</th>
                <th className="py-2 px-3 font-normal">جنسیت</th>
                <th className="py-2 px-3 font-normal">شماره تماس</th>
                <th className="py-2 px-3 font-normal text-center">
                  ارسال پیام
                </th>
              </tr>
            </thead>

            <tbody>
              {passengers.length > 0 ? (
                passengers.map((p, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-dashed border-[#444] hover:bg-[#2a2a2a] transition"
                  >
                    <td className="py-2 px-3 text-right">{p.name}</td>
                    <td className="py-2 px-3">{p.gender}</td>
                    <td className="py-2 px-3 font-mono">{p.phone}</td>
                    <td className="py-2 px-3 text-center">
                      <button
                        className="text-[#8CFF45] hover:text-[#aaff6b] text-lg transition"
                        title="ارسال پیام"
                      >
                        ✈
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-[#777]">
                    مسافری ثبت نشده است.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PassengersModal;
