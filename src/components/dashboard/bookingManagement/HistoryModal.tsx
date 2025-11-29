'use client';
import React from "react";

type HistoryItem = {
  datetime: string;
  type: string;
  user?: string;
};

type HistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  history?: HistoryItem[];
};

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[10000]">
      <div className="bg-[#202020] text-[#E5E7EB] rounded-2xl p-6 w-[600px] border border-[#333] shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-dashed border-[#333] pb-2">
          <h2 className="text-[#8CFF45] font-semibold text-lg">
            تاریخچه تغییرات
          </h2>
          <button
            onClick={onClose}
            className="text-[#ff4556] border border-[#ff4556]/40 rounded-full px-3 py-1 text-sm hover:bg-[#ff4556]/10 transition"
          >
            بستن ✕
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-[#aaa] border-b border-dashed border-[#444]">
                <th className="py-2 px-3 text-right font-normal">تاریخ و زمان</th>
                <th className="py-2 px-3 font-normal">نوع تغییر</th>
              </tr>
            </thead>

            <tbody>
              {history.length > 0 ? (
                history.map((h, i) => (
                  <tr
                    key={i}
                    className="border-b border-dashed border-[#444] hover:bg-[#2a2a2a] transition"
                  >
                    <td className="py-2 px-3 text-right">{h.datetime}</td>
                    <td className="py-2 px-3">{h.type}</td>
                    <td className="py-2 px-3 text-center">
                      {h.user || "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-[#777]">
                    سابقه‌ای یافت نشد.
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

export default HistoryModal;
