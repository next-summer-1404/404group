"use client";

import { Button } from "@heroui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
const Header = () => {
  return (
    <Navbar
      maxWidth="xl"
      className="shadow-sm bg-white dark:bg-gray-900 mt-2 h-max "
      dir="rtl"
    >
      <NavbarContent justify="start" className="flex gap-4">
        <NavbarItem>
          <Button
            variant="flat"
            className="rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5"
          >
            خانه
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="flat"
            className="rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5"
          >
            مقالات
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="flat"
            className="rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5"
          >
            درباره آلفا
          </Button>
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
          <Button
            variant="flat"
            className="rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5"
          >
            رهن و اجاره
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            variant="flat"
            className="rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5"
          >
            رزرو سریع
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button className="rounded-full px-6 text-white font-bold bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">
            ثبت نام / ورود
          </Button>
        </NavbarItem>
        <ThemeToggle />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
