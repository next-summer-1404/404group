"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { UsersTypes } from "@/types/panel/UsersTypes";
import { getUsers } from "@/services/api/Dash/getUsers";

type UserMenuProps = {
  onClose: () => void;
  userId: string;
};

const UserMenu: React.FC<UserMenuProps> = ({ onClose, userId }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userInfo, setUserInfo] = useState<UsersTypes | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      const res = await getUsers(userId);
      setUserInfo(res);
    };
    fetchUser();
  }, [userId]);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    onClose();
  };

  return (
    <>
      <div
        ref={menuRef}
        className="absolute top-14 left-6 bg-[#2B2B2B] border border-[#555] rounded-2xl w-56 p-4 z-50 shadow-2xl animate-fadeIn"
      >
        <div className="flex items-center gap-3 pb-3 border-b border-dashed border-[#444]">
          <div className="w-10 h-10 bg-[#555] rounded-xl" />
          <div className="flex flex-col">
            <p className="text-sm text-[#AAA] font-medium">
              {userInfo?.user.fullName ?? "کاربر"}
            </p>
            <p className="text-xs text-[#AAA]">
              + {userInfo?.user.phoneNumber ?? ""}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-3">
          <p className="text-sm text-[#AAA]">موجودی قابل برداشت</p>
          <button className="p-1.5 bg-[#8CFF45] rounded-md hover:opacity-80 transition">
            <PlusIcon className="w-4 h-4 text-black" />
          </button>
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="mt-2 flex items-center gap-2 text-[#FF5555] hover:text-[#FF7777] transition text-sm"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          خروج
        </button>
      </div>

      {/* مدال خروج */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default UserMenu;
