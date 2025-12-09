"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { useUser } from "@/utils/hooks/useUsers";
import { usePathname } from "next/navigation";
import { Bolt, Building, FileText, Home, Info, Menu } from "lucide-react";
import MobileMenuModal from "./MobileModal";
import Image from "next/image";
import icon from "@/assets/landing/DownIcon.svg";
import iconWhite from "@/assets/landing/DownIconWhite.svg";
import { useTheme } from "next-themes";
export default function Header({ user }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const usrs = useUser();
  const { resolvedTheme } = useTheme();

  const navItemsRight = [
    { title: "خانه", href: "/", w: "w-[87px]", icon: <Home size={18} /> },
    { title: "مقالات", href: "#", w: "w-[86px]", icon: <FileText size={18} /> },
    {
      title: "درباره آلفا",
      href: "#",
      w: "w-[103px]",
      icon: <Info size={18} />,
    },
  ];

  const navItemsLeft = [
    {
      title: "رهن و اجاره",
      href: "/houseReserve",
      w: "w-[140px]",
      icon: <Building size={18} />,
    },
    {
      title: "رزرو سریع",
      href: "#",
      w: "w-[129px]",
      icon: <Bolt size={18} />,
    },
  ];

  return (
    <>
      {/* ------------------ NAVBAR ------------------ */}
      <Navbar
        maxWidth="full"
        className="bg-white dark:bg-gray-900 w-full h-max md:px-[56px] py-[10px]"
        dir="rtl"
      >
        {/* ---------- MOBILE MENU BUTTON ---------- */}
        <NavbarContent className="md:hidden flex justify-start">
          <button onClick={() => setIsOpen(true)}>
            <Menu size={28} className="text-black dark:text-white" />
          </button>
        </NavbarContent>

        {/* ---------- DESKTOP ---------- */}
        <div className="hidden md:flex w-full flex-row justify-between items-center">
          {/* RIGHT */}
          <NavbarContent className="flex gap-4">
            {navItemsRight.map((item, index) => (
              <Link key={index} href={item.href}>
                <button
                  className={`cursor-pointer h-[48px] rounded-full dark:text-white ${
                    item.w
                  } font-[600px] text-[16px] pb-1 
                 bg-gray-100 dark:bg-gray-800 flex items-center justify-center gap-2
                   ${pathname === item.href ? "font-[700]" : ""}
                 `}
                >
                  {pathname === item.href && (
                    <div className="w-[7px] h-[7px] bg-black dark:bg-white rounded-full mt-1"></div>
                  )}
                  {item.title}
                </button>
              </Link>
            ))}
          </NavbarContent>

          {/* CENTER */}
          <NavbarBrand className=" flex justify-center">
            <span className="font-[800] text-[32px] dark:text-white tracking-wide ">
              AIFA
            </span>
          </NavbarBrand>

          {/* LEFT */}
          <NavbarContent className="flex gap-4">
            {navItemsLeft.map((item, index) => (
              <Link key={index} href={item.href}>
                <button
                  className={`cursor-pointer h-[48px] rounded-full dark:text-white ${
                    item.w
                  } font-[600px] text-[16px] pb-1 
                   bg-gray-100 dark:bg-gray-800 flex items-center justify-center gap-2
                  ${pathname === item.href ? "font-[700]" : ""}
                  `}
                >
                  {pathname === item.href && (
                    <div className="w-[7px] h-[7px] bg-black dark:bg-white rounded-full mt-1"></div>
                  )}
                  {item.title}{" "}
                  <div className="relative  size-[20px] mt-2">
                    {resolvedTheme === "dark" ? (
                      <Image
                        src={iconWhite}
                        alt="i"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image src={icon} alt="i" fill className="object-cover" />
                    )}{" "}
                  </div>
                </button>
              </Link>
            ))}

            <div className="h-[24px] border-r border-[#DEDEDE]"></div>

            {!user ? (
              <NavbarItem>
                <button
                  className={`h-[48px] font-[600px] text-[16px] pb-1 rounded-full w-[135px] text-white bg-primary-light`}
                >
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
      </Navbar>

      {/* ------------------ MOBILE MODAL ------------------ */}
      <MobileMenuModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        // pathname={pathname}
        navItems={[...navItemsRight, ...navItemsLeft]}
        user={user}
        // usrs={usrs}
      />
    </>
  );
}
