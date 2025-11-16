import React from "react";
import Stepper from "../../../../components/createBooking/Stepper";
import CreateBookingStepTwoContainer from "../../../../components/createBooking/CreateBookingStepTwoContainer";

function CreateBookingStepTow() {
  return (
    <div className="flex flex-col gap-[45px]">
      <Stepper stepNumber={3} />
      <CreateBookingStepTwoContainer />
    </div>
  );
}

export default CreateBookingStepTow;
