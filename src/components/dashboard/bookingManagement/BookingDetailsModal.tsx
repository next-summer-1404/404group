'use client';
import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PassengersModal from './PassengersModal';
import PaymentsModal from './PaymentsModal';
import HistoryModal from './HistoryModal';

type BookingDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
};

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ isOpen, onClose, data }) => {
  const [activeModal, setActiveModal] = useState<null | 'passengers' | 'payments' | 'history'>(null);

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0e0e0e] text-white w-[800px] max-h-[95vh] rounded-2xl shadow-2xl overflow-y-auto border border-[#333] p-6">
        {/* هدر بالای مدال */}
        <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-4 mb-4">
          <h2 className="text-lg font-semibold">{data.title || 'جزئیات اقامت'}</h2>
          <button
            onClick={onClose}
            className="flex items-center gap-1 bg-[#2A2A2A] text-[#FF4556] px-3 py-1 rounded-xl hover:bg-[#3a3a3a] transition"
          >
            <XMarkIcon className="w-4 h-4" />
            بستن
          </button>
        </div>

        {/* نوع اقامت و اطلاعات اصلی */}
        <div className="flex gap-6">
          <div className="bg-[#2A2A2A] w-[280px] h-[180px] rounded-xl flex items-center justify-center text-[#AAA]">
            پیش‌نمایش تصویر
          </div>

          <div className="flex-1 space-y-3 text-sm leading-6">
            <p>
              {data.description ||
                'توضیحات رزرو در این قسمت نمایش داده می‌شود. شامل خلاصه‌ای از محل اقامت، امکانات، تاریخ‌ها و اطلاعات کلیدی رزرو.'}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {(data.tags || ['آپارتمان', 'مسکونی', 'پارکینگ']).map((t: string, i: number) => (
                <span
                  key={i}
                  className="bg-[#8CFF45]/10 text-[#8CFF45] px-3 py-1 rounded-full text-xs border border-[#8CFF45]/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* اطلاعات اقامت */}
        <div className="mt-6 space-y-4 border-t border-[#2a2a2a] pt-4 text-sm">
          <div className="flex justify-between">
            <span>آدرس:</span>
            <span className="text-[#AAA]">{data.address || 'رشت، میدان آزادی، جنب چهارراه انصاری'}</span>
          </div>

          <div className="flex justify-between">
            <span>تاریخ:</span>
            <span className="text-[#AAA]">{data.date || '۱۴۰۱/۰۵/۱۶ تا ۱۴۰۱/۰۵/۲۸'}</span>
          </div>

          <div className="flex justify-between">
            <span>اتاق‌ها:</span>
            <span className="text-[#AAA]">{data.rooms || '۴ خواب، ۲ حمام'}</span>
          </div>

          <div className="flex justify-between border-t border-[#2a2a2a] pt-3 mt-3">
            <span>قیمت کل:</span>
            <span className="text-[#8CFF45] font-semibold">{data.price || '۵,۰۰۰,۰۰۰ تومان'}</span>
          </div>

          {/* دکمه‌های پایین مدال */}
          <div className="flex gap-3 mt-4">
            <button
              className="bg-[#8CFF45] text-[#0e0e0e] rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#aaff6b] transition"
              onClick={() => setActiveModal('passengers')}
            >
              مسافران
            </button>
            <button
              className="bg-[#2a2a2a] text-[#8CFF45] border border-[#8CFF45]/30 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#3a3a3a] transition"
              onClick={() => setActiveModal('payments')}
            >
              پرداخت‌ها
            </button>
            <button
              className="bg-[#2a2a2a] text-[#ffca45] border border-[#ffca45]/30 rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#3a3a3a] transition"
              onClick={() => setActiveModal('history')}
            >
              تاریخچه تغییرات
            </button>
          </div>
        </div>
      </div>

      {/* 🎯 SubModals */}
      {activeModal === 'passengers' && (
        <PassengersModal
          isOpen
          onClose={() => setActiveModal(null)}
          passengers={data.passengers || []}
        />
      )}

      {activeModal === 'payments' && (
        <PaymentsModal
          isOpen
          onClose={() => setActiveModal(null)}
          payments={data.payments || []}
        />
      )}

      {activeModal === 'history' && (
        <HistoryModal
          isOpen
          onClose={() => setActiveModal(null)}
          history={data.history || []}
        />
      )}
    </div>
  );
};

export default BookingDetailsModal;
