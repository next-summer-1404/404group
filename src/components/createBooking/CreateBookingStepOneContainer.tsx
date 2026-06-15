"use client";
import Image from "next/image";
import React from "react";
import Information from "./bookingStepOne/Information";
import SetTravelDetails from "./bookingStepOne/SetTravelDetails";

function CreateBookingStepOneContainer() {
  return (
    <div className="rounded-[24px] bg-[#F5F5F5] dark:bg-gray-900 px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
      <Information />
      <SetTravelDetails />
    </div>
  );
}

export default CreateBookingStepOneContainer;
