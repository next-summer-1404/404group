import React, { useEffect, useState } from "react";
import Image from "next/image";
import Arrow from "../../../assets/dash/Group 34.png";
import { BellAlertIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import BuyerMenuModal from "./BuyerMenuModal";
import { Switch } from "@heroui/react";
import { UsersTypes } from "@/types/panel/UsersTypes";
import Cookies from "js-cookie";
import { getUsers } from "@/services/api/Dash/getUsers";
import ThemeSwitch from "../ThemeSwitch";

const BuyerHeader = () => {
  const [isBuyerMenuModal, setIsBuyerMenuModal] = useState(false);
  const [userInfo, setUserInfo] = useState<UsersTypes | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // console.log(userId, "fffffff");
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
            onClick={() => setIsBuyerMenuModal((prev) => !prev)}
          >
            <p className="text-[#AAAA] flex items-center gap-1">
              {userInfo?.user.fullName}
              <ChevronDownIcon className="w-4 h-4" />
            </p>
            <p className="text-[#AAAA] text-xs ">{userInfo?.user.role}</p>
          </div>
        </div>

        {isBuyerMenuModal && (
          <BuyerMenuModal
            onClose={() => setIsBuyerMenuModal(false)}
            userId={userId!}
          />
        )}
      </div>
    </div>
  );
};

export default BuyerHeader;
