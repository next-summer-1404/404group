"use client";
import React, { useState } from "react";
import {
  PlusCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, useDisclosure } from "@heroui/react";
import TransactionListModal from "./TransactionListModal";

const WalletModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState<"opaque" | "blur" | "transparent">(
    "blur"
  );

  return (
    <>
      <div className="absolute bottom-[-90px] bg-[#393939] border border-[#AAAAAA]/40 rounded-xl shadow-xl w-[210px] py-2 text-right">
        <button className="w-full flex gap-1 items-center px-3 py-2 hover:bg-[#2C2C2C] transition-colors">
          <PlusCircleIcon className="w-5 h-5 text-[#8CFF45]" />
          <span className="text-[#8CFF45] text-[14px]">شارژ کردن کیف پول</span>
        </button>

        <hr className="border-[#AAAAAA]/40 my-1" />

        <button
          onClick={() => {
            setBackdrop("blur");
            onOpen();
          }}
          className="w-full flex gap-1 items-center px-3 py-2 hover:bg-[#2C2C2C] transition-colors"
        >
          <ArrowRightCircleIcon className="w-5 h-5 text-[#8CFF45]" />
          <span className="text-[#8CFF45] text-[14px]">لیست تراکنش‌ها</span>
        </button>

        <hr className="border-[#AAAAAA]/40 my-1" />

        <button className="w-full flex gap-1 items-center px-3 py-2 hover:bg-[#2C2C2C] transition-colors">
          <ArrowRightCircleIcon className="w-5 h-5 text-[#8CFF45]" />
          <span className="text-[#8CFF45] text-[14px]">برداشت وجه</span>
        </button>
      </div>

      <TransactionListModal
        isOpen={isOpen}
        onClose={onClose}
        backdrop={backdrop}
      />
    </>
  );
};

export default WalletModal;
