'use client';
import React from "react";

type Payment = {
  date: string;
  tracking: string;
  amount: string;
  status: string;
};

type PaymentsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  payments?: Payment[];
};

const PaymentsModal: React.FC<PaymentsModalProps> = ({
  isOpen,
  onClose,
  payments = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[10000]">
      <div className="bg-[#202020] text-[#E5E7EB] rounded-2xl p-6 w-[650px] border border-[#333] shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-dashed border-[#333] pb-2">
          <h2 className="text-[#8CFF45] font-semibold text-lg">لیست پرداخت‌ها</h2>
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
                <th className="py-2 px-3 text-right font-normal">تاریخ</th>
                <th className="py-2 px-3 font-normal">شماره پیگیری</th>
                <th className="py-2 px-3 font-normal">مبلغ</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-dashed border-[#444] hover:bg-[#2a2a2a] transition"
                  >
                    <td className="py-2 px-3 text-right">{p.date}</td>
                    <td className="py-2 px-3 text-center">{p.tracking}</td>
                    <td className="py-2 px-3 text-center">{p.amount}</td>
                    <td
                      className={`py-2 px-3 text-center font-medium ${
                        p.status === "موفق"
                          ? "text-[#8CFF45]"
                          : p.status === "لغو"
                          ? "text-[#ff4556]"
                          : "text-[#ffca45]"
                      }`}
                    >
                      {p.status}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        className="text-[#8CFF45] hover:text-[#aaff6b] transition"
                        title="نمایش رسید"
                      >
                        🔍
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-[#777]">
                    هیچ پرداختی ثبت نشده.
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

export default PaymentsModal;
