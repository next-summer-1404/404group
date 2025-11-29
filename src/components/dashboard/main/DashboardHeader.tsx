"use client";
import React, { useEffect, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import Arrow from "../../../assets/dash/Group 34.png";
import { BellAlertIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import UserMenuModal from "./UserMenuModal";
import Cookies from "js-cookie";
import { getUsers } from "@/services/api/Dash/getUsers";
import { UsersTypes } from "@/types/panel/UsersTypes";

const DashboardHeader = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UsersTypes | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // console.log(userId,'fffffff')
    const id = Cookies.get("userId");
    setUserId(id ?? null);
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      const res = await getUsers(userId);
      setUserInfo(res);
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="w-full rounded-2xl h-16 bg-[#393939] flex items-center">
      <div className="w-2/3 flex items-center justify-between p-5">
        <p className="flex items-center gap-2 text-[#AAAA] text-md">
          داشبورد
          <Image
            src={Arrow}
            width={50}
            height={16}
            alt=""
            className="rotate-180 text-[#AAAA]"
          />
        </p>
        <ThemeSwitch />
      </div>

      <div className="w-1/3 border-r p-2 border-[#AAA] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BellAlertIcon className="w-5 h-5 text-[#AAAA]" />
          <div
            className="flex flex-col items-center cursor-pointer select-none"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
          >
            <p className="text-[#AAAA] flex items-center gap-1">
              {userInfo?.user.fullName}
              <ChevronDownIcon className="w-4 h-4" />
            </p>
            <p className="text-[10px] text-[#AAAA] ">{userInfo?.user.role}</p>
          </div>
        </div>

        {isUserMenuOpen && (
          <UserMenuModal
            onClose={() => setIsUserMenuOpen(false)}
            userId={userId!}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
