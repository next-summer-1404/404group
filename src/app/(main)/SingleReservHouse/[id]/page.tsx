import React from "react";
import Header from "../../../../components/Header/Header";
import SingleReservHouse from "../../../../components/SingleReservHouse/SingleReservHouse";
import Footer from "../../../../components/Footer/Footer";
import { getHouseReserveDetail } from "../../../../services/api/HouseReserveDetails/HouseReserveDetails";
export interface ISingleReserveHouseDetailParams {
  params: { id: string };
}
async function SingleReservHouseDetail({
  params,
}: ISingleReserveHouseDetailParams) {
  const id = params.id;
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
