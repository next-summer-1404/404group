"use client";
import React, { useState } from "react";
import {
  ArrowRightCircleIcon,
  HomeIcon,
  UserIcon,
  PlusCircleIcon,
  WalletIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

type SideMainProps = {
  onSectionChange: (section: string) => void;
};

const menuItems = [
  { label: "داشبورد", icon: HomeIcon, section: "dashboard" },
  // { label: "اطلاعات کاربری", icon: UserIcon, section: "userinfo" },
  { label: "مدیریت املاک", icon: BuildingOfficeIcon, section: "property" },
  { label: "مدیریت رزرو", icon: PlusCircleIcon, section: "reservation" },
  { label: "مدیریت مالی", icon: WalletIcon, section: "finance" },
  { label: "مدیریت نظرها", icon: ChatBubbleLeftRightIcon, section: "comment" },
  { label: "اعلان‌ها", icon: BellIcon, section: "notifications" },
];

export default function SideMain({ onSectionChange }: SideMainProps) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleMenuClick = (section: string) => {
    setActiveSection(section);
    onSectionChange(section);
  };

  return (
    <div className="w-[270px] h-[775px] bg-[#393939] rounded-2xl flex flex-col overflow-hidden">
      <Link href={'/'}
        onClick={() => handleMenuClick("dashboard")}
        className="flex items-center justify-between px-5 h-[60px]"
      >
        <p className="font-bold text-[#AAAAAA] text-[20px] leading-none">
          دلتا
        </p>
        <ArrowRightCircleIcon className="w-6 h-6 text-[#AAAAAA]" />
      </Link>

      <div className="flex-1 flex flex-col justify-start">
        {menuItems.map((item, i) => {
          const isActive = activeSection === item.section;
          return (
            <button
              key={i}
              onClick={() => handleMenuClick(item.section)}
              className={`flex items-center gap-3 px-6 h-[45px] text-[15px] font-medium text-right transition-colors duration-200 ${
                isActive
                  ? "text-[#8CFF45] bg-[#2C2C2C]"
                  : "text-[#AAAAAA] hover:text-[#8CFF45]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="px-4 h-[90px] flex flex-col justify-center items-center">
        <div className="border border-[#AAAAAA]/40 w-full rounded-xl py-3 flex flex-col items-center">
          <button
            onClick={() => handleMenuClick("reviews")}
            className={`flex items-center gap-2 text-[15px] ${
              activeSection === "reviews"
                ? "text-[#8CFF45]"
                : "text-[#AAAAAA] hover:text-[#8CFF45]"
            }`}
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span className="font-medium">نظرات جدید</span>
          </button>
          <p className="text-[#AAAAAA] text-sm mt-1">۵ نظر</p>
        </div>
      </div>
    </div>
  );
}
