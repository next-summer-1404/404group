"use client";

import dynamic from "next/dynamic";

const HouseReserveMap = dynamic(() => import("./houseReserveMap"), {
  ssr: false,
});

export default function HouseReserveMapWrapper() {
  return <HouseReserveMap />;
}
