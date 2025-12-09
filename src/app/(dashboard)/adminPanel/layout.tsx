"use client";

import { useState } from "react";
import {
  Home,
  User,
  Plus,
  Heart,
  Lock,
  Bell,
  Menu,
  X,
  Wallet,
  LetterText,
  CreditCard,
  MessageCircle,
  CalendarCheck,
  Mail,
  LucideFileText,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SetRefreshToken from "../../../components/RefreshToken/SetRefreshToken";
import { AnimatePresence, motion } from "framer-motion";
import { getInfoType, useGetInfo } from "../../../utils/hooks/getInfoByToken";
import Image from "next/image";

const tabs = [
  {
    id: "dashboard",
    label: "داشبورد",
    href: "/adminPanel/dashboard",
    icon: <Home size={18} />,
  },
  {
    id: "users",
    label: "مدیریت کاربران",
    href: "/adminPanel/users",
    icon: <User size={18} />,
  },
  {
    id: "booking",
    label: "مدیریت رزروها",
    href: "/adminPanel/booking",
    icon: <CalendarCheck size={18} />,
  },
  {
    id: "houses",
    label: "مدیریت املاک",
    href: "/adminPanel/houses",
    icon: <Home size={18} />,
  },
  {
    id: "comment",
    label: "مدیریت نظر ها",
    href: "/adminPanel/comments",
    icon: <MessageCircle size={18} />,
  },
  {
    id: "payment",
    label: "مدیریت پرداختی ها",
    href: "/adminPanel/payments",
    icon: <CreditCard size={18} />,
  },
  {
    id: "contactUs",
    label: "ارتباط با ما",
    href: "/adminPanel/contact_us",
    icon: <Mail size={18} />,
  },
  {
    id: "docs",
    label: "مدیریت اسناد",
    href: "/adminPanel/documents",
    icon: <LucideFileText size={18} />,
  },
  {
    id: "loc",
    label: "مدیریت مقاصد",
    href: "/adminPanel/location",
    icon: <MapPin size={18} />,
  },
  {
    id: "categories",
    label: "مدیریت دسته بندی ها",
    href: "/adminPanel/category",
    icon: <MapPin size={18} />,
  },
  {
    id: "chat",
    label: "مدیریت گفتگو ها",
    href: "/adminPanel/chat",
    icon: <MapPin size={18} />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getInfo: getInfoType = useGetInfo();
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <SetRefreshToken />

      {/* Sidebar */}
      <aside
        className={`fixed md:static mr-5 my-6 rounded-2xl top-0 right-0 md:w-64 w-64 
        bg-white dark:bg-gray-800 shadow-lg z-20 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold">دلتا</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between p-2 rounded-lg transition
                ${
                  active
                    ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab.icon} {tab.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 p-4">
          <div className="flex items-center justify-between border-dashed border-1.5 p-3 rounded-xl">
            <div>
              <p className="text-sm font-semibold">کیف پول</p>
              <p className="text-xs text-gray-500">عدم موجودی</p>
            </div>
            <Wallet size={18} />
          </div>
        </div>
      </aside>

      {/* overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Page */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex mx-5 mt-6 rounded-2xl items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>

          <h2 className="font-bold text-lg">
            {tabs.find((t) => pathname === t.href)?.label}
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-sm">{getInfo?.name}</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full relative overflow-hidden">
              <Image
                src={getInfo?.profilePicture}
                alt="P"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </header>
        {/* Dynamic Page Content */}{" "}
        <AnimatePresence mode="wait">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center m-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
