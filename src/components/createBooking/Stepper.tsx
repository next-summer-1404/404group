"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// 📦 آیکون‌ها
import hotelWhite from "@/assets/createBooking/Hotel.svg";

import HumanBlue from "@/assets/createBooking/HumanBlue.svg";
import HumanWhite from "@/assets/createBooking/HumanWhite.svg";

import acceptInformationBlue from "@/assets/createBooking/acceptInformationBlue.svg";
import acceptInformationWhite from "@/assets/createBooking/acceptInformationWhite.svg";
import acceptInformationGray from "@/assets/createBooking/acceptInformationGray.svg";

import paymentBlue from "@/assets/createBooking/paymentBlue.svg";
import paymentWhite from "@/assets/createBooking/paymentWhite.svg";
import paymentGray from "@/assets/createBooking/paymentgray.svg";

import ticketBlue from "@/assets/createBooking/ticketBlue.svg";
import ticketWhite from "@/assets/createBooking/ticketWhite.svg";
import ticketGray from "@/assets/createBooking/ticketGray.svg";
import { usePathname } from "next/navigation";

function Stepper({ stepNumber }: { stepNumber: number }) {
  const [currentStep, setCurrentStep] = useState(stepNumber || 2);

  const steps = [
    {
      id: 1,
      title: "انتخاب هتل",
      icons: { white: hotelWhite },
      alwaysDone: true,
    },
    {
      id: 2,
      title: "مشخصات مسافران",
      icons: { blue: HumanBlue, white: HumanWhite },
      noGray: true,
    },
    {
      id: 3,
      title: "تایید اطلاعات",
      icons: {
        blue: acceptInformationBlue,
        white: acceptInformationWhite,
        gray: acceptInformationGray,
      },
    },
    {
      id: 4,
      title: "پرداخت آنلاین",
      icons: { blue: paymentBlue, white: paymentWhite, gray: paymentGray },
    },
    {
      id: 5,
      title: "صدور بلیط",
      icons: { blue: ticketBlue, white: ticketWhite, gray: ticketGray },
    },
  ];

  //  رنگ پس‌زمینه دایره
  const getStepBgColor = (step: any) => {
    if (step.alwaysDone || step.id < currentStep) return "#0D3B66";
    if (step.id === currentStep) return "#E6EDF5";
    return "#F5F5F5";
  };

  //  رنگ خطوط بین مراحل
  const getLineColor = (step: any) => {
    if (step.alwaysDone || step.id < currentStep) return "#0D3B66";
    return "#DDDDDD";
  };

  // انتخاب آیکون درست
  const getStepIcon = (step: any) => {
    if (step.alwaysDone) return step.icons.white;
    if (step.id < currentStep) return step.icons.white;
    if (step.id === currentStep) return step.icons.blue;
    if (step.noGray) return step.icons.white;
    return step.icons.gray;
  };

  return (
    <div>
      {/* دایره‌ها و خطوط */}
      <div className="h-[80px] flex flex-row flex-nowrap items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* دایره */}
            <div
              className="size-[80px] rounded-full flex justify-center items-center transition-all duration-300"
              style={{ backgroundColor: getStepBgColor(step) }}
            >
              <Image
                src={getStepIcon(step)}
                alt={step.title}
                width={40}
                height={40}
              />
            </div>

            {/* خط بین مراحل */}
            {index !== steps.length - 1 && (
              <div
                className="h-[8px] w-[289px] transition-all duration-300"
                style={{ backgroundColor: getLineColor(step) }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* عناوین زیر استپ‌ها */}
      <div className="pt-[16px] pl-[20px] flex flex-row flex-nowrap items-center justify-between">
        {steps.map((step) => (
          <h1
            key={step.id}
            className={`text-[14px] font-[600] ${
              step.id === currentStep
                ? "text-[#0D3B66]"
                : step.id < currentStep || step.alwaysDone
                ? "text-gray-600"
                : "text-gray-400"
            }`}
          >
            {step.title}
          </h1>
        ))}
      </div>
    </div>
  );
}

export default Stepper;
