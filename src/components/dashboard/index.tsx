"use client";
import React, { FC, useState } from "react";
import {
  Home,
  User,
  Heart,
  Bell,
  Wallet,
  Lock,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SideMain from "./main/SideMain";
import DashboardHeader from "./main/DashboardHeader";
import HeroDashboard from "./main/HeroDashboard";
import ContainDashboard from "./main/ContainDashboard";
import ReservationSection from "./main/ReservationSection";
import PropertyManagement from "./propertyManagement/PropertyManagement";
import BookingManagement from "./bookingManagement/BookingManagement";
import FinancialManagement from "./financialManagement/FinancialManagement";
import SellerNotification from "./sellerNotification/SellerNotification";
import ContainComment from "./comments/ContainComment";
import { FinanceTypes } from "@/types/panel/FinanceTypes";
import UseInformation from "../Panel/useInformation/UseInformation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Link from "next/link";

interface SellerDashboardProps {
  Finance: FinanceTypes;
}

const tabs = [
  { id: "dashboard", label: "داشبورد", icon: <Home size={18} /> },
  { id: "profile", label: "اطلاعات کاربری", icon: <User size={18} /> },
  { id: "property", label: "مدیریت املاک", icon: <Bell size={18} /> },
  { id: "reservation", label: "مدیریت رزوها", icon: <Lock size={18} /> },
  { id: "notifications", label: "اعلان‌ها", icon: <Bell size={18} /> },
  { id: "comment", label: "مدیریت نظرها", icon: <Bell size={18} /> },
];

const SellerDashboard: FC<SellerDashboardProps> = ({ Finance }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    if (activeTab === "dashboard") {
      return (
        <>
          <HeroDashboard />
          <ContainDashboard />
          <ReservationSection />
        </>
      );
    }
    if (activeTab === "profile") return <UseInformation />;
    if (activeTab === "property") return <PropertyManagement />;
    if (activeTab === "reservation") return <BookingManagement />;
    if (activeTab === "comment") return <ContainComment />;
    if (activeTab === "notifications") return <SellerNotification />;
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* 📌 Sidebar – ریسپانسیو کامل */}
      <aside
        className={`
          bg-white dark:bg-gray-800 shadow-lg
          md:rounded-2xl md:m-6
          z-30
          ${
            sidebarOpen
              ? "fixed right-0 top-0 w-64 h-full rounded-none"
              : "hidden md:block md:static md:w-64 md:h-auto"
          }
        `}
      >
        <div className="mt-3 mr-6 flex gap-38">
          <div className="mt-2">
            <Link href={"/"}>
              <Home size={25} />
            </Link>
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>
        {/* هدر سایدبار فقط در موبایل */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <h1 className="text-lg font-bold">دلتا</h1>
          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        {/* ناوبری */}
        <nav className="flex flex-col gap-1 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center justify-between p-3 rounded-lg transition w-full
                ${
                  activeTab === tab.id
                    ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <span className="flex items-center gap-2">
                {tab.icon} {tab.label}
              </span>
            </button>
          ))}
        </nav>

        {/* کیف پول – فقط دسکتاپ */}
        <div className="p-4 mt-4 hidden md:block">
          <div className="flex items-center justify-between border border-dashed p-3 rounded-xl">
            <div>
              <p className="text-sm font-semibold">کیف پول</p>
              <p className="text-xs text-gray-500">عدم موجودی</p>
            </div>
            <Wallet size={18} />
          </div>
        </div>
      </aside>

      {/* اوورلی موبایل */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 📌 بخش اصلی */}
      <div className="flex-1 flex flex-col md:pr-0 md:pl-0">
        {/* هدر بالا */}
        <header className="flex mx-3 mt-4 md:mt-6 rounded-xl items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center gap-2">
            {/* دکمه باز کردن سایدبار در موبایل */}
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h2 className="font-bold text-base md:text-lg">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm hidden sm:block">Seller</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>
        </header>

        {/* محتوای تب‌ها */}
        <main className="flex-1 p-3 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow p-4 md:p-6"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
export default SellerDashboard;
