import React from "react";
import Stepper from "../../../../components/createBooking/Stepper";
import CreateBookingStepOneContainer from "../../../../components/createBooking/CreateBookingStepOneContainer";

function CreateBookingStepOne() {
  return (
    <div
      className="
    flex flex-col gap-[45px]
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-gray-100
    transition-colors duration-300
    rounded-[24px]
    p-4 md:p-6
  "
    >
      <Stepper stepNumber={2} />
      <CreateBookingStepOneContainer />
    </div>
  );
}

export default CreateBookingStepOne;
