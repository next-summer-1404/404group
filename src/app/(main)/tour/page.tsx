import React from "react";
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
import PaginationComponents from "@/components/tour/PaginationComponents";
import TourComponents from "@/components/tour/tourComponents";
import { getAllTour } from "@/services/api/Tour/getAllTourWithFilter";
import { TourResponse } from "@/types/TourTypes/TourTypes";
export interface IHouseComponentsProps {
  searchParams: { [key: string]: string };
}
async function TourPage({ searchParams }: IHouseComponentsProps) {
  const params: Record<string, string> = {};
  Object.entries(searchParams).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      params[key] = val;
    }
  });

  console.log(params);
  const TourResponse = await getAllTour();
  const data = TourResponse;
  console.log(data);
  // const totalPages = data ? Math.ceil(data.totalCount / 10) : 0;
  return (
    <div className="">
      <TourComponents data={data} />
      <div className=" flex justify-center items-center">
        {" "}
        {/* <PaginationComponents totalCount={totalPages} /> */}
      </div>
    </div>
  );
}

export default TourPage;
