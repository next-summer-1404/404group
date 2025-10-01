import React from "react";
import RentFilter from "../../../components/rent/RentFilter";
import HousesComponents from "../../../components/rent/HousesComponents";
import PaginationComponents from "../../../components/rent/PaginationComponents";

function RentPage() {
  return (
    <div>
      <RentFilter />
      <HousesComponents />
      <div className=" flex justify-center items-center">
        {" "}
        <PaginationComponents />
      </div>
    </div>
  );
}

export default RentPage;
