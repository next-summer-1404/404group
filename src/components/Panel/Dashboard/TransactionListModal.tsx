"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  backdrop?: "opaque" | "blur" | "transparent";
}

const transactions = [
  {
    date: "۱۲ مرداد / ۱۴۰۱ - ",
    tracking: "۱۳۴۳۴۵۶۷۸۹۱۳۴۵۶۲",
    amount: "۱٬۲۵۰٬۰۰۰",
  },
  {
    date: "۱۳ شهریور / ۱۴۰۱ - ",
    tracking: "۹۸۷۶۵۴۳۲۱۰۱۲۳۴۵",
    amount: "۲٬۵۰۰٬۰۰۰",
  },
  {
    date: "۱ مهر / ۱۴۰۱ - ",
    tracking: "۵۴۳۲۱۰۹۸۷۶۵۴۳۲۱",
    amount: "۳٬۰۰۰٬۰۰۰",
  },
];

export default function TransactionListModal({
  isOpen,
  onClose,
  backdrop = "blur",
}: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop={backdrop}
      scrollBehavior="inside"
      placement="center"
      classNames={{
        base: "bg-[#1E1E1E] text-[#AAA] rounded-xl ",
        header: "border-b border-[#333]",
        body: "py-4",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              dir="rtl"
              className="flex items-center justify-between text-[16px]"
            >
              <p className="font-medium text-[#AAA]">لیست تراکنش‌های شما</p>
              <Button
                color="danger"
                variant="light"
                className="border border-red-400 rounded-full px-3 py-1 text-red-400 text-sm"
                onPress={onClose}
              >
                بستن ✕
              </Button>
            </ModalHeader>

            <ModalBody dir="rtl">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-separate border-spacing-y-1 text-xs p-1">
                  <thead>
                    <tr className="bg-[#2D2D2D] text-[#AAAAAA]">
                      <th className="p-2 rounded-tl-lg rounded-bl-lg">تاریخ</th>
                      <th className="p-2">شماره پیگیری</th>
                      <th className="p-2">مبلغ</th>
                      <th className="p-2 rounded-tr-lg rounded-br-lg"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t, i) => (
                      <tr
                        key={i}
                        className={`${
                          i % 2 === 0 ? "bg-[#252525]" : "bg-[#1E1E1E]"
                        }`}
                      >
                        <td className="p-2 text-[#AAA]">{t.date}</td>
                        <td className="p-2 text-[#AAA]">{t.tracking}</td>
                        <td className="p-2 text-[#AAA]">{t.amount} تومان</td>
                        <td className="p-2">
                          <button className="text-[#8CFF45] text-[10px] hover:underline">
                            مشاهده رسید
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
