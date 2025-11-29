import React, { FC } from "react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { FinanceTypes } from "@/types/panel/FinanceTypes";

interface SellerDashboardProps {
  Finance: FinanceTypes;
}

const HeroFainance: FC<SellerDashboardProps> = ({ Finance }) => {
  const cards = [
    { id: 1, title: "درآمد ماه جاری", value: Finance?.totalCurrentMonthAmount },
    { id: 2, title: "درآمد ماه قبل", value: Finance?.totalPreviousMonthAmount },
    { id: 3, title: "درآمد کل", value: Finance?.totalAmount },
    { id: 4, title: "موجودی قابل برداشت", value: Finance?.totalPayments },
  ];

  return (
    <div className="flex justify-between gap-5 w-full">
      {cards.map((item) => (
        <div
          key={item.id}
          className="w-[264px] h-auto bg-[#393939] rounded-2xl flex flex-col justify-between  text-right"
        >
          <div className="flex justify-baseline items-start relative ">
            <PaperClipIcon className="w-10 h-12 pt-4 text-[#000000] bg-[#ECECEC] absolute top-0 right-4 rounded-b-2xl" />
          </div>

          <div className="text-[16px] font-medium text-[#AAA] mt-14 p-2">
            {item.title}
          </div>

          <div className="border-t border-dashed border-gray-300  mb-[2px]" />

          <div className="flex justify-between items-center p-2">
            <button className="text-[16px] text-[#AAA] font-medium">
              {item.value}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroFainance;
