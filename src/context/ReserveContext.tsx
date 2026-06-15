"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DateObject } from "react-multi-date-picker";
export interface ReserveContextType {
  checkIn: DateObject | null;
  setCheckIn: (date: DateObject | null) => void;
  checkOut: DateObject | null;
  setCheckOut: (date: DateObject | null) => void;
  guests: number;
  setGuests: (value: number) => void;
  price: number;
  setPrice: (value: number) => void;
  discountPrice: number;
  setDiscountPrice: (value: number) => void;
  address: string;
  setAddress: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  photo: string;
  setPhoto: (value: string) => void;
  id: string;
  setId: (value: string) => void;
}

const ReserveContext = createContext<ReserveContextType | undefined>(undefined);

export const ReserveProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // --- مقدار اولیه از کوکی‌ها خوانده شود ---
  const [checkIn, setCheckIn] = useState<DateObject | null>(() => {
    const stored = Cookies.get("checkIn");
    return stored ? new DateObject(JSON.parse(stored)) : null;
  });

  const [checkOut, setCheckOut] = useState<DateObject | null>(() => {
    const stored = Cookies.get("checkOut");
    return stored ? new DateObject(JSON.parse(stored)) : null;
  });

  const [guests, setGuests] = useState<number>(
    Cookies.get("guests") ? Number(Cookies.get("guests")) : 1
  );
  const [price, setPrice] = useState<number>(
    Cookies.get("price") ? Number(Cookies.get("price")) : 0
  );
  const [discountPrice, setDiscountPrice] = useState<number>(
    Cookies.get("discountPrice") ? Number(Cookies.get("discountPrice")) : 0
  );
  const [address, setAddress] = useState<string>(Cookies.get("address") || "");
  const [title, setTitle] = useState<string>(Cookies.get("title") || "");
  const [photo, setPhoto] = useState<string>(Cookies.get("photo") || "");
  const [id, setId] = useState<string>(Cookies.get("id") || "");

  // --- هر بار که state عوض شد، در کوکی ذخیره شود ---
  useEffect(() => {
    Cookies.set("checkIn", JSON.stringify(checkIn));
  }, [checkIn]);

  useEffect(() => {
    Cookies.set("checkOut", JSON.stringify(checkOut));
  }, [checkOut]);

  useEffect(() => {
    Cookies.set("guests", String(guests));
  }, [guests]);

  useEffect(() => {
    Cookies.set("price", String(price));
  }, [price]);

  useEffect(() => {
    Cookies.set("discountPrice", String(discountPrice));
  }, [discountPrice]);

  useEffect(() => {
    Cookies.set("address", address);
  }, [address]);

  useEffect(() => {
    Cookies.set("title", title);
  }, [title]);

  useEffect(() => {
    Cookies.set("photo", photo);
  }, [photo]);

  useEffect(() => {
    Cookies.set("id", id);
  }, [id]);

  return (
    <ReserveContext.Provider
      value={{
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        price,
        setPrice,
        discountPrice,
        setDiscountPrice,
        address,
        setAddress,
        title,
        setTitle,
        photo,
        setPhoto,
        id,
        setId,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};

export const useReserve = () => {
  const context = useContext(ReserveContext);
  if (!context) {
    throw new Error("useReserve باید داخل <ReserveProvider> استفاده شود");
  }
  return context;
};
