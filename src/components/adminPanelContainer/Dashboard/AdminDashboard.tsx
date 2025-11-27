"use client";
import React from "react";

export interface IAdminDashboard {
  totalUsers: number;
  totalHouses: number;
  totalBookings: number;
  averageRating: string;
}

import { Users, Home, CalendarCheck2, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../../services/api/Admin/getDashboard/getDashboard";
import LoadingDots from "../../Loading/loadingOne";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["getAdminDashboard"],
    queryFn: async () => getDashboard(),
  });
  console.log(stats);
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white shadow rounded-2xl p-4 text-center flex flex-col items-center hover:shadow-2xl transition-[0.5s]">
        <Users className="w-10 h-10 mb-2" />
        <h2 className="text-xl font-semibold">کل کاربران</h2>
        {isLoading ? (
          <div className="mt-4">
            <LoadingDots />
          </div>
        ) : (
          <p className="text-3xl mt-2 font-bold">{stats?.totalUsers}</p>
        )}
      </div>

      <div className="bg-white shadow rounded-2xl p-4 text-center flex flex-col items-center hover:shadow-2xl transition-[0.5s]">
        <Home className="w-10 h-10 mb-2" />
        <h2 className="text-xl font-semibold">تعداد خانه‌ها</h2>
        {isLoading ? (
          <div className="mt-4">
            <LoadingDots />
          </div>
        ) : (
          <p className="text-3xl mt-2 font-bold">{stats?.totalHouses}</p>
        )}
      </div>

      <div className="bg-white shadow rounded-2xl p-4 text-center flex flex-col items-center hover:shadow-2xl transition-[0.5s]">
        <CalendarCheck2 className="w-10 h-10 mb-2" />
        <h2 className="text-xl font-semibold">کل رزروها</h2>
        {isLoading ? (
          <div className="mt-4">
            <LoadingDots />
          </div>
        ) : (
          <p className="text-3xl mt-2 font-bold">{stats?.totalBookings}</p>
        )}
      </div>

      <div className="bg-white shadow rounded-2xl p-4 text-center flex flex-col items-center hover:shadow-2xl transition-[0.5s]">
        <Star className="w-10 h-10 mb-2" />
        <h2 className="text-xl font-semibold">میانگین امتیاز</h2>
        {isLoading ? (
          <div className="mt-4">
            <LoadingDots />
          </div>
        ) : (
          <p className="text-3xl mt-2 font-bold">{stats?.averageRating}</p>
        )}
      </div>
    </div>
  );
}
