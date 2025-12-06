"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useUser } from "@/utils/hooks/useUsers";
import { usePathname } from "next/navigation";
import { Dot } from "lucide-react";

export default function Header({ user }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const usrs = useUser();
  const pathname = usePathname();

  const navItemsRight = [
    { title: "خانه", href: "/", w: "w-[87px]" },
    { title: "مقالات", href: "#", w: "w-[86px]" },
    { title: "درباره آلفا", href: "#", w: "w-[103px]" },
  ];

  const navItemsLeft = [
    { title: "رهن و اجاره", href: "/houseReserve", w: "w-[140px]" },
    { title: "رزرو سریع", href: "#", w: "w-[129px]" },
  ];

  return (
    <Navbar
      maxWidth="full"
      className=" bg-white dark:bg-gray-900 w-full h-max  px-[56px] py-[10px]"
      dir="rtl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* ---------- موبایل ---------- */}
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle className="text-black dark:text-white" />
      </NavbarContent>

      {/* ---------- کل ساختار دسکتاپ ---------- */}
      <div className="flex flex-row w-full">
        {/* ---------- بخش راست (خانه – مقالات – درباره) ---------- */}
        <NavbarContent className="hidden md:flex gap-4">
          {navItemsRight.map((item, index) => (
            <Link key={index} href={item.href}>
              <button
                className={` cursor-pointer h-[48px] rounded-full ${
                  item.w
                } font-[600px] text-[16px] pb-1 
                 bg-gray-100 dark:bg-gray-800 flex items-center justify-center gap-2
                  ${pathname === item.href ? "font-[700]" : ""}
                `}
              >
                {pathname === item.href && (
                  <div className="w-[7px] h-[7px] bg-black dark:bg-white rounded-full mt-1"></div>
                )}

                <div>{item.title}</div>
              </button>
            </Link>
          ))}
        </NavbarContent>

        {/* ---------- لوگو وسط ---------- */}
        <NavbarContent className="hidden md:flex flex-row justify-center items-center my-3 flex-1">
          <NavbarBrand className="flex flex-row justify-center items-center">
            <span className="font-[800] text-[32px] dark:text-white tracking-wide">
              AIFA
            </span>
          </NavbarBrand>
        </NavbarContent>

        {/* ---------- بخش چپ دسکتاپ ---------- */}
        <NavbarContent className="hidden md:flex gap-4">
          {navItemsLeft.map((item, index) => (
            <Link key={index} href={item.href}>
              <button
                className={` cursor-pointer h-[48px] rounded-full ${
                  item.w
                } font-[600px] text-[16px] pb-1 
                 bg-gray-100 dark:bg-gray-800 flex items-center justify-center gap-2
                  ${pathname === item.href ? "font-[700]" : ""}
                `}
              >
                {pathname === item.href && (
                  <div className="w-[7px] h-[7px] bg-black dark:bg-white rounded-full mt-1"></div>
                )}

                <div>{item.title}</div>
              </button>
            </Link>
          ))}

          <div className="h-[24px] border-r border-[#DEDEDE]"></div>

          {!user ? (
            <NavbarItem>
              <button className="h-[48px] font-[600px] text-[16px] pb-1 rounded-full w-[135px] text-white bg-[#7575FE]">
                <Link href="/login">ثبت نام / ورود</Link>
              </button>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Link href={`/dashboard/${user.role}`}>
                <img
                  src={user.avatar || "/avatar-default.png"}
                  className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer"
                  alt="profile"
                />
              </Link>
            </NavbarItem>
          )}

          <ThemeToggle />
        </NavbarContent>
      </div>

      {/* ---------- موبایل: منوی باز‌شونده ---------- */}
      <NavbarMenu className="dark:bg-gray-900 bg-white text-black dark:text-white">
        <NavbarMenuItem>
          <Link href="/" className="block py-3">
            خانه
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <button className="w-full text-right py-3">مقالات</button>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <button className="w-full text-right py-3">درباره آلفا</button>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link href="/houseReserve" className="block py-3">
            رهن و اجاره
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <button className="w-full text-right py-3">رزرو سریع</button>
        </NavbarMenuItem>

        {!usrs && (
          <NavbarMenuItem>
            <Link
              href="/login"
              className="block bg-gradient-to-r mt-4 rounded-xl text-center py-3 text-white font-bold from-indigo-500 to-purple-500"
            >
              ثبت نام / ورود
            </Link>
          </NavbarMenuItem>
        )}

        {usrs && (
          <NavbarMenuItem>
            <Link href="/dashboard" className="flex items-center gap-3 py-3">
              <img
                src={user.avatar || "/avatar-default.png"}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700"
                alt="profile"
              />
              <span>داشبورد</span>
            </Link>
          </NavbarMenuItem>
        )}

        <NavbarMenuItem>
          <div>
            <ThemeToggle />
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
