import React from "react";
import TextBoxDiscount from "./TextBoxDiscount";
import { getAllHouses } from "../../../services/api/Houses/getAllHousesWithFilter";

import ItemsDiscount from "./ItemsDiscount";
import { House } from "../../../types/RentTypes/HomeTypes";
async function DiscountLandingComponents() {
  const data = await getAllHouses({ page: 1, limit: 200 });
  console.log(data);
  const filterDiscount: House[] = data.houses.filter(
    (item) => item.discount_id === null
  );
  console.log(filterDiscount);

  return (
    <div className=" mt-[104px] mx-auto sm:max-w-[1328px] ">
      <header className="flex flex-col gap-[16px]">
        <TextBoxDiscount />
      </header>
      <section className="flex flex-row gap-4 pt-[36px]">
        <ItemsDiscount filterDiscount={filterDiscount} />
      </section>
    </div>
  );
}

export default DiscountLandingComponents;
