import React from "react";
import Stepper from "../../../../components/createBooking/Stepper";
import CreateBookingStepOneContainer from "../../../../components/createBooking/CreateBookingStepOneContainer";

function CreateBookingStepOne() {
  return (
    <div className="flex flex-col gap-[45px]">
      <Stepper stepNumber={2} />
      <CreateBookingStepOneContainer />
    </div>
  );
}

export default CreateBookingStepOne;
