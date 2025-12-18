import React from "react";
import TextBoxDisitnation from "./TextBoxDisitnation";
import SliderByDestinationList from "./SliderByDestinationList";
import { getAllLocationByAdmin } from "../../../services/api/Admin/location/getAllLocation";

async function DestinationList() {
  const data = await getAllLocationByAdmin({ page: 1, limit: 10 });
  return (
    <>
      {" "}
      <div className="mx-auto w-[400px] sm:w-[1328px] h-[780px]   mt-[87px]  bg-[#F9F9F9] rounded-[32px] dark:bg-[#121a29] pt-[40px] relative ">
        <div className="hidden sm:block absolute  rounded-[32px] bottom-0 right-0 size-100 overflow-hidden">
          <div className="hidden sm:block  w-0 h-0 rounded-full bg-[#7575FE] shadow-[0_0_100px_140px_rgba(117,117,254,0.3)] absolute right-0 bottom-0"></div>{" "}
        </div>{" "}
        <TextBoxDisitnation />
        <section className=" p-6 sm:p-0 mb-[56px] z-50">
          <SliderByDestinationList data={data.data} />
        </section>{" "}
      </div>
    </>
  );
}

export default DestinationList;
