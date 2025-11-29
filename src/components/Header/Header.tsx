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

export default function Header({ user }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const usrs = useUser();
  return (
    <Navbar
      maxWidth="xl"
      className="shadow-sm bg-white dark:bg-gray-900 mt-2 h-max"
      dir="rtl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* ---------- موبایل: دکمه همبرگری ---------- */}
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle className="text-black dark:text-white" />
      </NavbarContent>

      {/* ---------- دسکتاپ: بخش راست ---------- */}
      <NavbarContent justify="start" className="hidden md:flex gap-4">
        <NavbarItem>
          <button className="py-2 px-5 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
            <Link href="/">خانه</Link>
          </button>
        </NavbarItem>

        <NavbarItem>
          <button className="py-2 px-5 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
            مقالات
          </button>
        </NavbarItem>

        <NavbarItem>
          <button className="py-2 px-5 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
            درباره آلفا
          </button>
        </NavbarItem>
      </NavbarContent>

      {/* ---------- مرکز ---------- */}
      <NavbarContent className="hidden md:flex mr-60" justify="center">
        <NavbarBrand>
          <span className="font-extrabold text-2xl dark:text-white tracking-wide">
            AIFA
          </span>
        </NavbarBrand>
      </NavbarContent>

      {/* ---------- بخش چپ در دسکتاپ ---------- */}
      <NavbarContent justify="start" className="hidden md:flex gap-3 mr-40">
        <NavbarItem>
          <button className="cursor-pointer py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5">
            <Link href="/houseReserve">رهن و اجاره</Link>
          </button>
        </NavbarItem>

        <NavbarItem>
          <button className="py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-5">
            رزرو سریع
          </button>
        </NavbarItem>

        {!user ? (
          <NavbarItem>
            <button className="py-2 rounded-full px-6 text-white font-bold bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">
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
          <div className="pt-4">
            <ThemeToggle />
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
