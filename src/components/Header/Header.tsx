"use client";

import { Button } from "@heroui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Link from "next/link";
const Header = () => {
  return (
    <Navbar
      maxWidth="xl"
      className="shadow-sm bg-white dark:bg-gray-900 mt-2 h-max"
      dir="rtl"
    >
      <NavbarContent justify="start" className="flex gap-4">
        <NavbarItem>
          <button className="py-2 px-5 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white ">
            <Link href={"/"}>خانه</Link>
          </button>
        </NavbarItem>
        <NavbarItem>
          <button className="py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5">
            مقالات
          </button>
        </NavbarItem>
        <NavbarItem>
          <button className="py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5">
            درباره آلفا
          </button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex mr-60" justify="center">
        <NavbarBrand>
          <span className="font-extrabold text-2xl dark:text-white tracking-wide">
            AIFA
          </span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="start" className="flex gap-3 mr-40">
        <NavbarItem>
          <button className="cursor-pointer py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5">
            <Link href={"/houseReserve"}> رهن و اجاره </Link>
          </button>
        </NavbarItem>

        <NavbarItem>
          <button className="py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5">
            رزرو سریع
          </button>
        </NavbarItem>

        <NavbarItem>
          <button className="py-2 rounded-full px-6 text-white font-bold bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">
            <Link href={"/login"}>ثبت نام / ورود</Link>
          </button>
        </NavbarItem>
        <ThemeToggle />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
