import React from "react";
import Header from "../../../../components/Header/Header";
import SingleReservHouse from "../../../../components/SingleReservHouse/SingleReservHouse";
import Footer from "../../../../components/Footer/Footer";
import { getHouseReserveDetail } from "../../../../services/api/HouseReserveDetails/HouseReserveDetails";
import { Property } from "../../../../types/HouseReserve/HouseReserveType";
export interface ISingleReserveHouseDetailParams {
  params: promise<{ id: string }>;
}
async function SingleReservHouseDetail({ params }: props) {
  const id = await params;
  console.log(id);

  const property = await getHouseReserveDetail(id);

  return (
    <div>
      {" "}
      <SingleReservHouse property={property} />
    </div>
  );
}

export default SingleReservHouseDetail;
