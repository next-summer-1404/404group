"use client";

import React, { createContext, useContext, useState } from "react";
import type { DateObject } from "react-multi-date-picker";

export interface ReserveContextType {
  checkIn: DateObject | null;
  setCheckIn: (date: DateObject | null) => void;
  checkOut: DateObject | null;
  setCheckOut: (date: DateObject | null) => void;
  guests: number;
  setGuests: (value: number) => void;
}
const ReserveContext = createContext<ReserveContextType | undefined>(undefined);

export const ReserveProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checkIn, setCheckIn] = useState<any>(null);
  const [checkOut, setCheckOut] = useState<any>(null);
  const [guests, setGuests] = useState<number>(1);

  return (
    <ReserveContext.Provider
      value={{ checkIn, setCheckIn, checkOut, setCheckOut, guests, setGuests }}
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
