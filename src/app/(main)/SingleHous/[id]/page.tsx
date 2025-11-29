import React from "react";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import { getHouseReserveDetail } from "../../../../services/api/HouseReserveDetails/HouseReserveDetails";
import { Property } from "../../../../types/HouseReserve/HouseReserveType";
import SingleHouse from "@/components/SingleHouse/SingleHouse";
export interface ISingleReserveHouseDetailParams {
  params: { id: string };
}
async function SingleHouseDetail({ params }: ISingleReserveHouseDetailParams) {
  const id = params.id;
  console.log(id);

  const property = await getHouseReserveDetail(id);

  return (
    <div>
      {" "}
      <SingleHouse property={property} />
    </div>
  );
}

export default SingleHouseDetail;
