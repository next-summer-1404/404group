"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "../../common/table/DynamicTable";
import { GetSellerHousesResponse } from "@/types/panel/SellerUserType";
import { getSellerUser } from "@/services/api/Dash/getSellerUser";

const columns = [
  { key: "title", label: "نام اقامتگاه" },
  { key: "price", label: "قیمت" },
  { key: "transaction_type", label: "نوع معامله" },
  { key: "rate", label: "امتیاز" },
  { key: "address", label: "آدرس" },
];

interface PropertyTableProps {
  onAddClick: () => void;
}

const PropertyTable: React.FC<PropertyTableProps> = ({ onAddClick }) => {
  const [data, setData] = useState<GetSellerHousesResponse | null>(null);

  const getData = async () => {
    const response = await getSellerUser();
    setData(response);
  };

  useEffect(() => {
    getData();
  }, []);

  const rows =
    data?.houses.map((house) => ({
      key: house.id,
      title: house.title,
      price: `${Number(house.price).toLocaleString("fa-IR")} تومان`,
      transaction_type:
        house.transaction_type === "reservation"
          ? "اجاره"
          : house.transaction_type === "sale"
          ? "فروش"
          : "رهن",
      rate: house.rate ?? "—",
      address: house.address,
    })) ?? [];

  return (
    <DynamicTable
      columns={columns}
      rows={rows}
      withActions
      addButtonText="افزودن ملک +"
      onAddClick={onAddClick}
    />
  );
};

export default PropertyTable;
