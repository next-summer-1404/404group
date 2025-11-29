"use client";

import Image from "next/image";
import React, { useState } from "react";
import Arrow from "../../../assets/dash/Group 34.png";
import PropertyStepper from "./PropertyStepper";
import BasicInfoForm from "./BasicInfoForm ";
import AddressForm from "./AddressForm ";
import FacilitiesForm from "./FacilitiesForm ";
import ImagesUpload from "./ImagesUpload ";
import ConfirmPage from "./ConfirmPage ";

const AddProperty = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div
      className="
    h-auto 
    bg-white dark:bg-gray-900
    text-black dark:text-white
    rounded-2xl 
    pb-8 
    transition-colors duration-300
  "
    >
      {/* Header */}
      <div
        className="
      flex flex-col sm:flex-row 
      items-start sm:items-center 
      justify-between 
      px-4 sm:px-8 
      py-3 
      gap-3
    "
      >
        <p className="text-[16px] font-light text-black dark:text-white">
          ساخت آگهی ملک جدید
        </p>

        <div className="flex items-center gap-2 cursor-pointer">
          <p className="text-green-400 dark:text-green-500 text-[16px]">
            لیست املاک من
          </p>
          <Image
            src={Arrow}
            width={40}
            height={16}
            alt="Green arrow"
            className="opacity-80 dark:opacity-100"
          />
        </div>
      </div>

      <div className="border-t border-dashed border-gray-400 dark:border-gray-700 mb-6 mx-4 sm:mx-8" />

      {/* Stepper */}
      <div className="px-4 sm:px-8">
        <PropertyStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>

      {/* Content */}
      <div className="mt-8 px-4 sm:px-8">
        {activeStep === 0 && <BasicInfoForm setActiveStep={setActiveStep} />}
        {activeStep === 1 && <AddressForm setActiveStep={setActiveStep} />}
        {activeStep === 2 && <FacilitiesForm setActiveStep={setActiveStep} />}
        {activeStep === 3 && <ImagesUpload setActiveStep={setActiveStep} />}
        {activeStep === 4 && <ConfirmPage setActiveStep={setActiveStep} />}
      </div>
    </div>
  );
};

export default AddProperty;
