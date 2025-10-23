"use client";
import Image from "next/image";
import React from "react";
import Information from "./bookingStepOne/Information";
import SetTravelDetails from "./bookingStepOne/SetTravelDetails";

function CreateBookingStepOneContainer() {
  return (
    <div className="rounded-[24px] bg-[#F5F5F5]  px-[16px] py-[32px]">
      <Information />
      <SetTravelDetails />
    </div>
  );
}

export default CreateBookingStepOneContainer;
