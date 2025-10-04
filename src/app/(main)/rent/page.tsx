import React from "react";
import RentFilter from "../../../components/rent/RentFilter";
import HousesComponents from "../../../components/rent/HousesComponents";
import PaginationComponents from "../../../components/rent/PaginationComponents";
import { HousesResponse } from "../../../types/RentTypes/HomeTypes";
import { getAllHouses } from "../../../services/api/Houses/getAllHousesWithFilter";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import ModalFilterRent from "../../../components/rent/ModalFilterRent";
export interface IHouseComponentsProps {
  searchParams: { [key: string]: string };
}
async function RentPage({ searchParams }: IHouseComponentsProps) {
  const params: Record<string, string> = {};
  Object.entries(searchParams).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      params[key] = val;
    }
  });

  console.log(params);
  const data: HousesResponse = await getAllHouses(searchParams);
  console.log(data.totalCount);
  const totalPages = data ? Math.ceil(data.totalCount / 10) : 0;
  return (
    <div className="">
      <div className="sm:hidden">
        <ModalFilterRent />
      </div>
      <div className="hidden sm:block">
        <RentFilter />
      </div>

      <HousesComponents data={data} />
      <div className=" flex justify-center items-center">
        {" "}
        <PaginationComponents totalCount={totalPages} />
      </div>
    </div>
  );
}

export default RentPage;
