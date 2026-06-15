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
    <div className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="sm:hidden bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-md transition-colors duration-300">
        <ModalFilterRent />
      </div>
      <div className="hidden sm:block bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md transition-colors duration-300">
        <RentFilter />
      </div>

      <HousesComponents data={data} />
      <div className="flex justify-center items-center mt-10 bg-transparent">
        {" "}
        <PaginationComponents totalCount={totalPages} />
      </div>
    </div>
  );
}

export default RentPage;
